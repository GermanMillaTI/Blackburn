import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../firebase/config';
import Swal from 'sweetalert2';
import Constants from '../Constants';
import './BookSession.css';
import LogEvent from '../CommonFunctions/LogEvent';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';

function BookSession({ participants, timeslots, setShowBookSession, selectedSessionId, setJustBookedSession }) {
    const [searchBarText, setSearchBarText] = useState("");

    const updateValue = (path, value) => {
        realtimeDb.ref(path).update(value);
    }

    function participantFilter(participantId) {
        const searchText = (searchBarText || '').toString().toLowerCase().trim();
        if (!searchBarText) return [];

        const participantInfo = participants[participantId];
        const participantName = participantInfo['firstName'].toString().toLowerCase().trim();
        const email = participantInfo['email'].toString().toLowerCase().trim();
        const phone = participantInfo['phone'].replaceAll('T: ', '').replaceAll(' ', '').toString().toLowerCase().trim();

        let output = [];
        if (participantId.toString().includes(searchText)) output.push('Participant ID');
        if (participantName.includes(searchText)) output.push('Name');
        if (email.includes(searchText)) output.push('E-mail');
        if (phone.includes(searchText)) output.push('Phone');

        return output;
    }

    function bookSession(participantId) {
        const participantInfo = participants[participantId];

        Swal.fire({
            title: "Booking an appointment",
            showCancelButton: true,
            confirmButtonText: 'Yes',
            html: "<b>" + TimeSlotFormat(selectedSessionId) + "<br/>" +
                participantInfo['firstName'] + " " + participantInfo['lastName'] + "</b>"

        }).then((result) => {
            if (result.isConfirmed) {
                let data = {
                    status: 0,
                    participantId: participantId,
                    confirmed: "no",
                    remind: true
                }

                if (data['locked'] === true) data['locked'] = false;

                // Save the session
                let path = "/timeslots/" + selectedSessionId;
                updateValue(path, data);
                setJustBookedSession(selectedSessionId);
                setShowBookSession(false);

                LogEvent({
                    value: `Booked session`,
                    participantId: participantId,
                    action: 8
                })

                updateValue('/participants/' + participantId, { status: 2 })

                LogEvent({
                    participantId: participantId,
                    value: "Participant status: '" + "Scheduled" + "'",
                    action: 0
                })
            }
        })
    }

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) setShowBookSession(false) };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    return ReactDOM.createPortal((
        <div className="modal-book-session-backdrop" onClick={(e) => { if (e.target.className === "modal-book-session-backdrop") setShowBookSession(false) }}>
            <div className="modal-book-session-main-container">
                <div className="modal-book-session-header">
                    Booking an appointment
                </div>
                <div
                    className="modal-book-session-sub-header">
                    {TimeSlotFormat(selectedSessionId)}
                </div>
                <input
                    className="search-bar-for-schedule"
                    placeholder="Search..."
                    value={searchBarText}
                    onChange={(e) => setSearchBarText(e.target.value.toLocaleLowerCase())}
                    autoFocus
                />
                <div className="search-table-for-schedule-container">
                    <table className="search-table-for-schedule">
                        <thead>
                            <tr>
                                <th>Participant ID</th>
                                <th>Name</th>
                                <th>E-mail</th>
                                <th>Phone</th>
                                <th>Gender</th>
                                <th>Year of birth</th>
                                <th>Status</th>
                                <th>Participant comments</th>
                            </tr>
                        </thead>
                        <tbody>

                            {Object.keys(participants).sort((a, b) => a < b ? -1 : 1).map(participantId => {
                                const filterResult = participantFilter(participantId);
                                //if (filterResult.length === 0) return null;

                                const participantInfo = participants[participantId];

                                return <tr key={'book-session-row' + participantId} onClick={() => bookSession(participantId)}>
                                    <td className={(filterResult.includes('Participant ID') ? "filter-highlighted-cell" : "") + " center-tag"}>
                                        {participantId}
                                    </td>
                                    <td className={filterResult.includes('Name') ? "filter-highlighted-cell" : ""}>
                                        {participantInfo['firstName'] + ' ' + participantInfo['lastName']}
                                    </td>
                                    <td className={filterResult.includes('E-mail') ? "filter-highlighted-cell" : ""}>
                                        {participantInfo['email']}
                                    </td>
                                    <td className={(filterResult.includes('Phone') ? "filter-highlighted-cell" : "") + " center-tag"}>
                                        {participantInfo['phone'].replace("T: ", "")}
                                    </td>
                                    <td className="center-tag">
                                        {Constants['genders'][participantInfo['gender']]}
                                    </td>
                                    <td className={(filterResult.includes('Year of birth') ? "filter-highlighted-cell" : "") + " center-tag"}>
                                        {participantInfo['dob'].substring(0, 4)}
                                    </td>
                                    <td className="center-tag">
                                        {Constants['participantStatuses'][participantInfo['status'] || 0]}
                                    </td>
                                    <td>
                                        {participantInfo['comment']}
                                    </td>
                                </tr>
                            }
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    ), document.body);
}

export default BookSession;
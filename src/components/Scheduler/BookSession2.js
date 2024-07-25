import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../firebase/config';
import Swal from 'sweetalert2';


import './BookSession2.css';
import LogEvent from '../CommonFunctions/LogEvent';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';
import FormatTime from '../CommonFunctions/FormatTime';

function BookSession2({ showBookSession2, setShowBookSession2 }) {
    const [days, setDays] = useState([]);
    const [timeslots, setTimeslots] = useState({});
    const [calculatedTimeslots, setCalculatedTimeslots] = useState([]);
    const [participantInfo, setParticipantInfo] = useState({});

    const participantId = showBookSession2;

    const updateValue = (path, value) => {
        realtimeDb.ref(path).update(value);
    }

    useEffect(() => {
        if (Object.keys(participantInfo).length === 0) return;
        const listener = realtimeDb.ref("/timeslots").on('value', res => {
            let data = res.val() || {};
            let temp = {};
            Object.keys(data).map(sessionId => {
                const gender = data[sessionId]['gender'];
                if (gender !== participantInfo['gender']) return;
                temp[sessionId] = data[sessionId];
            })
            setTimeslots(temp);
        });
        return () => realtimeDb.ref("/timeslots").off('value', listener);
    }, [JSON.stringify(participantInfo)]);

    useEffect(() => {
        if (!participantId) return;
        const listener = realtimeDb.ref('/participants/' + participantId).on('value', res => setParticipantInfo(res.val() || {}));
        return () => realtimeDb.ref('/participants/' + participantId).off('value', listener);
    }, [participantId]);

    function bookSession(sessionId) {
        let backupSession = timeslots[sessionId]['backup'] === true;

        Swal.fire({
            title: "Booking an appointment",
            showCancelButton: true,
            confirmButtonText: backupSession ? 'Yes (backup)' : 'Yes',
            html: "<b>" + TimeSlotFormat(sessionId) + "<br/>" +
                participantInfo['firstName'] + " " + participantInfo['lastName'] + "</b>" +
                (backupSession ? "<br/><br/><b><u>!!! BACKUP SESSION !!!</u></b><br/>" : ""),

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
                updateValue("/timeslots/" + sessionId, data);
                setShowBookSession2("");

                LogEvent({
                    value: 'Booked session',
                    participantId: participantId,
                    action: 8
                });

                updateValue('/participants/' + participantId, { status: 2 });

                LogEvent({
                    participantId: participantId,
                    value: "Participant status: '" + "Scheduled" + "'",
                    action: 0
                });
            }
        })
    }

    useEffect(() => {
        let tempDays = [];
        let tempTimeslots = [];
        const now = new Date();
        Object.keys(timeslots).map(sessionId => {
            const day = sessionId.substring(0, 4) + "-" + sessionId.substring(4, 6) + "-" + sessionId.substring(6, 8);
            const dateOfSession = new Date(day);
            const diffTime = dateOfSession - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if (diffDays < -7) return;

            if (!tempDays.includes(day)) tempDays.push(day);

            const timeslot = sessionId.substring(9, 11) + ":" + sessionId.substring(11, 13);
            if (!tempTimeslots.includes(timeslot)) tempTimeslots.push(timeslot);
        });

        setDays(tempDays);

        tempTimeslots.sort();
        setCalculatedTimeslots(tempTimeslots);
    }, [timeslots])

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) setShowBookSession2(false) };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return ReactDOM.createPortal((
        <div id="modalBookSession2Backdrop" onClick={(e) => { if (e.target.id === "modalBookSession2Backdrop") setShowBookSession2(""); }}>
            <div id="mainContainer">
                <div id="header">Booking an appointment</div>
                <div id="subHeader">{participantInfo['firstName']} {participantInfo['lastName']} ({participantId})</div>
                <div id="tableContainer">
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                {days.map(day => {
                                    return <th key={"scheduler-table-item-" + day}>
                                        {day}
                                    </th>
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {calculatedTimeslots.map(timeslot => {
                                return <tr key={"scheduler-table-item-" + timeslot}>
                                    <th>{FormatTime(timeslot)}</th>
                                    {days.map(day => {
                                        let sessionId = day.replaceAll('-', '') + '_' + timeslot.replaceAll(':', '') + '_';
                                        let sessionIdWithLab = "";
                                        let bookedSessions = Object.keys(timeslots).filter(key => key.startsWith(sessionId) && timeslots[key]['participantId']).length;
                                        let totalOfSessions = Object.keys(timeslots).filter(key => key.startsWith(sessionId) && !timeslots[key]['locked']).length;
                                        let nextFreeLab = "";
                                        let free = bookedSessions < totalOfSessions;
                                        if (free) {
                                            nextFreeLab = Object.keys(timeslots).filter(key => key.startsWith(sessionId) && !timeslots[key]['participantId']).sort((a, b) => a < b ? 1 : -1).sort((a, b) => timeslots[a]['backup'] ? 1 : -1)[0].substring(14);
                                            sessionIdWithLab = day.replaceAll('-', '') + '_' + timeslot.replaceAll(':', '') + '_' + nextFreeLab;
                                        }
                                        return (
                                            <td
                                                className={free ? "free-sessions" : "booked-sessions"}
                                                onClick={() => { if (free) bookSession(sessionIdWithLab) }}
                                            >
                                                {bookedSessions + " / " + totalOfSessions}
                                            </td>
                                        )
                                    })}
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    ), document.body)
};

export default BookSession2;
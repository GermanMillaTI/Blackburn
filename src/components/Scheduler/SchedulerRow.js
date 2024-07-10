import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setShowUpdateSession } from '../../Redux/Features';
import { realtimeDb } from '../../firebase/config';
import Swal from 'sweetalert2';
import Tooltip from '@mui/material/Tooltip';
import { format } from 'date-fns';


import './index.css';
import Constants from '../Constants';
import LogEvent from '../CommonFunctions/LogEvent';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';
import BookSession from './BookSession';
import ParticipantInfoTooltip from "./ParticipantInfoTooltip";

function SchedulerRow({ participants, timeslots, sessionId, index, array, client }) {
    const [showBookSession, setShowBookSession] = useState(false);
    const [selectedSessionId, setSelectedSessionId] = useState("");
    const [justBookedSession, setJustBookedSession] = useState("");
    const dispatch = useDispatch();

    const updateValue = (path, value) => {
        realtimeDb.ref(path).update(value);
    }

    const participantId = timeslots[sessionId]['participantId'];
    const participantInfo = participants[participantId] || {};

    // Update value in DB
    function cancelSession(sessionId) {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            html: 'By cancelling the session, it will be deleted from the timetable!',
            confirmButtonText: 'Yes, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                let path = "/timeslots/" + sessionId;
                let data = {
                    participantId: "",
                    status: "",
                    confirmed: "",
                    remind: false,
                    comments: ""
                }

                // Set the bonuses to false
                let bonuses = timeslots[sessionId]['bonus'];
                if (bonuses) {
                    data['bonus'] = JSON.parse(JSON.stringify(bonuses));
                    Object.keys(bonuses).map(bonusId => {
                        data['bonus'][bonusId]['a'] = false;
                    })
                }

                updateValue(path, data);

                LogEvent({
                    participantId: timeslots[sessionId]['participantId'],
                    value: 'Cancelled session: ' + sessionId,
                    action: 9
                })
            }
        })
    }


    function sendReminder(sessionId) {

        Swal.fire({
            title: "Reminder",
            showCancelButton: true,
            confirmButtonText: 'Yes, send',
            html: "Are you sure?"
        }).then((result) => {
            if (result.isConfirmed) {
                updateValue("/timeslots/" + sessionId, { remind: false });

                const scriptURL = 'https://script.google.com/macros/s/AKfycbyJVtGd_9WgJy5HwIB1_Y_qZG9YCBlbG1Y5uLVn7d3k9FbknSvOTuL_0aASWwsv6hQZOA/exec';
                fetch(scriptURL, {
                    method: 'POST',
                    muteHttpExceptions: true,
                    body: JSON.stringify({
                        "participantId": participantId,
                        "emailType": "Reminder",
                        "firstName": participantInfo['firstName'],
                        "lastName": participantInfo['lastName'],
                        "email": participantInfo['email'],
                        "appointment": sessionId
                    })

                }).then(res => {
                    Swal.fire({
                        toast: true,
                        icon: 'success',
                        title: 'Reminder sent',
                        animation: false,
                        position: 'bottom',
                        width: 'unset',
                        showConfirmButton: false,
                        timer: 2000
                    })
                });
            }
        })
    }

    function lockSession(sessionId) {
        updateValue("/timeslots/" + sessionId, { locked: true });
        LogEvent({
            value: 'Locked session: ' + sessionId,
            action: 6
        })
    }

    function unlockSession(sessionId) {
        updateValue("/timeslots/" + sessionId, { locked: false });
        LogEvent({
            value: 'Unlocked session: ' + sessionId,
            action: 7
        })
    }

    return (<tr key={"schedule-row-" + index} className={(justBookedSession == sessionId ? "highlighted-session-row" : "") + (index < array.length - 1 ? (sessionId.substring(0, 13) != array[index + 1].substring(0, 13) ? " day-separator" : "") : "")}>
        <td className="center-tag no-wrap">
            {TimeSlotFormat(sessionId)}
        </td>
        <td className={"center-tag " + (timeslots[sessionId]['locked'] === true ? "locked-session-cell" : "")}>
            {timeslots[sessionId]['locked'] === true ? "Locked" : Constants['sessionStatuses'][timeslots[sessionId]['status']]}
        </td>
        <td className="center-tag">
            {Constants['participantStatuses'][participantInfo['status']] || ""}
        </td>
        {timeslots[sessionId]['participantId'] ?
            <ParticipantInfoTooltip participants={participants} timeslots={timeslots} participantId={participantId} sessionId={sessionId} client={client} />
            : <td></td>}
        <td className="center-tag">
            {participantInfo['appleId']}
        </td>
        <td >
            {participantId ? (participantInfo['firstName'] + " " + participantInfo['lastName']) : ""}
        </td>
        <td >
            {participantId ? (participantInfo['email']) : ""}
        </td>
        <td>
            {timeslots[sessionId]['comments']}
        </td>
        <td className="center-tag">
            <div className="buttons-of-timeslot">
                {timeslots[sessionId]['status'] === "" && !timeslots[sessionId]['locked'] && <button className="update-timeslot-button book-button" onClick={() => { setSelectedSessionId(sessionId); setShowBookSession(true) }}>Book</button>}
                {timeslots[sessionId]['status'] === "" && !timeslots[sessionId]['locked'] && <button className="update-timeslot-button lock-button" onClick={() => { lockSession(sessionId) }}>Lock</button>}
                {timeslots[sessionId]['status'] === "" && timeslots[sessionId]['locked'] === true && <button className="update-timeslot-button unlock-button" onClick={() => { unlockSession(sessionId) }}>Unlock</button>}
                {timeslots[sessionId]['status'] === 0 && timeslots[sessionId]['remind'] == true && <button className="update-timeslot-button remind-button" onClick={() => sendReminder(sessionId)}>Remind</button>}
                {timeslots[sessionId]['status'] !== "" && <button className="update-timeslot-button update-button" onClick={() => dispatch(setShowUpdateSession(sessionId))}>Update</button>}
                {timeslots[sessionId]['status'] !== "" && <button className="update-timeslot-button cancel-button" onClick={() => cancelSession(sessionId)}>Cancel</button>}
            </div>
        </td>
        {showBookSession && <BookSession participants={participants} timeslots={timeslots} setShowBookSession={setShowBookSession} selectedSessionId={selectedSessionId} setJustBookedSession={setJustBookedSession} />}
    </tr>
    )
}

export default SchedulerRow;
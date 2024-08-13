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

    const sessionInfo = timeslots[sessionId] || {};
    const participantId = sessionInfo['participantId'];
    const participantInfo = participants[participantId] || {};

    function cancelSession(sessionId) {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            html: 'By cancelling the session, it will be deleted from the timetable!',
            confirmButtonText: 'Yes, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                const path = "/timeslots/" + sessionId;
                const data = {
                    participantId: null,
                    bonus: null,
                    failedComp: null,
                    makeup: null,
                    status: null,
                    remind: null,
                    comments: null
                }

                updateValue(path, data);

                LogEvent({
                    participantId: sessionInfo['participantId'],
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
                realtimeDb.ref("/timeslots/" + sessionId + "/remind").remove();

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
        realtimeDb.ref("/timeslots/" + sessionId + "/locked").remove();
        LogEvent({
            value: 'Unlocked session: ' + sessionId,
            action: 7
        })
    }

    // Removing old 'remind' parameters
    if (sessionInfo['remind'] !== undefined) {
        const currentDate = parseInt(format(new Date(), 'yyyyMMdd'));
        const timeslotDate = parseInt(sessionId.substring(0, 8));
        if (currentDate - timeslotDate > 1) realtimeDb.ref("/timeslots/" + sessionId + "/remind").remove();
    }

    return (<tr key={"schedule-row-" + index} className={(justBookedSession == sessionId ? "highlighted-session-row" : "") + (index < array.length - 1 ? (sessionId.substring(0, 13) != array[index + 1].substring(0, 13) ? " day-separator" : "") : "")}>
        <td className="center-tag no-wrap">
            {TimeSlotFormat(sessionId)}
        </td>
        <td className={"center-tag " + (sessionInfo['locked'] === true ? "locked-session-cell" : "")}>
            {sessionInfo['locked'] === true ? "Locked" : Constants['sessionStatuses'][sessionInfo['status']]}
        </td>
        <td className="center-tag">
            {Constants['participantStatuses'][participantInfo['status']] || ""}
        </td>
        {sessionInfo['participantId'] ?
            <ParticipantInfoTooltip participants={participants} timeslots={timeslots} participantId={participantId} sessionId={sessionId} client={client} />
            : <td></td>}
        <td className="center-tag">
            {participantInfo['appleId']}
        </td>
        <td >
            {participantId ? (participantInfo['firstName'] + " " + participantInfo['lastName']) : ""}
        </td>
        <td >
            {participantInfo['email']}
        </td>
        <td>
            {sessionInfo['comments']}
        </td>
        <td className="center-tag">
            {Constants['genders'][sessionInfo['gender']]}
        </td>
        <td className="center-tag">
            <div className="buttons-of-timeslot">
                {sessionInfo['status'] === undefined && !sessionInfo['locked'] && <button className="update-timeslot-button book-button" onClick={() => { setSelectedSessionId(sessionId); setShowBookSession(true) }}>Book</button>}
                {sessionInfo['status'] === undefined && !sessionInfo['locked'] && <button className="update-timeslot-button lock-button" onClick={() => { lockSession(sessionId) }}>Lock</button>}
                {sessionInfo['status'] === undefined && sessionInfo['locked'] === true && <button className="update-timeslot-button unlock-button" onClick={() => { unlockSession(sessionId) }}>Unlock</button>}
                {sessionInfo['status'] === 0 && sessionInfo['remind'] == true && <button className="update-timeslot-button remind-button" onClick={() => sendReminder(sessionId)}>Remind</button>}
                {sessionInfo['status'] !== undefined && <button className="update-timeslot-button update-button" onClick={() => dispatch(setShowUpdateSession(sessionId))}>Update</button>}
                {sessionInfo['status'] !== undefined && <button className="update-timeslot-button cancel-button" onClick={() => cancelSession(sessionId)}>Cancel</button>}
            </div>
        </td>
        {showBookSession && <BookSession participants={participants} timeslots={timeslots} setShowBookSession={setShowBookSession} selectedSessionId={selectedSessionId} setJustBookedSession={setJustBookedSession} />}
    </tr>
    )
}

export default SchedulerRow;
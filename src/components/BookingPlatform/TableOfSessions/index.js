import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../../firebase/config';
import Swal from 'sweetalert2';


import './index.css';
import LogEvent from '../../CommonFunctions/LogEvent';
import TimeSlotFormat from '../../CommonFunctions/TimeSlotFormat';
import FormatTime from '../../CommonFunctions/FormatTime';

function TableOfSessions({ participantId, participantInfo }) {
    const [days, setDays] = useState([]);
    const [timeslots, setTimeslots] = useState({});
    const [calculatedTimeslots, setCalculatedTimeslots] = useState([]);

    useEffect(() => {
        if (Object.keys(participantInfo).length === 0) return;
        const listener = realtimeDb.ref("/timeslots").orderByChild('status').equalTo('').on('value', res => {
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
    }, [timeslots]);

    function bookSession(sessionId) {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            confirmButtonText: 'Book',
            text: TimeSlotFormat(sessionId)
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
                realtimeDb.ref("/timeslots/" + sessionId).update(data);
                realtimeDb.ref('/participants/' + participantId).update({ status: 2 });

                Swal.fire({
                    title: "Success",
                    text: "Session booked",
                    icon: 'success'
                });
            }
        })
    }

    return <div id="tableOfSessions">
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
                                    {free ? '0/1' : 'Booked'}
                                </td>
                            )
                        })}
                    </tr>
                })}
            </tbody>
        </table>
    </div>
};

export default TableOfSessions;
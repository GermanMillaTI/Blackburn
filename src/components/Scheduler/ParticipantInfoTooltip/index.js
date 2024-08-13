import React from "react";
import Tooltip from '@mui/material/Tooltip';
import format from 'date-fns/format';

import './index.css';
import Constants from '../../Constants';

function ParticipantInfoTooltip({ participants, timeslots, participantId, sessionId, client }) {

    if (Object.keys(client).length === 0) return null;

    const timeSlotFormat = (timeslotId) => {
        if (!timeslotId) return "";
        const formatted = timeslotId.substring(0, 4) + '-' + timeslotId.substring(4, 6) + '-' + timeslotId.substring(6, 8) + 'T' + timeslotId.substring(9, 11) + ':' + timeslotId.substring(11, 13);
        return format(new Date(formatted), "yyyy-MM-dd hh:mm a");
    }

    const clientTimeslotFormat = (timeslotId) => {
        if (!timeslotId) return "";
        return format(new Date(timeslotId), "yyyy-MM-dd hh:mm a");
    }

    const participantInfo = participants[participantId] || {};
    let participantSessions = {};
    Object.keys(timeslots).map(timeslotId => {
        const timeslot = timeslots[timeslotId];
        if (participantId === timeslot['participantId']) participantSessions[timeslotId] = timeslot;
    })

    const appleId = participantInfo['appleId'] || "";
    const sessionInfo = timeslots[sessionId];

    const clientContributions = client['contributions'][appleId || ''] || [];

    var discrepancies = {
        dateOfBirth: false,
        gender: false,
        ethnicities: false,
        skintone: false,
        hairColor: false,
        hairLength: false,
        hairType: false
    }

    let clientParticipantInfo = {};
    if (clientContributions.length == 1) {
        clientParticipantInfo = clientContributions.pop();
    } else if (clientContributions.length > 1) {
        const telusDate = new Date(sessionId.substring(0, 4) + "-" + sessionId.substring(4, 6) + "-" + sessionId.substring(6, 8) + " " + sessionId.substring(9, 11) + ":" + sessionId.substring(11, 13));

        var diff = 1000000;

        clientContributions.map(contribution => {
            const appleDateRaw = contribution['date'];
            if (appleDateRaw) {
                const appleDate = new Date(appleDateRaw);

                const diffTime = Math.abs(telusDate - appleDate);
                const diffMinutes = Math.abs(Math.ceil(diffTime / (1000 * 60)));
                if (diffMinutes <= diff) {
                    diff = diffMinutes;
                    clientParticipantInfo = contribution;
                };
            }
        })
    }

    if (Object.keys(clientParticipantInfo).length > 0 && appleId) {
        // Check if the ppt or the session has different info from the client
        const clientDateOfBirth = clientParticipantInfo['dob'] ? clientParticipantInfo['dob'].toString().substring(0, 4) + "-" + clientParticipantInfo['dob'].toString().substring(4, 6) + "-" + clientParticipantInfo['dob'].toString().substring(6, 8) : '';
        if (participantInfo['dob'].substring(0, 10) !== clientDateOfBirth) discrepancies['dateOfBirth'] = true;
        if (participantInfo['gender'] != clientParticipantInfo['gender']) discrepancies['gender'] = true;
        if (participantInfo['ethnicities'] != clientParticipantInfo['ethnicities']) discrepancies['ethnicities'] = true;
        if (participantInfo['skintone'] != clientParticipantInfo['skintone']) discrepancies['skintone'] = true;
        if (participantInfo['hairColor'] != clientParticipantInfo['hairColor']) discrepancies['hairColor'] = true;
        if (participantInfo['hairLength'] != clientParticipantInfo['hairLength']) discrepancies['hairLength'] = true;
        if (participantInfo['hairType'] != clientParticipantInfo['hairType']) discrepancies['hairType'] = true;
    }
    var discrepancy = Object.values(discrepancies).includes(true);

    var listedContributions = [];
    var listedContributionDays = {};
    if (appleId) {
        Object.keys(participantSessions).map(item => {
            const day = item.substring(0, 8);
            const counter = Object.keys(participantSessions).filter(x => x.substring(0, 8) == day).length;
            if ((listedContributionDays[day] || 0) < counter) listedContributionDays[day] = counter;
        })

        clientContributions.map(item => {
            const appleDateRaw = item['date'];
            if (appleDateRaw) {
                let appleDate = new Date(appleDateRaw);
                const day = format(appleDate, "yyyyMMdd");

                const counter = clientContributions.filter(x => {
                    const appleDateRaw = x['date'];
                    let appleDate = new Date(appleDateRaw);
                    const day2 = format(appleDate, "yyyyMMdd");
                    return day == day2;
                }).length

                if ((listedContributionDays[day] || 0) < counter) listedContributionDays[day] = counter;
            }
        })

        Object.keys(listedContributionDays).map(day => {
            const counter = listedContributionDays[day];
            for (var x = 0; x < counter; x++) {

                const appleContribution = clientContributions.filter(item => item['date'].replaceAll('-', '').startsWith(day))[x];
                let appleContributionDate = "";
                let appleContributionStatus = "";
                let appleSessionOutput = "";
                if (appleContribution) {
                    appleContributionDate = clientTimeslotFormat(appleContribution['date']);
                    appleContributionStatus = Constants['clientSessionStatuses'][appleContribution['status']];
                    appleSessionOutput = appleContributionDate.substring(11) + ": " + appleContributionStatus;
                }

                const telusContributionKey = Object.keys(participantSessions).filter(item => item.startsWith(day))[x];
                let sameDayTelusContributionDate = "";
                let sameDayTelusContributionStatus = "";
                let telusSessionOutput = "";
                if (telusContributionKey) {
                    sameDayTelusContributionDate = timeSlotFormat(telusContributionKey);
                    sameDayTelusContributionStatus = Constants['sessionStatuses'][timeslots[telusContributionKey]['status']];
                    telusSessionOutput = sameDayTelusContributionDate.substring(11) + ": " + sameDayTelusContributionStatus
                }

                var statusDiscrepancy = false;
                if (sameDayTelusContributionStatus !== appleContributionStatus) {
                    statusDiscrepancy = true;
                    discrepancy = true;
                }

                listedContributions.push({
                    sameday: sessionId.startsWith(day),
                    statusDiscrepancy: statusDiscrepancy,
                    date: day.substring(0, 4) + "-" + day.substring(4, 6) + "-" + day.substring(6, 8),
                    telus: telusSessionOutput,
                    apple: appleSessionOutput
                })
            }
        })
    }

    return (
        <Tooltip
            disableInteractive
            TransitionProps={{ timeout: 100 }}
            componentsProps={{ tooltip: { sx: { fontSize: '1em', maxWidth: '100em' }, } }}
            title={
                <table className="popup-table-participant-info center-tag">
                    {appleId && <thead>
                        <tr>
                            <th>Property</th>
                            <th>Telus</th>
                            {appleId && <th>Apple</th>}
                        </tr>
                    </thead>}
                    <tbody>
                        {appleId && <tr>
                            <th>ID</th>
                            <td>{participantId}</td>
                            {appleId && <td>{appleId || ""}</td>}
                        </tr>}
                        <tr className={discrepancies['dateOfBirth'] ? "session-item-discrepancy" : ""}>
                            <th>Date of birth</th>
                            <td>{participantInfo['dob'].substring(0, 10)}</td>
                            {appleId && <td>{clientParticipantInfo['dob'] ? clientParticipantInfo['dob'].toString().substring(0, 4) + "-" + clientParticipantInfo['dob'].toString().substring(4, 6) + "-" + clientParticipantInfo['dob'].toString().substring(6, 8) : ''}</td>}
                        </tr>
                        <tr className={discrepancies['gender'] ? "session-item-discrepancy" : ""}>
                            <th>Gender</th>
                            <td>{Constants['genders'][participantInfo['gender']]}</td>
                            {appleId && <td>{clientParticipantInfo['gender'] !== undefined ? Constants['genders'][clientParticipantInfo['gender']] : ''}</td>}
                        </tr>
                        <tr className={discrepancies['ethnicities'] ? "session-item-discrepancy" : ""}>
                            <th>Ethnicity</th>
                            <td>
                                {participantInfo['ethnicities'].toString().split(';').length > 1 ? <ul>
                                    {participantInfo['ethnicities'].toString().split(';').map(eth => {
                                        return <li>{Constants['ethnicitiesDisplay'][eth]}</li>
                                    })}
                                </ul>
                                    : Constants['ethnicitiesDisplay'][participantInfo['ethnicities'].toString()]}
                            </td>
                            {appleId && clientParticipantInfo['ethnicities'] && <td>
                                {clientParticipantInfo['ethnicities'].toString().split(';').length > 1 ? <ul>
                                    {clientParticipantInfo['ethnicities'].toString().split(';').map(eth => {
                                        return <li>{Constants['ethnicitiesDisplay'][eth]}</li>
                                    })}
                                </ul>
                                    : Constants['ethnicitiesDisplay'][clientParticipantInfo['ethnicities'].toString()]}
                            </td>}
                        </tr>
                        <tr className={discrepancies['skintone'] ? "session-item-discrepancy" : ""}>
                            <th>Skintone</th>
                            <td>{participantInfo['skintone']}</td>
                            {appleId && <td>{clientParticipantInfo['skintone']}</td>}
                        </tr>
                        <tr className={discrepancies['hairColor'] ? "session-item-discrepancy" : ""}>
                            <th>Hair color</th>
                            <td>{Constants['hairColor'][participantInfo['hairColor']]}</td>
                            {appleId && <td>{clientParticipantInfo['hairColor'] !== undefined ? Constants['hairColor'][clientParticipantInfo['hairColor']] : ''}</td>}
                        </tr>
                        <tr className={discrepancies['hairLength'] ? "session-item-discrepancy" : ""}>
                            <th>Hair length</th>
                            <td>{Constants['hairLength'][participantInfo['hairLength']]}</td>
                            {appleId && <td>{clientParticipantInfo['hairLength'] !== undefined ? Constants['hairLength'][clientParticipantInfo['hairLength']] : ''}</td>}
                        </tr>
                        <tr className={discrepancies['hairType'] ? "session-item-discrepancy" : ""}>
                            <th>Hair type</th>
                            <td>{Constants['hairType'][participantInfo['hairType']]}</td>
                            {appleId && <td>{clientParticipantInfo['hairType'] !== undefined ? Constants['hairType'][clientParticipantInfo['hairType']] : ''}</td>}
                        </tr>
                        <tr>
                            <th>Height</th>
                            <td>{participantInfo['heightFt']}' {participantInfo['heightIn']}" </td>
                            {appleId && <td>{clientParticipantInfo['height']} cm</td>}
                        </tr>
                        <tr>
                            <th>Weight</th>
                            <td>{participantInfo['weightLbs']} lbs</td>
                            {appleId && <td>{clientParticipantInfo['weight']} lbs</td>}
                        </tr>
                        <tr>
                            <th>Date of info</th>
                            <td>{timeSlotFormat(sessionId)}</td>
                            {appleId && <td className={sessionId.startsWith((clientParticipantInfo['date'] || "--").substring(0, 10).replaceAll("-", "")) ? "" : "session-item-discrepancy"}>
                                {clientTimeslotFormat(clientParticipantInfo['date'])}
                            </td>}
                        </tr>

                        {listedContributions.length > 0 && <>
                            <tr colSpan="3">
                                <td>&nbsp;</td>
                            </tr>
                            <tr colSpan="3">
                                <td>&nbsp;</td>
                            </tr>
                            <tr>
                                <th>Day</th>
                                <th>Telus</th>
                                <th>Apple</th>
                            </tr>
                            {listedContributions.map(contribution => {
                                return <tr>
                                    <th className={contribution['sameday'] ? "session-item-sameday" : ""}>{contribution['date']}</th>
                                    <td className={contribution['statusDiscrepancy'] ? "session-item-discrepancy" : ""}>{contribution['telus']}</td>
                                    <td className={contribution['statusDiscrepancy'] ? "session-item-discrepancy" : ""}>{contribution['apple']}</td>
                                </tr>
                            })}
                        </>
                        }

                    </tbody>
                </table>
            }
        >
            <td className={"center-tag" + (discrepancy ? " session-discrepancy" : "")}>{sessionInfo['participantId']}</td>
        </Tooltip>
    )
}

export default ParticipantInfoTooltip;
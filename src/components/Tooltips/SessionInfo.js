import React, { useEffect, useState, useRef } from "react";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Constants from "../Constants";

import './SessionInfo.css';

function SessionInfo({ database, participantId, sessionId }) {
    const participantInfo = database['participants'][participantId] || {};
    const sessionInfo = database['timeslots'][sessionId];

    return (
        <Tooltip
            disableInteractive
            placement="right"
            TransitionProps={{ timeout: 100 }}
            componentsProps={{ tooltip: { sx: { fontSize: '1em', maxWidth: '100em' }, } }}
            title={
                <table className="popup-table-participant-info center-tag">
                    <tbody>
                        <tr>
                            <th># {participantId}</th>
                            <td>{participantInfo['firstName'] + " " + participantInfo['lastName']}</td>
                        </tr>

                    </tbody>
                </table>
            }
        >
            <td className="participant-id-cell center-tag">{sessionInfo['participant_id']}</td>
        </Tooltip>
    )
}

export default SessionInfo;
import React, { useEffect, useState } from 'react';
import { realtimeDb, getFileUrl } from '../../firebase/config';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import md5 from 'md5';
import { updateValue } from "../../firebase/config"
import Tooltip from '@mui/material/Tooltip';


import './ParticipantCard.css';
import Constants from '../Constants';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import LogEvent from '../CommonFunctions/LogEvent';
import GetFormattedLogDate from '../CommonFunctions/GetFormattedLogDate';

function ParticipantCard({ participantId, participants }) {
    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userId = userInfo['userId'];
    const [checkDocuments, setCheckDocuments] = useState("");


    const participantInfo = participants[participantId];


    function openDocuments(participantId) {
        setCheckDocuments(participantId);
    }






    return <div className="participant-card">
        <div className="participant-card-column column-1">

            <div className="participant-attribute-container">
                <span className="field-label"># {participantId}</span>
                <span>
                    {participantInfo['fname'] + " " + participantInfo['lname']}
                </span>
            </div>

            <div className="participant-attribute-container">
                <span className="field-label">E-mail</span>
                <span>
                    {participantInfo['email']}
                    <a className="copy-email-link fas fa-copy"
                        title="Copy email"
                        onClick={(e) => {
                            e.preventDefault();
                            const email = participantInfo['email'];
                            navigator.clipboard.writeText(email);

                            Swal.fire({
                                toast: true,
                                icon: 'success',
                                title: 'Copied: ' + email,
                                position: 'bottom',
                                width: 'unset',
                                showConfirmButton: false,
                                timer: 2000
                            })
                        }} target="_blank" />
                </span>
            </div>

            <div className="participant-attribute-container">
                <span className="field-label">Metadata</span>
                <span>
                    {Constants['genders'][participantInfo['gender']]} / {GetAgeRange(participantInfo)['ageRange']}   (DOB: {participantInfo['dob']})
                </span>
            </div>
            <div className="participant-attribute-container">
                <span className="field-label">Biometrics</span>
                <span>
                    {`${participantInfo['height_ft']}' ${participantInfo['height_in']}''`} / {participantInfo['weight_lbs']}
                </span>

            </div>
            <div className="participant-attribute-container">
                <span className="field-label">Skin tone</span>
                <span>
                    {participantInfo['skintone']}
                </span>
            </div>


        </div>

        <div className="participant-card-column column-2">
            <div className="participant-attribute-container">
                <span className="field-label">Identification</span>
                <button onClick={() => openDocuments(participantId)}>Open</button>
            </div>
            <div className="participant-attribute-container">

                <span className="field-label">Status</span>

                <select className="participant-data-selector min-width-selector"
                    onChange={(e) => {
                        updateValue("/participants/" + participantId, { status: parseInt(e.currentTarget.value) });
                        LogEvent({ participantId, action: 0, value: parseInt(e.currentTarget.value), userId: userId });
                    }}>
                    {Object.keys(Constants['participantStatuses']).map(statusId => {
                        const status = Constants['participantStatuses'][statusId];
                        return <option key={"participant-status-" + statusId} value={statusId} selected={statusId == participantInfo['status']}>{status}</option>
                    })}
                </select>
            </div>





            <div className="participant-attribute-container">
                <textarea className="participant-comment"
                    defaultValue={participantInfo['comment']}
                    onBlur={(e) => {
                        const newComment = e.currentTarget.value;
                        if (newComment != participantInfo['comment']) {
                            updateValue("/participants/" + participantId, { comment: newComment });
                            LogEvent({ participantId, action: 1, value: newComment, userId: userId });
                        }
                    }}
                    placeholder="Comments..."
                    onInput={(e) => {
                        let height = e.currentTarget.offsetHeight;
                        let newHeight = e.currentTarget.scrollHeight;
                        if (newHeight > height) {
                            e.currentTarget.style.height = 0;
                            e.currentTarget.style.height = newHeight + "px";
                        }
                    }}
                />
            </div>
        </div>


    </div >
}

export default ParticipantCard;
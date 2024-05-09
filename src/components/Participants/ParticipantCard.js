import React, { useEffect, useState } from 'react';
import { realtimeDb, getFileUrl } from '../../firebase/config';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import md5 from 'md5';
import { updateValue } from "../../firebase/config";
import CheckDocuments from '../CheckDocuments';


import './ParticipantCard.css';
import Constants from '../Constants';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import LogEvent from '../CommonFunctions/LogEvent';
import GetFormattedLogDate from '../CommonFunctions/GetFormattedLogDate';
import { ref } from 'firebase/storage';

function ParticipantCard({ participantId, participants }) {
    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userId = userInfo['userId'];
    const [showDocs, setShowDocs] = useState(false)


    const participantInfo = participants[participantId];







    return <div className="participant-card">
        <div className="participant-card-column column-1">
            {participantInfo['registeredAs'] === 1 &&
                <span className="registered-by-parent">Registered by parent or guardian</span>
            }

            <div className="participant-attribute-container">
                <span className="field-label"># {participantId}</span>
                <span>
                    {participantInfo['firstName'] + " " + participantInfo['lastName']}
                </span>
            </div>


            {participantInfo['registeredAs'] === 0
                && <>
                    <div className="participant-attribute-container">
                        <span className="field-label">Phone</span><span className={participantInfo['phone_counter'] > 1 ? "highlighted-span" : ""}>
                            {participantInfo['phone'].toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                            <div className="copy-email-link fas fa-copy"
                                title="Copy phone number"
                                onClick={(e) => {
                                    e.preventDefault();
                                    let phone = "+" + participantInfo['phone'];
                                    navigator.clipboard.writeText(phone);

                                    Swal.fire({
                                        toast: true,
                                        icon: 'success',
                                        title: 'Copied: ' + phone,
                                        position: 'bottom',
                                        width: 'unset',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }} target="_blank" />
                        </span>
                    </div>
                    <div className="participant-attribute-container">
                        <span className="field-label">E-mail</span>
                        <span>
                            {participantInfo['email']}
                            <div className="copy-email-link fas fa-copy"
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
                    </div></>
            }


            <div className="participant-attribute-container">
                <span className="field-label">Metadata</span>
                <span>
                    {Constants['genders'][participantInfo['gender']]} / {GetAgeRange(participantInfo)['ageRange']}   (DOB: {participantInfo['dob']})
                </span>
            </div>
            <div className="participant-attribute-container">
                <span className="field-label">Biometrics</span>
                <span>
                    {`${participantInfo['heightFt']}' ${participantInfo['heightIn']}''`} / {participantInfo['weightLbs']}
                </span>

            </div>
            <div className="participant-attribute-container">

                <span className="field-label">Skin tone</span>
                <span>
                    {participantInfo['skintone']}
                </span>
            </div>

            {
                participantInfo['registeredAs'] === 1 && <>
                    <hr />

                    <div className="participant-attribute-container">
                        <span className="field-label">Parent Name</span>
                        <span>
                            {`${participantInfo['guardianFirstName']} ${participantInfo['guardianLastName']}`}
                        </span>
                    </div>
                    <div className="participant-attribute-container">
                        <span className="field-label">Phone</span><span className={participantInfo['phone_counter'] > 1 ? "highlighted-span" : ""}>
                            {participantInfo['phone'].toString().replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")}
                            <div className="copy-email-link fas fa-copy"
                                title="Copy phone number"
                                onClick={(e) => {
                                    e.preventDefault();
                                    let phone = "+" + participantInfo['phone'];
                                    navigator.clipboard.writeText(phone);

                                    Swal.fire({
                                        toast: true,
                                        icon: 'success',
                                        title: 'Copied: ' + phone,
                                        position: 'bottom',
                                        width: 'unset',
                                        showConfirmButton: false,
                                        timer: 2000
                                    })
                                }} target="_blank" />
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
                </>
            }



        </div>

        <div className="participant-card-column column-2">
            <div className="participant-attribute-container">
                <span className="field-label">Identification</span>
                <select className="participant-data-selector"
                    onChange={(e) => {
                        updateValue("/participants/" + participantId, { document_approval: parseInt(e.currentTarget.value) });
                        LogEvent({
                            pid: participantId,
                            action: 3,
                            value: "Document status: " + (e.currentTarget.value || "Blank") + "'"
                        })
                    }}
                >
                    {Object.values(Constants['documentStatuses']).map((s, i) => (
                        <option key={"documents" + i} value={parseInt(i)} selected={i == parseInt(participantInfo['document_approval'])}>{s}</option>
                    ))}</select>
                <button className={"doc-button" + (participantInfo['docs']['pending'] ? " pending-doc" : "")}
                    onClick={
                        () => {
                            setShowDocs(true);
                            updateValue(`/participants/${participantId}/docs`, { pending: false })
                        }
                    }>
                    Open
                    ({Object.keys(participantInfo['docs'][participantId]).length})
                </button>
                <a className="mark-unchecked fas fa-bookmark" onClick={(e) => {
                    e.preventDefault();
                    updateValue(`/participants/${participantId}/docs`, { pending: true })
                }}></a>
            </div>
            {showDocs && <CheckDocuments setShowDocs={setShowDocs} participantId={participantId} />}
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
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../firebase/config';
import Swal from 'sweetalert2';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import md5 from 'md5';
import { ref, onValue, off } from 'firebase/database';
import { useDispatch } from 'react-redux';
import { setShowUpdateSession } from '../../Redux/Features';
import { updateValue } from "../../firebase/config";
import './UpdateSession.css';
import Constants from '../Constants';
import LogEvent from '../CommonFunctions/LogEvent';
import { renderToString } from 'react-dom/server';

export default ({ showUpdateSession, showLog, setShowLog }) => {
    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userId = userInfo['userId'];

    const sessionId = showUpdateSession;
    const [session, setSession] = useState({});
    const [participantId, setParticipantId] = useState('');
    const [participantInfo, setParticipantInfo] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {

        const path = '/timeslots/' + showUpdateSession;
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {
            const temp = res.val() || {};
            setSession(temp);
            const participantId = temp['participant_id'];

            setParticipantId(participantId);
        });

        return () => {
            off(pptRef, "value", listener);

        }

    }, []);

    useEffect(() => {
        if (participantId == '') return;

        const pptPath = '/participants/' + participantId;
        const pptInfoRef = ref(realtimeDb, pptPath);

        const pptListener = onValue(pptInfoRef, (res) => {
            const temp = res.val() || {};
            setParticipantInfo(temp)
        });

        return () => {
            off(pptInfoRef, "value", pptListener);

        }
    }, [participantId]);

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
                    participant_id: "",
                    status: "",
                    confirmed: "",
                    booked_today: false,
                    remind: false,
                    comments: ""
                }

                // Set the bonuses to false
                let bonuses = session['bonus'];
                if (bonuses) {
                    data['bonus'] = JSON.parse(JSON.stringify(bonuses));
                    Object.keys(bonuses).map(bonusId => {
                        data['bonus'][bonusId]['a'] = false;
                    })
                }

                updateValue(path, data);

                LogEvent({
                    pid: participantId,
                    timeslot: sessionId,
                    action: "Cancel session"
                })
            }
        })
    }



    function updateSkinColor() {
        let skintone = participantInfo['skinTone'];

        const HTMLContent = () => {
            return <select id="newSkinTone" defaultValue={skintone} >
                {
                    Object.keys(Constants['skinTone']).map((i) => {
                        return <option value={Constants['skinTone'][i]}>{Constants['skinTone'][i]}</option>
                    })
                }
            </select>
        }

        const saveSkinColor = () => {
            skintone = document.getElementById("newSkinTone").value

            updateValue("/participants/" + participantId, { skinTone: skintone });

            LogEvent({
                pid: participantId,
                action: "Participant skin tone: '" + skintone + "'"
            })
        }


        Swal.fire({
            title: "Updating Skin tone",
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                saveSkinColor();
            }
        });
    }

    function updateHairLength() {

        let hairlength = participantInfo['hairLength'];

        const HTMLContent = () => {
            return <select id="newHairLength" defaultValue={hairlength} >
                {
                    Object.keys(Constants['skinTone']).map((i) => {
                        return <option value={Constants['hairlength'][i]}>{Constants['hairlength'][i]}</option>
                    })
                }
            </select>
        }

        const saveHairLength = () => {
            hairlength = document.getElementById("newHairLength").value

            updateValue("/participants/" + participantId, { haiLength: hairlength });

            LogEvent({
                pid: participantId,
                action: "Participant skin tone: '" + hairlength + "'"
            })
        }


        Swal.fire({
            title: "Updating Hair Length",
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                saveHairLength();
            }
        });
    }




    function updateHeight() {
        let height = participantInfo['height_cm'];

        const HTMLContent = () => {
            return <input type="number" id="newHeight" defaultValue={height} />
        }

        const saveHeight = () => {
            height = document.getElementById("newHeight").value;

            const inches = height / 2.54;
            const feet = Math.floor(inches / 12);
            const remainingInches = inches % 12;



            updateValue("/participants/" + participantId, { height_cm: height });
            updateValue("/participants/" + participantId, { height_ft: parseFloat(feet) });
            updateValue("/participants/" + participantId, { height_in: parseFloat(remainingInches) });

            LogEvent({
                pid: participantId,
                action: "Participant height (cm): '" + height + "'"
            })
        }


        Swal.fire({
            title: "Updating Height (cm)",
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                saveHeight();
            }
        });
    }



    return ReactDOM.createPortal((
        <div className="modal-book-update-session-backdrop" onClick={(e) => { if (e.target.className == "modal-book-update-session-backdrop") dispatch(setShowUpdateSession("")) }}>
            <div className="modal-book-update-session-main-container">
                <div className="modal-book-update-session-header">
                    Update session
                </div>
                <div className="update-session-container">
                    <div>
                        <div className="sub-header">
                            Participant Information
                        </div>
                        <table>
                            <tbody className="participant-table">
                                <tr>
                                    <td className="participant-table-left">{"# " + participantId}</td>
                                    <td className="participant-table-right">{`${participantInfo['firstName']} ${participantInfo['lastName']}`}
                                        <a
                                            className="copy-email-link fas fa-file-export"
                                            title="Open log"
                                            onClick={() => {

                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left">E-mail</td>
                                    <td className="participant-table-right">
                                        {participantInfo['email']}
                                        <a className="copy-email-link fas fa-copy"
                                            title="Copy email"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                let email = participantInfo['email'];
                                                navigator.clipboard.writeText(email);

                                                Swal.fire({
                                                    toast: true,
                                                    icon: 'success',
                                                    title: 'Copied: ' + email,
                                                    animation: false,
                                                    position: 'bottom',
                                                    width: 'unset',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                })
                                            }} target="_blank" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left">Phone</td>
                                    <td className="participant-table-right">
                                        {participantInfo['phone']}
                                        <a className="copy-email-link fas fa-copy"
                                            title="Copy phone"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                let phone = participantInfo['phone'];
                                                navigator.clipboard.writeText(phone);

                                                Swal.fire({
                                                    toast: true,
                                                    icon: 'success',
                                                    title: 'Copied: ' + phone,
                                                    animation: false,
                                                    position: 'bottom',
                                                    width: 'unset',
                                                    showConfirmButton: false,
                                                    timer: 2000
                                                })
                                            }} target="_blank" />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left">Country of residence</td>
                                    <td className="participant-table-right">{participantInfo['country']}</td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left">City, State</td>
                                    <td className="participant-table-right">{`${participantInfo['residenceCity']}, ${Constants['usStates'][participantInfo['residenceState']]}`}</td>
                                </tr>


                                <tr>
                                    <td className="participant-table-left">Participant comment</td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left" colSpan="2">
                                        <textarea
                                            className="ppt-comment"
                                            defaultValue={participantInfo['comment']}
                                            onBlur={(e) => {
                                                const newComment = e.currentTarget.value;
                                                if (newComment != participantInfo['comment']) {
                                                    updateValue("/participants/" + participantId, { comment: newComment });
                                                    LogEvent({
                                                        participantId,
                                                        action: 1,
                                                        value: newComment,
                                                        userId: userId
                                                    });
                                                }
                                            }}
                                            placeholder="Comments about the participant..."
                                            onInput={(e) => {
                                                let height = e.currentTarget.offsetHeight;
                                                let newHeight = e.currentTarget.scrollHeight;
                                                if (newHeight > height) {
                                                    e.currentTarget.style.height = 0;
                                                    e.currentTarget.style.height = newHeight + "px";
                                                }
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left">Age range / Gender</td>
                                    <td className="participant-table-right">{participantInfo['age_range'] + " / " + participantInfo['gender']}</td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left">Height</td>
                                    <td className="participant-table-right">{`${participantInfo['heightFt']}' ${participantInfo['heightIn']}''`}
                                        <a className='copy-email-link fas fa-edit'
                                            title='Update Height'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateHeight();
                                            }} target='_blank'></a>
                                    </td>

                                </tr>
                                <tr>
                                    <td className="participant-table-left">Weight (lb) / Range</td>
                                    <td className="participant-table-right">{`${parseFloat(participantInfo['weightLbs']).toFixed(2)} / (${participantInfo['weight_range']})`}                    <a className='copy-email-link fas fa-edit'
                                        title='Update Weight'
                                        onClick={(e) => {
                                            e.preventDefault();
                                        }} target='_blank'></a>
                                    </td>
                                </tr>

                                <tr>
                                    <td className="participant-table-left">Skin tone</td>
                                    <td className="participant-table-right">
                                        {participantInfo['skinTone']}
                                        <a className='copy-email-link fas fa-edit'
                                            title='Update Skin tone'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateSkinColor();
                                            }} target='_blank'></a>
                                    </td>

                                </tr>
                                <tr>
                                    <td className="participant-table-left">Hair Length</td>
                                    <td className="participant-table-right">
                                        {participantInfo['hairLength']}
                                        <a className='copy-email-link fas fa-edit'
                                            title='Update Height'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateHairLength();
                                            }} target='_blank'></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left">Date of birth</td>
                                    <td className="participant-table-right">
                                        {participantInfo['dob']}
                                    </td>
                                </tr>
                                <tr>
                                    <td className="participant-table-left">&nbsp;</td>
                                </tr>

                                <tr>
                                    <td className="participant-table-left">&nbsp;</td>
                                </tr>

                                {
                                    session['status'] === "Completed" && <tr className='client-info-container'>
                                        <td className="participant-table-center" colSpan="2">Client Info: {participantId}</td>

                                    </tr>
                                }

                                <tr>
                                    <td className="participant-table-left">&nbsp;</td>
                                </tr>

                                <tr>
                                    <td className="participant-table-left">&nbsp;</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>

                </div>

            </div>
        </div>
    ), document.body);
}
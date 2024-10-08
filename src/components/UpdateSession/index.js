import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../firebase/config';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { setShowUpdateSession, setShowDocs } from '../../Redux/Features';
import { renderToString } from 'react-dom/server';

import './index.css';
import Constants from '../Constants';
import LogEvent from '../CommonFunctions/LogEvent';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import GetSkinTone from '../CommonFunctions/GetSkinTone';
import GetBMIRange from '../CommonFunctions/GetBMIRange';

export default ({ showUpdateSession }) => {
    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userId = userInfo['userId'];

    const updateValue = (path, value) => {
        realtimeDb.ref(path).update(value);
    }

    const sessionId = showUpdateSession;
    const [session, setSession] = useState({});
    const [participantInfo, setParticipantInfo] = useState({});
    const [tattoos, setTattoos] = useState([]);
    const [piercings, setPiercings] = useState([]);
    const dispatch = useDispatch();

    const participantId = session['participantId'];

    useEffect(() => {
        const listener = realtimeDb.ref('/timeslots/' + showUpdateSession).on('value', snapshot => setSession(snapshot.val() || {}));
        return () => realtimeDb.ref('/timeslots/' + showUpdateSession).off('value', listener);
    }, []);

    useEffect(() => {
        const participantId = session['participantId'];
        if (!participantId) return;

        const listener = realtimeDb.ref('/participants/' + participantId).on('value', snapshot => setParticipantInfo(snapshot.val() || {}));
        return () => realtimeDb.ref('/participants/' + participantId).off('value', listener);
    }, [session['participantId']]);

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) dispatch(setShowUpdateSession("")) };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    useEffect(() => {
        if (Object.keys(participantInfo).length === 0) return;
        let tempArray = participantInfo['tattoos'].toString().split(';').map(eth => {
            return Constants['tattoos'][eth]
        })

        let tempPiercings = participantInfo['piercings'].toString().split(';').map(eth => {
            return Constants['piercings'][eth]
        })

        tempArray = tempArray.join(";");
        tempPiercings = tempPiercings.join(";")
        setTattoos(tempArray);
        setPiercings(tempPiercings);

    }, [participantInfo])

    function cancelSession(sessionId) {
        Swal.fire({
            title: "Are you sure?",
            showCancelButton: true,
            html: 'By cancelling the session, it will be deleted from the timetable!',
            confirmButtonText: 'Yes, cancel!'
        }).then((result) => {
            if (result.isConfirmed) {
                const path = "/timeslots/" + sessionId;
                let data = {
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
                    participantId: participantId,
                    value: 'Cancelled session ' + sessionId,
                    action: 9
                })

                dispatch(setShowUpdateSession(""));
            }
        })
    }

    function updateEthnicity() {
        const ethnicities = participantInfo['ethnicities'].toString().split(';');
        const HTMLContent = () => {
            return <>
                {Object.keys(Constants['ethnicitiesDisplay']).sort((a, b) => Constants['ethnicitiesDisplay'][a].toString().localeCompare(Constants['ethnicitiesDisplay'][b].toString())).map(ethnicityId => {
                    const ethnicity = Constants['ethnicitiesDisplay'][ethnicityId];
                    return <div key={"popup-filter-eth" + ethnicityId} className="update-ethnicity-row">
                        <input id={"popup-filter-" + ethnicity} name={ethnicity} type="checkbox" checked={ethnicities.includes(ethnicityId) ? true : false} />
                        <label htmlFor={"popup-filter-" + ethnicity}>{ethnicity} <strong>{Constants.getKeyByValue(Constants['ethDbMap2'], Constants['ethDbMap'][Constants['ethnicities'][Constants.getKeyByValue(Constants['ethnicitiesDisplay'], ethnicity)]])}</strong>
                        </label>
                    </div>
                })}
            </>
        }

        Swal.fire({
            title: "Updating ethnicities",
            width: 600,
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                const checkboxes = document.querySelectorAll("[id^='popup-filter-']");
                let list = [];
                checkboxes.forEach(x => {
                    if (x.checked) list.push(Constants.getKeyByValue(Constants['ethnicitiesDisplay'], x.name));
                });

                if (list.length > 0) {
                    updateValue("/participants/" + participantId, { ethnicities: list.join(';') });

                    LogEvent({
                        participantId: participantId,
                        action: 13,
                        value: "Updated Ethnicities"
                    })
                }

            }
        })
    }

    function updateTattoos() {
        const HTMLContent = () => {
            return <>
                {Object.values(Constants['tattoos']).sort().map((val, i) => {
                    return <div key={"popup-filter-eth" + i} className="update-ethnicity-row">
                        <input id={"popup-filter-" + val} name={val} type="checkbox" checked={tattoos.includes(val) ? true : false} />
                        <label htmlFor={"popup-filter-" + val}>{val}
                        </label>
                    </div>
                })}
            </>
        }

        Swal.fire({
            title: "Updating Tattoos List",
            width: 600,
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                let checkboxes = document.querySelectorAll("[id^='popup-filter-']");
                let list = "";
                checkboxes.forEach(x => list += (x.checked ? Constants.getKeyByValue(Constants['tattoos'], x.name) + ";" : ""));

                list = list.trim();
                list = list.substring(0, list.length - 1);

                if (list) {
                    updateValue("/participants/" + participantId, { tattoos: list });

                    LogEvent({
                        participantId: participantId,
                        action: 13,
                        value: "Updated Tattoos"
                    })
                }

            }
        })
    }

    function updatePiercings() {
        const HTMLContent = () => {
            return <>
                {Object.values(Constants['piercings']).sort().map((val, i) => {
                    return <div key={"popup-filter-eth" + i} className="update-ethnicity-row">
                        <input id={"popup-filter-" + val} name={val} type="checkbox" checked={piercings.includes(val) ? true : false} />
                        <label htmlFor={"popup-filter-" + val}>{val}
                        </label>
                    </div>
                })}
            </>
        }

        Swal.fire({
            title: "Updating Piercings List",
            width: 600,
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                let checkboxes = document.querySelectorAll("[id^='popup-filter-']");
                let list = "";
                checkboxes.forEach(x => list += (x.checked ? Constants.getKeyByValue(Constants['piercings'], x.name) + ";" : ""));

                list = list.trim();
                list = list.substring(0, list.length - 1);

                if (list) {
                    updateValue("/participants/" + participantId, { piercings: list });

                    LogEvent({
                        participantId: participantId,
                        action: 13,
                        value: "Updated Piercings"
                    })
                }

            }
        })
    }


    function updateSkinColor() {
        let skintone = participantInfo['skintone'];

        const HTMLContent = () => {
            return <select id="newSkinTone" defaultValue={skintone} >
                {
                    Array.from({ length: 12 }, (v, i) => i + 1).map((i) => {
                        return <option value={i}>{i}</option>
                    })
                }
            </select>
        }

        Swal.fire({
            title: "Updating Skin tone",
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                skintone = document.getElementById("newSkinTone").value;
                updateValue("/participants/" + participantId, { skintone: parseInt(skintone) });

                LogEvent({
                    participantId: participantId,
                    value: skintone,
                    action: 13
                })
            }
        });
    }

    function updateHeight() {
        let heightFt = participantInfo['heightFt'];
        let heightIn = participantInfo['heightIn'];

        const HTMLContent = () => {
            return <div style={{ display: "flex" }}>
                <label htmlFor='newHeightFt'>Feet: </label>
                <input type="number" id="newHeightFt" style={{ marginRight: "1em", width: "50px" }} defaultValue={heightFt} />
                <label htmlFor='newHeightIn'>Inches: </label>
                <input type="number" id="newHeightIn" style={{ marginRight: "1em", width: "50px" }} defaultValue={heightIn} />
            </div>
        }

        Swal.fire({
            title: "Updating Height",
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                heightFt = document.getElementById("newHeightFt").value;
                heightIn = document.getElementById("newHeightIn").value;

                updateValue("/participants/" + participantId, { heightFt: parseFloat(heightFt) });
                updateValue("/participants/" + participantId, { heightIn: parseFloat(heightIn) });

                LogEvent({
                    participantId: participantId,
                    value: heightFt + "' " + heightIn + "''",
                    action: 13
                })
            }
        });
    }

    function updateWeight() {
        let weight = participantInfo['weightLbs'];

        const HTMLContent = () => {
            return <input type="number" id="newWeight" defaultValue={weight} />
        }

        Swal.fire({
            title: "Updating Weight (lb)",
            confirmButtonText: "Save",
            showCancelButton: true,
            html: renderToString(<HTMLContent />)
        }).then((result) => {
            if (result.isConfirmed) {
                weight = document.getElementById("newWeight").value;


                updateValue("/participants/" + participantId, { weightLbs: weight });
                LogEvent({
                    participantId: participantId,
                    value: weight,
                    action: 13
                })
            }
        });
    }


    function updateAppleId() {
        let appleId = participantInfo['appleId'];

        Swal.fire({
            title: 'Apple ID',
            showCancelButton: true,
            confirmButtonText: 'Save',
            html: 'Format: "TL_xxxxxx"<br/>E.g.: "TL_12ne31"<br/><br/><input id="appleIdInputBox" value="' + (appleId || "") + '" style="padding: .2em; font-size: 1em; font-weight: bold;"/> ',
            didOpen: () => {
                const input = document.getElementById('appleIdInputBox');
                input.focus();
                input.select();

                input.addEventListener("keypress", function (event) {
                    if (event.key === "Enter") Swal.clickConfirm();
                });
            },
            preConfirm: () => {
                const input = document.getElementById('appleIdInputBox');
                const newAppleId = input ? input.value.toString().trim() : '';
                const rx = new RegExp(/^TL_[a-zA-Z0-9_.-]{6}$/);
                if (!newAppleId.match(rx) && newAppleId !== '') {
                    Swal.showValidationMessage('The expected format is: "TL_" + 6 numbers and/ or letters.');
                }
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const input = document.getElementById('appleIdInputBox');
                const newAppleId = input ? input.value.toString().trim() : '';
                const rx = new RegExp(/^TL_[a-zA-Z0-9_.-]{6}$/);
                if (newAppleId === '') {
                    realtimeDb.ref('/participants/' + participantId + '/appleId').remove();
                } else if (newAppleId.match(rx)) {
                    const newId = "TL_" + newAppleId.substring(3).toLowerCase();
                    realtimeDb.ref('/participants/' + participantId + '/appleId').set(newId);
                } else {
                    Swal.fire({
                        title: 'The ID is not saved!',
                        html: '<span>The expected format is:</span><br/> <span>"TL_" + 6 numbers and/ or letters.</span>'
                    })
                }
            }
        })
    }

    if (Object.keys(participantInfo).length === 0) return null;

    let ethnicityGroups = participantInfo['ethnicities'].toString().split(';').map(eth => {
        return Object.keys(Constants['ethnicityGroups']).find(group => Constants['ethnicityGroups'][group].includes(parseInt(eth)));
    });
    const ethnicityGroups2 = [...new Set(ethnicityGroups)].sort((a, b) => a > b ? 1 : -1).join(', ');

    return ReactDOM.createPortal((
        <div id="updateSession" onClick={(e) => { if (e.target.id === "updateSession") dispatch(setShowUpdateSession("")) }}>
            <div id="mainContainer">
                <div id="header">Update session</div>
                <div id="content">
                    <div>
                        <div className="sub-header">Participant Information</div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>{"# " + participantId}</td>
                                    <td>{participantInfo['firstName'] + ' ' + participantInfo['lastName']}</td>
                                </tr>
                                <tr>
                                    <td>Identification</td>
                                    <td>
                                        <button id="docButton" onClick={() => dispatch(setShowDocs(participantId))}>
                                            Open
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>E-mail</td>
                                    <td>
                                        {participantInfo['email']}
                                        <a className="fas fa-copy"
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
                                    <td>Phone</td>
                                    <td>
                                        {participantInfo['phone']}
                                        <a className="fas fa-copy"
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
                                    <td>Country of residence</td>
                                    <td>{participantInfo['country']}</td>
                                </tr>
                                <tr>
                                    <td>City, State</td>
                                    <td>{participantInfo['residenceCity']}, {Constants['usStates'][participantInfo['residenceState']]}</td>
                                </tr>
                                <tr>
                                    <td>Date of birth</td>
                                    <td>
                                        {participantInfo['dob']}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Age range / Gender</td>
                                    <td>{GetAgeRange(participantInfo)['ageRange'] + " / " + Constants['genders'][participantInfo['gender']]}</td>
                                </tr>
                                <tr>
                                    <td>Ethnicities</td>
                                    <td>
                                        {ethnicityGroups2}
                                        {/* {participantInfo['status'] !== 3 && */}
                                        <a className='fas fa-edit'
                                            title='Update ethnicities'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateEthnicity();
                                            }} target='_blank' />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Tattoos</td>
                                    <td>
                                        {tattoos.toString().split(";").join(", ")}
                                        {participantInfo['status'] != 3 && <a className='fas fa-edit'
                                            title='Update tattoos list'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateTattoos();
                                            }} target='_blank' />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Piercings</td>
                                    <td>
                                        {piercings.toString().split(";").join(", ")}
                                        {participantInfo['status'] != 3 && <a className='fas fa-edit'
                                            title='Update tattoos list'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updatePiercings();
                                            }} target='_blank' />
                                        }
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hair color</td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                updateValue("/participants/" + participantId, { hairColor: parseInt(e.currentTarget.value) });
                                                LogEvent({ participantId, action: 13, value: parseInt(e.currentTarget.value), userId: userId });
                                            }}
                                        >
                                            {Object.keys(Constants['hairColor']).map(hairColor => {
                                                const status = Constants['hairColor'][hairColor];
                                                return <option key={"participant-status-" + hairColor} value={hairColor} selected={hairColor == participantInfo['hairColor']}>{status}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hair type</td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                updateValue("/participants/" + participantId, { hairType: parseInt(e.currentTarget.value) });
                                                LogEvent({ participantId, action: 13, value: parseInt(e.currentTarget.value), userId: userId });
                                            }}
                                        >
                                            {Object.keys(Constants['hairType']).map(hairType => {
                                                const status = Constants['hairType'][hairType];
                                                return <option key={"participant-status-" + hairType} value={hairType} selected={hairType == participantInfo['hairType']}>{status}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Hair length</td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                updateValue("/participants/" + participantId, { hairLength: parseInt(e.currentTarget.value) });
                                                LogEvent({ participantId, action: 13, value: parseInt(e.currentTarget.value), userId: userId });
                                            }}
                                        >
                                            {Object.keys(Constants['hairLength']).map(hairLength => {
                                                const status = Constants['hairLength'][hairLength];
                                                return <option key={"participant-status-" + hairLength} value={hairLength} selected={hairLength == participantInfo['hairLength']}>{status}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Facial hair</td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                updateValue("/participants/" + participantId, { facialHair: parseInt(e.currentTarget.value) });
                                                LogEvent({ participantId, action: 13, value: parseInt(e.currentTarget.value), userId: userId });
                                            }}
                                        >
                                            {Object.keys(Constants['facialHair']).map(facialHair => {
                                                const status = Constants['facialHair'][facialHair];
                                                return <option key={"participant-status-" + facialHair} value={facialHair} selected={facialHair == participantInfo['facialHair']}>{status}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Facial makeup</td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                updateValue("/timeslots/" + sessionId, { makeup: parseInt(e.currentTarget.value) });
                                                LogEvent({
                                                    participantId: participantId,
                                                    value: Constants['makeup'][parseInt(e.target.value)],
                                                    action: 13
                                                })
                                            }}
                                        >
                                            {Object.keys(Constants['makeup']).map((s, i) => {
                                                const status = Constants['makeup'][s];
                                                return <option key={"data-session-status" + s} value={s} selected={s == session['makeup']}>{status}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Skin tone / Range</td>
                                    <td>
                                        {participantInfo['skintone']} / {GetSkinTone(participantInfo)['skinRange']}
                                        <a className='fas fa-edit'
                                            title='Update skin tone'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateSkinColor();
                                            }} target='_blank' />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Height</td>
                                    <td>{participantInfo['heightFt']}' {participantInfo['heightIn']}''
                                        <a className='fas fa-edit'
                                            title='Update Height'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateHeight();
                                            }} target='_blank'></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Weight (lb)</td>
                                    <td>{parseFloat(participantInfo['weightLbs']).toFixed(2)}
                                        <a className='fas fa-edit'
                                            title='Update Weight'
                                            onClick={(e) => {
                                                e.preventDefault();
                                                updateWeight();
                                            }} target='_blank'></a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>BMI (Range)</td>
                                    <td>
                                        {Object.values(GetBMIRange(participantInfo)).join(" (") + ")"}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Participant comments</td>
                                </tr>
                                <tr>
                                    <td colSpan="2">
                                        <textarea
                                            id="participantComment"
                                            defaultValue={participantInfo['comment']}
                                            onBlur={(e) => {
                                                const newComment = (e.currentTarget.value || '').toString().trim();
                                                if (newComment === "" && participantInfo['comment'] !== "") {
                                                    realtimeDb.ref('/participants/' + participantId + '/comment').remove();
                                                    LogEvent({
                                                        participantId: parseInt(participantId),
                                                        action: 1,
                                                        value: '',
                                                        userId: userId
                                                    });
                                                } else if (newComment !== participantInfo['comment']) {
                                                    realtimeDb.ref('/participants/' + participantId).update({ comment: newComment });
                                                    LogEvent({
                                                        participantId: parseInt(participantId),
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
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <div className="sub-header">Session Information</div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Time</td>
                                    <td>
                                        {TimeSlotFormat(sessionId)}
                                    </td>
                                </tr>
                                <tr>
                                    <td>Session status</td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                realtimeDb.ref('/timeslots/' + sessionId).update({ status: parseInt(e.currentTarget.value), failedComp: null, noEar: null });
                                                LogEvent({
                                                    participantId: participantId,
                                                    value: 'Session ' + sessionId + ' changed to ' + Constants['sessionStatuses'][parseInt(e.target.value)],
                                                    action: 4
                                                })
                                            }}
                                        >
                                            {Object.keys(Constants['sessionStatuses']).map((s, i) => {
                                                const status = Constants['sessionStatuses'][s];
                                                return <option key={"data-session-status" + s} value={s} selected={s == session['status']}>{status}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Participant status</td>
                                    <td>
                                        <select
                                            onChange={(e) => {
                                                updateValue("/participants/" + participantId, { status: parseInt(e.currentTarget.value) });
                                                if (e.currentTarget.value == "Duplicate" && participantInfo['not_duplicate']) {
                                                    updateValue("/participants/" + participantId, { not_duplicate: false });
                                                    LogEvent({
                                                        pid: participantId,
                                                        action: "Not duplicate: 'No'"
                                                    })
                                                }
                                                LogEvent({ participantId, action: 0, value: parseInt(e.currentTarget.value), userId: userId });
                                            }}
                                        >
                                            {Object.keys(Constants['participantStatuses']).map(statusId => {
                                                const status = Constants['participantStatuses'][statusId];
                                                return <option key={"participant-status-" + statusId} value={statusId} selected={statusId == participantInfo['status']}>{status}</option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                {session['status'] === 6 && <tr>
                                    <td>Compensation for failed</td>
                                    <td className="participant-table-right bonus-container" colSpan="2">

                                        <select className='session-data-selector'
                                            onChange={(e) => {
                                                const bonusToSave = parseInt(e.currentTarget.value);
                                                if (bonusToSave === 0) realtimeDb.ref("/timeslots/" + sessionId + "/failedComp").remove();
                                                else realtimeDb.ref("/timeslots/" + sessionId + "/failedComp").set(bonusToSave);
                                            }}
                                        >
                                            {Constants['failedCompensationList'].map(bonusAmount => {
                                                return <option key={'bonus-' + bonusAmount} value={bonusAmount} selected={bonusAmount === (session['failedComp'] || 0)}>
                                                    ${parseFloat(bonusAmount)}
                                                </option>
                                            })}
                                        </select>
                                    </td>
                                </tr>}
                                <tr>
                                    <td>Bonus</td>
                                    <td className="participant-table-right bonus-container" colSpan="2">

                                        <select className='session-data-selector'
                                            onChange={(e) => {
                                                const bonusToSave = parseInt(e.currentTarget.value);
                                                if (bonusToSave === 0) realtimeDb.ref("/timeslots/" + sessionId + "/bonus").remove();
                                                else realtimeDb.ref("/timeslots/" + sessionId + "/bonus").set(bonusToSave);
                                                LogEvent({
                                                    participantId: participantId,
                                                    value: bonusToSave === 0 ? 'Removal of bonus for ' + sessionId : 'Set of bonus of $' + bonusToSave + ' for ' + sessionId,
                                                    action: bonusToSave === 0 ? 12 : 11
                                                })
                                            }}
                                        >
                                            {Constants['bonusList'].map(bonusAmount => {
                                                return <option key={'bonus-' + bonusAmount} value={bonusAmount} selected={bonusAmount === (session['bonus'] || 0)}>
                                                    ${parseFloat(bonusAmount)}
                                                </option>
                                            })}
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Repeat</td>
                                    <td>
                                        <input
                                            type='checkbox'
                                            value={true}
                                            checked={participantInfo['furtherSessions'] === true}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    realtimeDb.ref('/participants/' + participantId + '/furtherSessions').set(true);
                                                    LogEvent({
                                                        participantId,
                                                        action: 13,
                                                        value: 'Further sessions: true',
                                                        userId: userId
                                                    });
                                                } else {
                                                    realtimeDb.ref('/participants/' + participantId + '/furtherSessions').remove();
                                                    LogEvent({
                                                        participantId,
                                                        action: 13,
                                                        value: 'Further sessions: false',
                                                        userId: userId
                                                    });
                                                }
                                            }}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>No ear</td>
                                    <td>
                                        <input
                                            type='checkbox'
                                            value={true}
                                            checked={session['noEar'] === true}
                                            disabled={session['status'] !== 2}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    realtimeDb.ref('/timeslots/' + sessionId + '/noEar').set(true);
                                                    LogEvent({
                                                        participantId,
                                                        action: 14,
                                                        value: true,
                                                        userId: userId
                                                    });
                                                } else {
                                                    realtimeDb.ref('/timeslots/' + sessionId + '/noEar').remove();
                                                    LogEvent({
                                                        participantId,
                                                        action: 14,
                                                        value: false,
                                                        userId: userId
                                                    });
                                                }
                                            }}
                                        />
                                    </td>
                                </tr>

                                <tr>
                                    <td>Apple ID</td>
                                    <td>
                                        <button id="appleIdButton" onClick={() => updateAppleId()}>{participantInfo['appleId'] || "Missing ID!"}</button>
                                    </td>
                                </tr>

                                <tr><td>Session comments</td></tr>
                                <tr>
                                    <td colSpan="2">
                                        <textarea
                                            id="sessionComment"
                                            defaultValue={session['comments']}
                                            onBlur={(e) => {
                                                const newComment = (e.currentTarget.value || '').toString().trim();
                                                if (newComment === "" && session['comments'] !== "") {
                                                    realtimeDb.ref('/timeslots/' + sessionId + '/comments').remove();
                                                    LogEvent({
                                                        participantId: parseInt(participantId),
                                                        value: '',
                                                        action: 5
                                                    })
                                                } else if (newComment !== session['comments']) {
                                                    realtimeDb.ref('/timeslots/' + sessionId).update({ comments: newComment });
                                                    LogEvent({
                                                        participantId: parseInt(participantId),
                                                        value: 'Comments on Session Id ' + sessionId,
                                                        action: 5
                                                    })
                                                }
                                            }}
                                            placeholder="Comments about the session..."
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
                                    <td colSpan="2" className='center-tag'>
                                        <button id="cancelSessionButton" onClick={() => cancelSession(sessionId)}>Cancel session</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    ), document.body);
}
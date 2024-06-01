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

import './UpdateSession.css';
import Constants from '../Constants';
import LogEvent from '../CommonFunctions/LogEvent';

export default ({ showUpdateSession, showLog, setShowLog }) => {
    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userId = userInfo['userId'];

    const sessionId = showUpdateSession;
    const [session, setSession] = useState({});
    const [participantId, setParticipantId] = useState('');
    const [participantInfo, setParticipantInfo] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {

        const path = '/timeslots/' + participantId;
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {
            const temp = res.val() || {};
            console.log(temp)
            setSession(temp);
            const participantId = temp['participant_id'];
            setParticipantId(participantId);
        });

        return () => {
            off(pptRef, "value", listener);

        }

    }, []);

    // useEffect(() => {
    //     if (!participantId) return;

    //     realtimeDb.ref('/participants/' + participantId).on('value', res => {
    //         const temp = res.val() || {};
    //         setParticipantInfo(temp);
    //     });

    //     return () => realtimeDb.ref('/participants/' + participantId).off();
    // }, [participantId]);







    return ReactDOM.createPortal((
        <div className="modal-book-update-session-backdrop" onClick={(e) => { if (e.target.className == "modal-book-update-session-backdrop") dispatch(setShowUpdateSession("")) }}>
        </div>
    ), document.body);
}
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';



function Participants({ }) {

    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userRole = userInfo['role'];

    const [shownParticipants, setShownParticipants] = useState([]);
    const [participants, setParticipants] = useState({});
    const [advancedMode, setAdvancedMode] = useState(false);


    useEffect(() => {
        if (!['admin'].includes(userRole)) return null;

        const path = '/participants';

        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {

            setParticipants(res.val() || {});
        });

        return () => {
            off(pptRef, "value", listener);

        }

    }, []);



    return (
        <>
            Hello
        </>
    )
};

export default Participants;


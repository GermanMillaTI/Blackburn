import { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';

import './index.css';
import Constants from '../Constants';

function BookingPlatform({ }) {
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const params = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const participantId = params['participantId'];

    useEffect(() => {
        const path = '/participants/' + participantId + '/';
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, res => {
            const snapshot = res.val() || {};
            setNotFound(Object.keys(snapshot).length === 0 || snapshot['email'] !== searchParams.get('email'));
            setLoading(false);
        })

        return () => off(pptRef, "value", listener);
    }, [participantId, searchParams])


    return <div id="bookingPlatform">
        {participantId}

        <button onClick={() => {

        }}>Test</button>
    </div>
};

export default BookingPlatform;

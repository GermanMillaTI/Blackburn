import { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { realtimeDb } from '../../firebase/config';

import './index.css';
import Constants from '../Constants';
import TableOfSessions from './TableOfSessions';
import Header from './Header';
import Footer from './Footer';

function BookingPlatform({ }) {
    const [loading, setLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);
    const [participantInfo, setParticipantInfo] = useState({});

    const params = useParams();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const participantId = params['participantId'];

    useEffect(() => {
        if (!participantId) return;

        const listener = realtimeDb.ref("/participants/" + participantId).on('value', res => {
            const snapshot = res.val() || {};
            setNotFound(Object.keys(snapshot).length === 0 || snapshot['email'] !== searchParams.get('email'));
            setLoading(false);
            setParticipantInfo(snapshot);
        })

        return () => realtimeDb.ref("/participants/" + participantId).off('value', listener);
    }, [participantId, searchParams])

    if (Object.keys(participantInfo).length === 0) return;

    return <div id="bookingPlatform">
        <div id="mainContainer">
            <div id="background" />
            <div id="background2" />

            <Header participantInfo={participantInfo} />

            <TableOfSessions participantId={participantId} participantInfo={participantInfo} />

            <Footer />
        </div>
    </div>
};

export default BookingPlatform;

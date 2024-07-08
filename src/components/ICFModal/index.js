import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';

import './index.css';
import Constants from '../Constants';

function ICFModal({ setShowICFs, participantId }) {
    const [participant, setParticipant] = useState({})

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) setShowICFs("") };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    useEffect(() => {
        const path = '/participants/' + participantId + '/icfs';
        const pptRef = ref(realtimeDb, path);
        const listener = onValue(pptRef, (res) => setParticipant(res.val() || {}));
        return () => off(pptRef, "value", listener);
    }, []);

    return ReactDOM.createPortal((
        <div id="checkIcfModal" onClick={(e) => { if (e.target.id === "checkIcfModal") setShowICFs("") }}>
            <div id="checkIcfMainContainer">
                <div id="checkIcfHeader">
                    ICF Signatures of {participantId} (Signed on {new Date(participant['icfDate']).toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" })})
                </div>
                <div id="checkIcfContent">
                    {Object.keys(participant).filter(el => el !== "icfDate").map(upload => {
                        const docUrl = `https://firebasestorage.googleapis.com/v0/b/blackburn-la.appspot.com/o/participants%2F${participantId}%2F${upload}%2F${participantId}_${upload}.png?${participant[upload]}`;
                        return <div>
                            <div className="document-title">{Constants['icfNames'][upload]}</div>
                            <img className="document-preview" src={docUrl} title='document' alt='preview' />
                        </div>
                    })}
                </div>
            </div>
        </div>
    ), document.body)
};

export default ICFModal;
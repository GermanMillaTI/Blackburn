import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';
import { useSelector, useDispatch } from 'react-redux';
import { setShowDocs } from '../../Redux/Features';

import './index.css';

function CheckDocuments() {
    const [participant, setParticipant] = useState({});

    const participantId = useSelector((state) => state.userInfo.showDocs);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) dispatch(setShowDocs("")) };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    useEffect(() => {
        const path = '/participants/' + participantId + '/docs';
        const pptRef = ref(realtimeDb, path);
        const listener = onValue(pptRef, (res) => setParticipant(res.val() || {}));
        return () => off(pptRef, "value", listener);
    }, []);

    return ReactDOM.createPortal((
        <div id="checkDocumentsModal" onClick={(e) => { if (e.target.id === "checkDocumentsModal") dispatch(setShowDocs("")) }}>
            <div id="checkDocumentsMainContainer">
                <div id="checkDocumentsHeader">Document of {participantId}</div>
                <div id="checkDocumentsMainContent">
                    {Object.values(participant).map(upload => {
                        return Object.keys(upload).map(docKey => {
                            const docUrl = `https://firebasestorage.googleapis.com/v0/b/blackburn-la.appspot.com/o/participants%2F${participantId}%2Fidentification%2F${upload[docKey]}`

                            if (docUrl.includes(".jpg") || docUrl.includes(".jpeg") || docUrl.includes(".JPG") || docUrl.includes(".png") || docUrl.includes(".PNG")) {
                                return <TransformWrapper defaultScale={1}>
                                    <TransformComponent style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}>
                                        <img className="document-preview" style={{ maxWidth: "95%", height: "fit-content", marginRight: "auto", marginLeft: "auto" }} src={docUrl} title='document' alt='preview' />
                                    </TransformComponent>
                                </TransformWrapper>
                            } else {
                                return <iframe className='document-preview' src={docUrl} />
                            }
                        })
                    })}
                </div>
            </div>
        </div>
    ), document.body)
};

export default CheckDocuments;
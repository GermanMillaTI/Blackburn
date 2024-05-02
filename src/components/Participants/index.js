import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';
import Constants from '../Constants';
import ParticipantFilter from './ParticipantFilter';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import ParticipantCard from './ParticipantCard';


const defaultFilterStats = {
    genders: Object.assign({}, ...Object.values(Constants['genders']).map(k => ({ [k]: 0 }))),
    ageRanges: Object.assign({}, ...Constants['ageRanges'].map(k => ({ [k]: 0 }))),
    statuses: Object.assign({}, ...Object.values(Constants['participantStatuses']).map(k => ({ [k || 'Blank']: 0 }))),

};


function Participants({ }) {

    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userRole = userInfo['role'];

    const [shownParticipants, setShownParticipants] = useState([]);
    const [participants, setParticipants] = useState({});


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

    // Reset filterstats
    let filterStats = JSON.parse(JSON.stringify(defaultFilterStats));

    return <div id="participants">
        <ParticipantFilter participants={participants} setShownParticipants={setShownParticipants} filterStats={filterStats} />

        <span className="filter-note">
            Filtered participants: {shownParticipants.length}
            {shownParticipants.length > 100 && (
                <span> (The list is cropped at 100)</span>
            )}
        </span>


        <div id="participantTable">
            {shownParticipants.map((participantId, index) => {
                const participantInfo = participants[participantId];
                const gender = Constants['genders'][participantInfo['gender']];
                const ageRange = GetAgeRange(participantInfo)['ageRange'];
                const status = participantInfo['status'] ? Constants['participantStatuses'][participantInfo['status']] : 'Blank';


                filterStats['genders'][gender]++;
                filterStats['ageRanges'][ageRange]++;
                filterStats['statuses'][status]++;

                if (index >= 100) return null;

                return <ParticipantCard key={"participant-card-" + participantId} participantId={participantId} participants={participants} />
            })
            }
        </div>
    </div>
};

export default Participants;


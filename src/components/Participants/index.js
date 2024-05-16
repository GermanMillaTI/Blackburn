import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';
import Constants from '../Constants';
import ParticipantFilter from './ParticipantFilter';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import GetSkinTone from '../CommonFunctions/GetSkinTone';
import ParticipantCard from './ParticipantCard';

const defaultFilterStats = {
    genders: Object.assign({}, ...Object.values(Constants['genders']).map(k => ({ [k]: 0 }))),
    ageRanges: Object.assign({}, ...Constants['ageRanges'].map(k => ({ [k]: 0 }))),
    statuses: Object.assign({}, ...Object.values(Constants['participantStatuses']).map(k => ({ [k || 'Blank']: 0 }))),
    skintones: Object.assign({}, ...Constants['skintones'].map(k => ({ [k]: 0 }))),
    ethnicityGroups: Object.assign({}, ...Object.keys(Constants['ethnicityGroups']).map(k => ({ [k]: 0 }))),
    multipleEthnicities: Object.assign({}, ...['Yes', 'No'].map(k => ({ [k]: 0 }))),
    hairLengths: Object.assign({}, ...Object.values(Constants['hairLength']).map(k => ({ [k]: 0 }))),
    hairTypes: Object.assign({}, ...Object.values(Constants['hairType']).map(k => ({ [k]: 0 }))),


};




function Participants({ }) {

    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userRole = userInfo['role'];

    const [shownParticipants, setShownParticipants] = useState([]);
    const [participants, setParticipants] = useState({});

    useEffect(() => {
        document.getElementById('navbarTitle').innerText = `Filtered participants: ${shownParticipants.length} ${shownParticipants.length > 100 ? "(the list is cropped at 100)" : ""}`;
    }, [shownParticipants]);


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
        <div id="participantTable">
            {shownParticipants.map((participantId, index) => {
                const participantInfo = participants[participantId];

                if (!participantInfo) return null; //prevents attempting to render after deleting ppts

                const gender = Constants['genders'][participantInfo['gender']];
                const ageRange = GetAgeRange(participantInfo)['ageRange'];
                const status = participantInfo['status'] ? Constants['participantStatuses'][participantInfo['status']] : 'Blank';
                const skintone = GetSkinTone(participantInfo)['skinRange'];
                const hairLength = Constants['hairLength'][participantInfo['hairLength']];
                const hairType = Constants['hairType'][participantInfo['hairType']];
                const ethnicities = participantInfo['ethnicities']
                let ethnicityGroups = ethnicities.toString().split(';').map(eth => {
                    return Object.keys(Constants['ethnicityGroups']).find(group => Constants['ethnicityGroups'][group].includes(parseInt(eth)));
                });
                const multipleEthnicities = [...new Set(ethnicityGroups)].length > 1 ? 'Yes' : 'No';

                ethnicityGroups.forEach(ethnicityGroup => filterStats['ethnicityGroups'][ethnicityGroup]++);
                filterStats['genders'][gender]++;
                filterStats['ageRanges'][ageRange]++;
                filterStats['statuses'][status]++;
                filterStats['skintones'][skintone]++;
                filterStats['multipleEthnicities'][multipleEthnicities]++;
                filterStats['hairLengths'][hairLength]++;
                filterStats['hairTypes'][hairType]++;

                if (index >= 100) return null;

                return <ParticipantCard key={"participant-card-" + participantId} participantId={participantId} participants={participants} />
            })
            }
        </div>
    </div>
};

export default Participants;


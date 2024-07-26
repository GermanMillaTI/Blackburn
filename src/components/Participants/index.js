import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { realtimeDb } from '../../firebase/config';
import Constants from '../Constants';
import ParticipantFilter from './ParticipantFilter';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import GetSkinTone from '../CommonFunctions/GetSkinTone';
import ParticipantCard from './ParticipantCard';
import GetBMIRange from '../CommonFunctions/GetBMIRange';

import './index.css';

const defaultFilterStats = {
    genders: Object.assign({}, ...Object.values(Constants['genders']).map(k => ({ [k]: 0 }))),
    ageRanges: Object.assign({}, ...Constants['ageRanges'].map(k => ({ [k]: 0 }))),
    statuses: Object.assign({}, ...Object.values(Constants['participantStatuses']).map(k => ({ [k || 'Blank']: 0 }))),
    skintones: Object.assign({}, ...Constants['skintones'].map(k => ({ [k]: 0 }))),
    ethnicityGroups: Object.assign({}, ...Object.keys(Constants['ethnicityGroups']).map(k => ({ [k]: 0 }))),
    multipleEthnicities: Object.assign({}, ...['Yes', 'No'].map(k => ({ [k]: 0 }))),
    facialHairs: Object.assign({}, ...Object.values(Constants['facialHair']).map(k => ({ [k]: 0 }))),
    hairLengths: Object.assign({}, ...Object.values(Constants['hairLength']).map(k => ({ [k]: 0 }))),
    hairTypes: Object.assign({}, ...Object.values(Constants['hairType']).map(k => ({ [k]: 0 }))),
    hairColors: Object.assign({}, ...Object.values(Constants['hairColor']).map(k => ({ [k]: 0 }))),
    bmiRanges: Object.assign({}, ...Constants['bmiRanges'].map(k => ({ [k]: 0 }))),
    furtherSessions: Object.assign({}, ...['Yes', 'No'].map(k => ({ [k]: 0 }))),
    hasIcf: Object.assign({}, ...['Yes', 'No'].map(k => ({ [k]: 0 }))),
};

function Participants({ filterDataFromStats, setFilterDataFromStats, setShowBookSession2 }) {

    const userInfo = useSelector((state) => state.userInfo.value || {});
    const userRole = userInfo['role'];
    const [shownParticipants, setShownParticipants] = useState([]);
    const [participants, setParticipants] = useState({});
    const [demoBins, setDemoBins] = useState({});
    const [sessions, setSessions] = useState({});

    useEffect(() => {
        document.getElementById('navbarTitle').innerText = 'Participants';
    }, []);

    useEffect(() => {
        if (!['admin'].includes(userRole)) return null;
        const listener1 = realtimeDb.ref("/participants").on('value', snapshot => setParticipants(snapshot.val() || {}));
        const listener2 = realtimeDb.ref("/demoBins").on('value', snapshot => setDemoBins(snapshot.val() || {}));
        const listener3 = realtimeDb.ref("/timeslots").on('value', snapshot => setSessions(snapshot.val() || {}));

        return () => {
            realtimeDb.ref("/participants").off('value', listener1);
            realtimeDb.ref("/demoBins").off('value', listener2);
            realtimeDb.ref("/timeslots").off('value', listener3);
        }
    }, []);

    // Reset filterstats
    let filterStats = JSON.parse(JSON.stringify(defaultFilterStats));

    return <div id="participants">
        <ParticipantFilter
            participants={participants}
            setShownParticipants={setShownParticipants}
            filterStats={filterStats}
            filterDataFromStats={filterDataFromStats}
            setFilterDataFromStats={setFilterDataFromStats}
            sessions={sessions}
        />

        <span id="filterNote">
            Filtered participants: {shownParticipants.length}
            {shownParticipants.length > 100 && (
                <span> (The list is cropped at 100)</span>
            )}
        </span>

        <div id="participantTable">
            {shownParticipants.map((participantId, index) => {
                const participantInfo = participants[participantId];

                if (!participantInfo) return null; //prevents attempting to render after deleting ppts

                const gender = Constants['genders'][participantInfo['gender']];
                const ageRange = GetAgeRange(participantInfo)['ageRange'];
                const bmiRange = GetBMIRange(participantInfo)['bmiRange'];
                const status = participantInfo['status'] ? Constants['participantStatuses'][participantInfo['status']] : 'Blank';
                const skintone = GetSkinTone(participantInfo)['skinRange'];
                const facialHair = Constants['facialHair'][participantInfo['facialHair']];
                const hairLength = Constants['hairLength'][participantInfo['hairLength']];
                const hairType = Constants['hairType'][participantInfo['hairType']];
                const hairColor = Constants['hairColor'][participantInfo['hairColor']];
                const ethnicities = participantInfo['ethnicities']
                const furtherSession = participantInfo['furtherSessions'] || false === true ? "Yes" : "No"
                let ethnicityGroups = ethnicities.toString().split(';').map(eth => {
                    return Object.keys(Constants['ethnicityGroups']).find(group => Constants['ethnicityGroups'][group].includes(parseInt(eth)));
                });
                const multipleEthnicities = [...new Set(ethnicityGroups)].length > 1 ? 'Yes' : 'No';
                const hasIcf = participantInfo['icfs'] ? 'Yes' : 'No';

                ethnicityGroups.forEach(ethnicityGroup => filterStats['ethnicityGroups'][ethnicityGroup]++);
                filterStats['genders'][gender]++;
                filterStats['ageRanges'][ageRange]++;
                filterStats['bmiRanges'][bmiRange]++;
                filterStats['statuses'][status]++;
                filterStats['skintones'][skintone]++;
                filterStats['multipleEthnicities'][multipleEthnicities]++;
                filterStats['hairLengths'][hairLength]++;
                filterStats['hairTypes'][hairType]++;
                filterStats['hairColors'][hairColor]++;
                filterStats['facialHairs'][facialHair]++;
                filterStats['furtherSessions'][furtherSession]++;
                filterStats['hasIcf'][hasIcf]++;

                if (index >= 100) return null;

                return <ParticipantCard
                    key={"participant-card-" + participantId}
                    participantId={participantId}
                    participants={participants}
                    setShowBookSession2={setShowBookSession2}
                    demoBins={demoBins}
                />
            })
            }
        </div>
    </div>
};

export default Participants;


import { useState, useReducer, useMemo, useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';
import { realtimeDb } from '../../firebase/config';

import './index.css';
import Constants from '../Constants';
import TimeSlotFormat from '../CommonFunctions/TimeSlotFormat';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import GetBMIRange from '../CommonFunctions/GetBMIRange';

const filterReducer = (state, event) => {

    let newState = JSON.parse(JSON.stringify(state));

    if (event.target.name == "checkAll") {
        let field = event.target.getAttribute('field');
        let values = event.target.getAttribute('values');
        newState[field] = values.split(',');
        return newState;
    }

    if (event.target.type == "checkbox") {
        let filterValue = event.target.name;
        let checked = event.target.checked;
        let filterType = event.target.alt;
        if (checked && !newState[filterType].includes(filterValue)) {
            newState[filterType].push(filterValue);
        } else if (!checked && state[filterType].includes(filterValue)) {
            const index = newState[filterType].indexOf(filterValue);
            newState[filterType].splice(index, 1);
        }
    }

    return newState;
}

function SchedulerExternal({ }) {
    const [csvData, setCsvData] = useState([[]]);
    const [participants, setParticipants] = useState({});
    const [timeslots, setTimeslots] = useState({});
    const [filterData, setFilterData] = useReducer(filterReducer, {
        date: [format(new Date(), "yyyy-MM-dd")],
        sessionStatuses: ['Blank', 'Locked', ...Object.values(Constants['sessionStatuses'])],
        participantStatuses: ['Blank', ...Object.values(Constants['participantStatuses'])]
    });

    useEffect(() => {
        document.getElementById('navbarTitle').innerText = 'Scheduler';

        const listener = realtimeDb.ref('/timeslots').on('value', timeslots => setTimeslots(timeslots.val() || {}));
        const listener2 = realtimeDb.ref('/participants').on('value', participants => setParticipants(participants.val() || {}));

        return () => {
            realtimeDb.ref('/timeslots').off('value', listener);
            realtimeDb.ref('/participants').off('value', listener2);
        }
    }, []);


    function getCSVData() {
        let headers = document.querySelectorAll('#tableHeaders tr th');
        let columns = []
        headers.forEach(child => {
            columns.push(child.textContent)
        })

        let output = [[...columns]];
        let table = document.getElementById("schedulerTable");
        for (var r = 1; r < table.rows.length; r++) {
            let row = table.rows[r];
            let temp = [];
            for (var c = 0; c < row.cells.length; c++) {
                temp.push(row.cells[c].innerHTML);
            }
            output.push(temp);
        }

        setCsvData(output);
        return output;
    }

    return (Object.keys(timeslots).length > 0 && Object.keys(filterData).length > 0 &&
        <div id="schedulerContainer">
            <CSVLink
                id="downloadCsvButton"
                target="_blank"
                asyncOnClick={true}
                onClick={() => getCSVData()}
                filename={"Blackburn scheduler - " + format(new Date(), "yyyy-MM-dd") + ".csv"}
                data={csvData}
            >Download CSV</CSVLink>
            <div className="scheduler-table-container">
                <table id="schedulerTable" className="scheduler-table">
                    <thead id='tableHeaders'>
                        <tr>
                            <th>Date</th>
                            <th>Status</th>
                            <th>TELUS ID</th>
                            <th>First Name</th>
                            <th>Last Initial</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>BMI</th>
                            <th>Ethnicity Group</th>
                            <th>Skintone</th>
                            <th>Hair Color</th>
                            <th>Hair Length</th>
                            <th>Hair Type</th>
                            <th>Facial Hair</th>
                            <th>Facial Makeup</th>
                            <th>Tattoos</th>
                            <th>Piercings</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(timeslots).map(timeslotId => {
                            const participantInfo = participants[timeslots[timeslotId]['participantId']];
                            if (!participantInfo) return null;

                            return <tr key={'timeslot-row-id-' + timeslotId}>
                                <td className='center-tag'>{TimeSlotFormat(timeslotId)}</td>
                                <td className='center-tag'>{Constants['sessionStatuses'][timeslots[timeslotId]['status']]}</td>
                                <td className='center-tag'>{timeslots[timeslotId]['participantId']}</td>
                                <td className='center-tag'>{participantInfo ? participantInfo['firstName'] : ""}</td>
                                <td className='center-tag'>{participantInfo ? participantInfo['lastName'][0] + "." : ""}</td>
                                <td className='center-tag'>{participantInfo ? Constants['genders'][participantInfo['gender']] : ""}</td>
                                <td className='center-tag'>{participantInfo ? GetAgeRange(participantInfo)['age'] : ""}</td>
                                <td className='center-tag'>{participantInfo ? GetBMIRange(participantInfo)['bmi'] : ""}</td>
                                <td className='center-tag'>{participantInfo ? participantInfo['ethnicities'].split(";").map(eth => {
                                    return Object.keys(Constants['ethnicityGroups']).find(group => Constants['ethnicityGroups'][group].includes(parseInt(eth)));
                                }).join(", ") : ""}</td>
                                <td className='center-tag'>{participantInfo ? participantInfo['skintone'] : ""}</td>
                                <td className='center-tag'>{participantInfo ? Constants['hairColor'][participantInfo['hairColor']] : ""}</td>
                                <td className='center-tag'>{participantInfo ? Constants['hairLength'][participantInfo['hairLength']] : ""}</td>
                                <td className='center-tag'>{participantInfo ? Constants['hairType'][participantInfo['hairType']] : ""}</td>
                                <td className='center-tag'>{participantInfo ? Constants['facialHair'][participantInfo['facialHair']] : ""}</td>
                                <td className='center-tag'>{Constants['makeup'][timeslots[timeslotId]['makeup']]}</td>
                                <td className='center-tag'>{participantInfo ? participantInfo['tattoos'] === "4" ? "No" : "Yes" : ""}</td>
                                <td className='center-tag'>{participantInfo ? participantInfo['piercings'] === "4" ? "No" : "Yes" : ""}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default SchedulerExternal;
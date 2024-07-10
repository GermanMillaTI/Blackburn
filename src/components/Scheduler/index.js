import { useState, useReducer, useMemo, useEffect } from 'react';
import { realtimeDb } from '../../firebase/config';
import { CSVLink } from 'react-csv';
import { format } from 'date-fns';

import './index.css';
import Constants from '../Constants';
import TableFilter from '../CommonFunctions/TableFilter';
import SchedulerRow from './SchedulerRow';

const filterReducer = (state, event) => {

    let newState = JSON.parse(JSON.stringify(state));

    if (event.target.name == "setFromFunction") {
        newState['date'] = event.target.days;
        return newState;
    } else if (event.target.name == "checkAll") {
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

function Scheduler({ setUpdateSession, updateSession }) {
    const [days, setDays] = useState([]);
    const [csvData, setCsvData] = useState([[]]);
    const [participants, setParticipants] = useState({});
    const [timeslots, setTimeslots] = useState({});
    const [client, setClient] = useState([]);
    const [filterDatesResetted, setFilterDatesResetted] = useState(false);
    const [filterData, setFilterData] = useReducer(filterReducer, {
        date: [format(new Date(), "yyyy-MM-dd")],
        sessionStatuses: ['Blank', 'Locked', ...Object.values(Constants['sessionStatuses'])],
        participantStatuses: ['Blank', ...Object.values(Constants['participantStatuses'])]
    });

    useEffect(() => {
        const listener = realtimeDb.ref('/timeslots').on('value', timeslots => setTimeslots(timeslots.val() || {}));
        const listener2 = realtimeDb.ref('/participants').on('value', participants => setParticipants(participants.val() || {}));
        const listener3 = realtimeDb.ref('/client').on('value', client => setClient(client.val() || {}));

        return () => {
            realtimeDb.ref('/timeslots').off('value', listener);
            realtimeDb.ref('/participants').off('value', listener2);
            realtimeDb.ref('/client').off('value', listener3);
        }
    }, []);

    useEffect(() => {
        document.getElementById('navbarTitle').innerText = 'Scheduler';
    }, []);

    useEffect(() => {
        // Setting all the days to be selected by default
        if (days.length === 0 || filterDatesResetted) return;
        setFilterData({ target: { name: "setFromFunction", days: days } });
        setFilterDatesResetted(true);
    }, [days]);

    useMemo(() => {
        if (Object.keys(timeslots).length === 0) return null;

        var temp = [];
        for (var timeslotId in timeslots) {
            let timeslotDate = timeslotId.substring(0, 4) + "-" + timeslotId.substring(4, 6) + "-" + timeslotId.substring(6, 8);
            if (!temp.includes(timeslotDate)) temp.push(timeslotDate);
        }

        setDays(temp);

    }, [JSON.stringify(timeslots)]);

    function getCSVData() {
        let output = [['Date', 'Session status', 'Participant status', 'Participant ID', 'Apple ID', 'Name', 'Email', 'Comments']];

        let table = document.getElementById("schedulerTable");
        for (var r = 1; r < table.rows.length; r++) {
            let row = table.rows[r];
            let temp = [];
            // -1, because we don't need the last column...
            for (var c = 0; c < row.cells.length - 1; c++) {
                temp.push(row.cells[c].innerHTML);
            }
            output.push(temp);
        }

        setCsvData(output);
        return output;
    }

    function filterFunction(timeslotId) {
        const timeslotDate = timeslotId.substring(0, 4) + "-" + timeslotId.substring(4, 6) + "-" + timeslotId.substring(6, 8);
        const session = timeslots[timeslotId];
        let sessionStatus = Constants['sessionStatuses'][session['status']] || "Blank";
        if (session['locked']) sessionStatus = 'Locked';

        const participantId = session['participantId'];
        const participant = participants[participantId] || {};
        const participantStatus = Constants['participantStatuses'][participant['status']] || 'Blank';

        return filterData['participantStatuses'].includes(participantStatus) &&
            filterData['sessionStatuses'].includes(sessionStatus) &&
            filterData['date'].includes(timeslotDate);
    }

    return (Object.keys(timeslots).length > 0 && Object.keys(participants).length > 0 && Object.keys(filterData).length > 0 &&
        <div id="schedulerContainer">
            <CSVLink
                id="downloadCsvButton"
                target="_blank"
                asyncOnClick={true}
                onClick={() => getCSVData()}
                filename={"Blackburn scheduler - exported at " + format(new Date(), "yyyy-MM-dd") + ".csv"}
                data={csvData}
            >Download CSV</CSVLink>
            <div className="scheduler-table-container">
                <table id="schedulerTable" className="scheduler-table">
                    <thead>
                        <tr>
                            <th>
                                <TableFilter
                                    filterName="Date"
                                    alt="date"
                                    values={days}
                                    filterData={filterData}
                                    setFilterData={setFilterData}
                                    selectedEach={true}
                                />
                            </th>
                            <th>
                                <TableFilter
                                    filterName="Session status"
                                    alt="sessionStatuses"
                                    values={['Blank', 'Locked', ...Object.values(Constants['sessionStatuses'])]}
                                    filterData={filterData}
                                    setFilterData={setFilterData}
                                    selectedEach={false}
                                />
                            </th>
                            <th>
                                <TableFilter
                                    filterName="Participant status"
                                    alt="participantStatuses"
                                    values={['Blank', ...Object.values(Constants['participantStatuses'])]}
                                    filterData={filterData}
                                    setFilterData={setFilterData}
                                    selectedEach={false}
                                />
                            </th>
                            <th>Participant ID</th>
                            <th>Apple ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Comments</th>
                            <th>Functions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(timeslots).length > 0 && Object.keys(timeslots)
                            .filter(timeslotId => filterFunction(timeslotId))
                            .sort((a, b) => (a.length == 15 ? (a.substring(0, 14) + "0" + a.substring(14)) : a) < (b.length == 15 ? (b.substring(0, 14) + "0" + b.substring(14)) : b) ? -1 : 1)
                            .map((key, index, array) => {
                                return <SchedulerRow
                                    key={"sch-row-" + key}
                                    participants={participants}
                                    timeslots={timeslots}
                                    sessionId={key}
                                    index={index}
                                    array={array}
                                    client={client}
                                />
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );

};

export default Scheduler;
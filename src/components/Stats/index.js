import React, { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../firebase/config';
import { ref, onValue, off } from 'firebase/database';
import Constants from '../Constants';
import GetAgeRange from '../CommonFunctions/GetAgeRange';
import './index.css';

const filterReducer = (state, event) => {
    let newState = JSON.parse(JSON.stringify(state));
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

function Stats({ setShowStats }) {
    const [database, setDatabase] = useState({});
    const [stats, setStats] = useState(getDefaultNumbers());
    const [filterData, setFilterData] = useReducer(filterReducer, {
        statuses: ["Blank", "Not Selected"],
        statuses2: ["Contacted", "Scheduled", "Completed"],
        skinTones: Constants['skinTone']
    });

    function getDefaultNumbers() {
        let temp = Object.assign({}, ...Object.values(Constants['ethnicities']).map(k => ({
            [k]: Object.assign({}, ...Constants['listOfAgeRanges'].map(k => ({
                [k]: Object.assign({}, ...Object.values(Constants['genders']).map(k => ({
                    [k]: Object.assign({}, ...Object.values(Constants['participantStatuses']).map(k => ({ [k || "Blank"]: 0 })))
                })))
            })))
        })))

        return (temp);
    }

    console.log(stats)
    useEffect(() => {

        const path = '/participants';
        const pptRef = ref(realtimeDb, path);

        const listener = onValue(pptRef, (res) => {

            setDatabase(res.val() || {});
        });

        let tempStats = getDefaultNumbers();

        Object.values(database).map(participant => {
            let gender = participant['gender']
            let ageRange = GetAgeRange(participant)['ageRange'];
            let ethnicities = participant['ethnicities']
        })


        return () => {
            off(pptRef, "value", listener);

        }

    }, []);

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) setShowStats(""); };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, [setShowStats]);

    return ReactDOM.createPortal((
        <div className="modal-stats-backdrop" onClick={(e) => { if (e.target.className == "modal-stats-backdrop") setShowStats("") }}>
            <div className='modal-stats-main-container'>
                <div className="modal-stats-header">
                    Participant stats
                </div>

                <div className="stats-filter-element">
                    <div><span className="first-number">First number:</span></div>
                    {Object.values(Constants['participantStatuses']).map((val, i) => {
                        return <div key={"filter-status" + i}>
                            <input id={"stats-filter-participant-status-" + (val || "Blank")} name={val || "Blank"} type="checkbox" alt="statuses" onChange={setFilterData} checked={val == "" ? filterData['statuses'].includes("Blank") : filterData['statuses'].includes(val)} />
                            <label className="first-number" htmlFor={"stats-filter-participant-status-" + (val || "Blank")}>{(val || "Blank")}</label>
                        </div>
                    })}
                </div>

                <div className="stats-filter-element">
                    <div><span className="second-number">Second number:</span></div>
                    {Object.values(Constants['participantStatuses']).map((val, i) => {
                        return <div key={"filter-status" + i}>
                            <input id={"stats-filter2-participant-status-" + (val || "Blank")} name={val || "Blank"} type="checkbox" alt="statuses2" onChange={setFilterData} checked={val == "" ? filterData['statuses2'].includes("Blank") : filterData['statuses2'].includes(val)} />
                            <label className="second-number" htmlFor={"stats-filter2-participant-status-" + (val || "Blank")}>{(val || "Blank")}</label>
                        </div>
                    })}
                </div>

                <div className="modal-stats-content">
                    {['Male', 'Female'].map((gender) => {
                        return <table key={gender} className="table-of-stats">
                            <thead>
                                <tr>
                                    <th>
                                        {gender}
                                    </th>
                                    {Object.keys(Constants['ethnicityGroups']).map(eth => {
                                        return <th key={'stats-header-' + eth}>{eth}</th>
                                    })}
                                    <th>Totals</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Constants['listOfAgeRanges'].map(AgeRange => {
                                    return <tr key={AgeRange}>
                                        <th>{AgeRange}</th>
                                        {Object.keys(Constants['ethnicityGroups']).map(columnName => {
                                            let eth = Constants['ethnicityGroups'][columnName];


                                            return <td>{columnName}</td>
                                        })}
                                    </tr>
                                })}
                            </tbody>
                        </table>
                    })}
                </div>




            </div>
        </div>
    ), document.body);

};

export default Stats;
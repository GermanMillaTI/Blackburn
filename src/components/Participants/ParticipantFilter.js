import React from "react";
import { useEffect, useReducer } from 'react';

import './ParticipantFilter.css';
import Constants from '../Constants';
import GetAgeRange from "../CommonFunctions/GetAgeRange";
import Card from '@mui/material/Card';


const defaultFilterValues = {
    genders: Object.values(Constants['genders']),
    ageRanges: Constants['ageRanges'],
    //statuses: Object.values(Constants['participantStatuses']).map(status => status || 'Blank'),
    statuses: ['Blank', 'Handoff sent', 'Reminder sent', 'Review sent'],
};

const filterReducer = (state, event) => {
    if (event.target.name == "resetFilter") {
        return JSON.parse(JSON.stringify(defaultFilterValues));
    }

    let newState = JSON.parse(JSON.stringify(state));
    if (event.target.name == "countryOfResidence") {
        newState['countryOfResidence'] = event.target.value;
        return newState;
    } else if (event.target.tagName == "BUTTON") {
        // Use this to 'filter only...'
        let value = event.target.name;
        let arrayName = event.target.getAttribute('alt');
        newState[arrayName] = [value];
        return newState;
    } else if (event.target.type == "checkbox") {
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

    if (event.target.type == "text" || event.target.type == "number") {
        let filterName = event.target.name;
        let filterValue = event.target.value.toLowerCase();

        if (['email', 'ipAddress'].includes(filterName)) filterValue = filterValue.trim();

        if (filterValue == "") {
            if (newState[filterName]) delete newState[filterName];
        } else {
            newState[filterName] = filterValue;
        }
    }

    if (event.target.type == "date") {
        let filterName = event.target.name;
        let filterValue = event.target.value;
        if (filterValue == "") {
            if (newState[filterName]) delete newState[filterName];
        } else {
            newState[filterName] = filterValue;
        }
    }

    return newState;
}


function ParticipantFilter({ participants, setShownParticipants, filterStats }) {

    const [filterData, setFilterData] = useReducer(filterReducer, JSON.parse(JSON.stringify(defaultFilterValues)));

    function filterFunction(participantId) {
        const participantInfo = participants[participantId];
        if (filterData['participantId'] && !participantId.includes(filterData['participantId'])) return false;

        const firstName = participantInfo['fname'].toLowerCase();
        if (filterData['firstName'] && !firstName.includes(filterData['firstName'].trim())) return false;

        const lastName = participantInfo['lname'].toLowerCase();
        if (filterData['lastName'] && !lastName.includes(filterData['lastName'].trim())) return false;

        const email = participantInfo['email'].toLowerCase();
        if (filterData['email'] && !email.includes(filterData['email'].trim())) return false;

        const gender = Constants['genders'][participantInfo['gender']];
        if (!filterData['genders'].includes(gender)) return false;

        const ageRange = GetAgeRange(participantInfo)['ageRange'];
        if (!filterData['ageRanges'].includes(ageRange)) return false;


        const status = participantInfo['status'] ? Constants['participantStatuses'][participantInfo['status']] : 'Blank';
        if (!filterData['statuses'].includes(status)) return false;

        // Check date of registration
        let dateOfRegistration;
        let dateFrom = filterData['dateOfRegistrationFrom'];
        let dateTo = filterData['dateOfRegistrationTo'];
        if (dateFrom) {
            dateOfRegistration = new Date(participantInfo['date']);
            dateFrom = new Date(dateFrom);
            if (dateOfRegistration < dateFrom) return false;
        }
        if (dateTo) {
            if (!dateOfRegistration) dateOfRegistration = new Date(participantInfo['date']);
            dateTo = new Date(dateTo);
            dateTo.setDate(dateTo.getDate() + 1);
            if (dateOfRegistration > dateTo) return false;
        }

        return true;
    }

    useEffect(() => {
        setShownParticipants(Object.keys(participants).filter(pid => filterFunction(pid)));
    }, [JSON.stringify(participants), filterData]);

    return <Card className="filter-main-container">

        <div className="filter-container">
            <span className="filter-container-header">Filter</span>

            <div className="filter-element">
                <input name="participantId" type="number" placeholder="Participant ID" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['participantId'] || ""} />
            </div>
            <div className="filter-element">
                <input name="firstName" type="text" placeholder="First name" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['firstName'] || ""} />
            </div>
            <div className="filter-element">
                <input name="lastName" type="text" placeholder="Last name" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['lastName'] || ""} />
            </div>
            <div className="filter-element">
                <input name="email" type="text" placeholder="E-mail" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['email'] || ""} />
            </div>


            <div className="filter-element gap">
                <span>Date of registration</span>
                <input name="dateOfRegistrationFrom" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfRegistrationFrom'] || ""} />
            </div>
            <div className="filter-element">
                <input name="dateOfRegistrationTo" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfRegistrationTo'] || ""} />
            </div>
            <div className="filter-element">
                <button name="resetFilter" className="reset-filter-button" onClick={setFilterData}>Reset filter</button>
            </div>
        </div>

        <div className="filter-container">
            <span className="filter-container-header">Gender</span>
            <div className="filter-element">


                {Object.keys(Constants['genders']).map((genderId, i) => {
                    const val = Constants['genders'][genderId];
                    return <div key={"filter-gender-" + i} className="filter-object">
                        <input id={"filter-" + val} name={val} type="checkbox" alt="genders" onChange={setFilterData} checked={filterData['genders'].includes(val)} />
                        <label htmlFor={"filter-" + val}>{val + " (" + filterStats['genders'][val] + ")"}</label>
                        <button name={val} alt="genders" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>

        <div className="filter-container">
            <span className="filter-container-header">Age range</span>
            <div className="filter-element">
                {Constants['ageRanges'].map((val, i) => {
                    return <div key={"filter-age-" + i} className="filter-object">
                        <input id={"filter-" + val} name={val} type="checkbox" alt="ageRanges" onChange={setFilterData} checked={filterData['ageRanges'].includes(val)} />
                        <label htmlFor={"filter-" + val}>{val + " (" + filterStats['ageRanges'][val] + ")"}</label>
                        <button name={val} alt="ageRanges" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>



        <div className="filter-container">
            <div className="filter-element">
                <span className="filter-header">Status</span>
                {Object.keys(Constants['participantStatuses']).map((statusId, i) => {
                    const val = Constants['participantStatuses'][statusId] || "Blank";
                    return <div key={"filter-status-" + i} className="filter-object">
                        <input id={"filter-status-" + val} name={val} type="checkbox" alt="statuses" onChange={setFilterData} checked={filterData['statuses'].includes(val)} />
                        <label htmlFor={"filter-status-" + val}>{val + " (" + filterStats['statuses'][val] + ")"}</label>
                        <button name={val} alt="statuses" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>

    </Card>
};
export default ParticipantFilter;

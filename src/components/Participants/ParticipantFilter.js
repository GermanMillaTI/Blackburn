import React, { useState } from "react";
import { useEffect, useReducer } from 'react';

import './ParticipantFilter.css';
import Constants from '../Constants';
import GetAgeRange from "../CommonFunctions/GetAgeRange";
import GetSkinTone from "../CommonFunctions/GetSkinTone";
import Card from '@mui/material/Card';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const defaultFilterValues = {
    genders: Object.values(Constants['genders']),
    ageRanges: Constants['ageRanges'],
    statuses: Object.values(Constants['participantStatuses']).map(status => status || 'Blank'),
    skintones: Constants['skintones']
};//


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
    const [ageScroll, setAgeScroll] = useState(true);


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

        const skintone = GetSkinTone(participantInfo)['skinRange'];
        if (!filterData['skintones'].includes(skintone)) return false;

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
        const filteredParticipants = Object.keys(participants).filter(pid => filterFunction(pid))
        setShownParticipants(filteredParticipants);
    }, [participants, filterData]);


    try {
        const target = document.querySelector('#ageRange');

        target.addEventListener('scroll', () => {

            const isAtBottom = target.scrollHeight - target.scrollTop - target.clientHeight <= 1;
            setAgeScroll(!isAtBottom)
        }, false)
    } catch (e) {
        console.log(e)
    }

    const scrollToBottom = () => {
        const scrollbar = document.getElementById("ageRange");
        scrollbar.scrollTop = scrollbar.scrollHeight;

    }

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
                        <input id={"filter-gender-" + val} name={val} type="checkbox" alt="genders" onChange={setFilterData} checked={filterData['genders'].includes(val)} />
                        <label htmlFor={"filter-gender-" + val}>{val + " (" + filterStats['genders'][val] + ")"}</label>
                        <button name={val} alt="genders" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>

        <div className="filter-container" >
            <span className="filter-container-header">Age range</span>
            <div className="filter-element" style={{ borderTop: !ageScroll ? "8px solid #4B286D" : "", borderBottom: ageScroll ? "8px solid #4B286D" : "", borderRadius: "5px" }} id="ageRange" >
                {Constants['ageRanges'].map((val, i) => {
                    return <div key={"filter-age-" + i} className="filter-object">
                        <input id={"filter-age-" + val} name={val} type="checkbox" alt="ageRanges" onChange={setFilterData} checked={filterData['ageRanges'].includes(val)} />
                        <label htmlFor={"filter-age-" + val}>{val + " (" + filterStats['ageRanges'][val] + ")"}</label>
                        <button name={val} alt="ageRanges" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
            {ageScroll && <div className="scroll-indicator" onClick={scrollToBottom}><strong><ArrowDropDownIcon sx={{ color: "white", fontSize: "20px", alignSelf: "center" }} /></strong></div>}

        </div>

        <div className="filter-container" >
            <span className="filter-container-header">Skin tones</span>
            <div className="filter-element" id="skintones" >
                {Constants['skintones'].map((val, i) => {
                    val = val.toString();
                    return <div key={"filter-skintone-" + i} className="filter-object">
                        <input id={"filter-skintone-" + val} name={val} type="checkbox" alt="skintones" onChange={setFilterData} checked={filterData['skintones'].includes(val)} />
                        <label htmlFor={"filter-skintone-" + val}>{val + " (" + filterStats['skintones'][val] + ")"}</label>
                        <button name={val} alt="skintones" className="filter-this-button" onClick={setFilterData}>!</button>
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


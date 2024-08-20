import { useEffect, useReducer } from 'react';
import './ParticipantFilter.css';
import Constants from '../Constants';
import GetAgeRange from "../CommonFunctions/GetAgeRange";
import GetSkinTone from "../CommonFunctions/GetSkinTone";
import alltypes from "../CommonFunctions/PropTypes";
import GetBMIRange from "../CommonFunctions/GetBMIRange";

const defaultFilterValues = {
    genders: Object.values(Constants['genders']),
    ageRanges: Constants['ageRanges'].filter(ageRange => ageRange != "<13"),
    statuses: Object.values(Constants['participantStatuses']).map(status => status || 'Blank'),
    skintones: Constants['skintones'],
    multipleEthnicities: ['Yes', 'No'],
    ethnicityGroups: Object.keys(Constants['ethnicityGroups']).filter(group => group != 'Other'),
    hairLengths: Object.values(Constants['hairLength']),
    hairTypes: Object.values(Constants['hairType']),
    hairColors: Object.values(Constants['hairColor']),
    facialHairs: Object.values(Constants['facialHair']),
    bmiRanges: Constants['bmiRanges'],
    furtherSessions: ["Yes", "No"],
    hasIcf: ["Yes", "No"],
    sessionStatuses: ['Blank', ...Object.values(Constants['sessionStatuses'])].map(status => status),
    noEar: ["Yes", "No"]
}

const filterReducer = (state, event) => {

    // If the filter is called from stats
    if (event.fromStats) return event;

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

        if (['email', 'phone'].includes(filterName)) filterValue = filterValue.trim();

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



function ParticipantFilter({ participants, sessions, setShownParticipants, filterStats, filterDataFromStats, setFilterDataFromStats }) {

    const [filterData, setFilterData] = useReducer(filterReducer, JSON.parse(JSON.stringify(defaultFilterValues)));

    //proptype validation
    ParticipantFilter.propTypes = alltypes.ParticipantComponent;

    useEffect(() => {
        if (filterDataFromStats) {
            setFilterData(filterDataFromStats);
            setFilterDataFromStats(false);
        }
    }, [filterDataFromStats])

    function filterFunction(participantId) {
        const participantInfo = participants[participantId];
        if (filterData['participantId'] && !participantId.toString().includes(filterData['participantId'])) return false;

        const firstName = participantInfo['firstName'].toLowerCase();
        if (filterData['firstName'] && !firstName.includes(filterData['firstName'].trim())) return false;

        const lastName = participantInfo['lastName'].toLowerCase();
        if (filterData['lastName'] && !lastName.includes(filterData['lastName'].trim())) return false;

        const email = participantInfo['email'].toLowerCase();
        if (filterData['email'] && !email.includes(filterData['email'].trim())) return false;

        const phone = participantInfo['phone'].toLowerCase();
        if (filterData['phone'] && !phone.includes(filterData['phone'].trim())) return false;

        const gender = Constants['genders'][participantInfo['gender']];
        if (!filterData['genders'].includes(gender)) return false;

        const ageRange = GetAgeRange(participantInfo)['ageRange'];
        if (!filterData['ageRanges'].includes(ageRange)) return false;

        const bmiRange = GetBMIRange(participantInfo)['bmiRange'];
        if (!filterData['bmiRanges'].includes(bmiRange)) return false;

        const ethnicities = participantInfo['ethnicities'];
        const ethnicityGroups = ethnicities.toString().split(';').map(eth => {
            return Object.keys(Constants['ethnicityGroups']).find(group => Constants['ethnicityGroups'][group].includes(parseInt(eth)));
        });

        const multipleEthnicities = [...new Set(ethnicityGroups)].length > 1 ? 'Yes' : 'No';
        if (!filterData['multipleEthnicities'].includes(multipleEthnicities)) return false;
        if (!filterData['ethnicityGroups'].some(group => ethnicityGroups.includes(group))) return false;

        const status = participantInfo['status'] ? Constants['participantStatuses'][participantInfo['status']] : 'Blank';
        if (!filterData['statuses'].includes(status)) return false;

        const skintone = GetSkinTone(participantInfo)['skinRange'];
        if (!filterData['skintones'].includes(skintone)) return false;

        const hairLength = Constants['hairLength'][participantInfo['hairLength']];
        if (!filterData['hairLengths'].includes(hairLength)) return false;

        const hairType = Constants['hairType'][participantInfo['hairType']];
        if (!filterData['hairTypes'].includes(hairType)) return false;

        const hairColor = Constants['hairColor'][participantInfo['hairColor']];
        if (!filterData['hairColors'].includes(hairColor)) return false;

        const facialHair = Constants['facialHair'][participantInfo['facialHair']];
        if (!filterData['facialHairs'].includes(facialHair)) return false;

        const furtherSession = participantInfo['furtherSessions'] ? "Yes" : "No";
        if (!filterData['furtherSessions'].includes(furtherSession)) return false;

        const hasIcf = participantInfo['icfs'] ? "Yes" : "No";
        if (!filterData['hasIcf'].includes(hasIcf)) return false;

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

        let sessionDateFrom = filterData['dateOfSessionsFrom'];
        let sessionDateTo = filterData['dateOfSessionsTo'];
        if (sessionDateFrom) {
            sessionDateFrom = new Date(sessionDateFrom);
            let sessionFromList = Object.keys(sessions).find(session => {
                let tempDate = new Date(session.substring(0, 4) + "-" + session.substring(4, 6) + "-" + session.substring(6, 8))
                return tempDate >= sessionDateFrom && sessions[session]['participantId'] == participantId
            })
            if (typeof sessionFromList == "undefined") return false
        }

        if (sessionDateTo) {
            sessionDateTo = new Date(sessionDateTo);
            let sessionToList = Object.keys(sessions).find(session => {
                let tempDate = new Date(session.substring(0, 4) + "-" + session.substring(4, 6) + "-" + session.substring(6, 8))

                return tempDate <= sessionDateTo && sessions[session]['participantId'] == participantId
            })
            if (typeof sessionToList == "undefined") return false
        }

        const participantSessionIds = Object.keys(sessions).filter(sessionId => sessions[sessionId]['participantId'] === participantId).sort((a, b) => a.localeCompare(b));
        const lastSessionId = participantSessionIds.length > 0 ? participantSessionIds.pop() : null;
        const lastSession = lastSessionId ? sessions[lastSessionId] : null;
        const lastSessionStatus = lastSessionId ? Constants['sessionStatuses'][lastSession['status']] : 'Blank';
        if (!filterData['sessionStatuses'].includes(lastSessionStatus)) return false;

        const noEar = lastSessionId ? (lastSession['noEar'] ? 'Yes' : 'No') : 'No';
        if (!filterData['noEar'].includes(noEar)) return false;

        return true;
    }

    useEffect(() => {
        const filteredParticipants = Object.keys(participants).filter(participantId => filterFunction(parseInt(participantId)));
        setShownParticipants(filteredParticipants);
    }, [JSON.stringify(participants), JSON.stringify(filterData)]);


    return <div id="participantFilter">

        <div className="filter-main-container">
            <span className="filter-header">Filter</span>

            <div className="filter-container">
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
                <div className="filter-element">
                    <input name="phone" type="text" placeholder="Phone number" className="main-input" autoComplete="off" onChange={setFilterData} value={filterData['phone'] || ""} />
                </div>

                <span className="inner-header gap">Date of registration</span>
                <div className="date-selector-element">
                    <input name="dateOfRegistrationFrom" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfRegistrationFrom'] || ""} />
                    <input name="dateOfRegistrationTo" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfRegistrationTo'] || ""} />
                </div>

                <span className="inner-header gap">Date of session(s)</span>
                <div className="date-selector-element">
                    <input name="dateOfSessionsFrom" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfSessionsFrom'] || ""} />
                    <input name="dateOfSessionsTo" type="date" onChange={setFilterData} min="2024-03-01" max="2024-12-31" value={filterData['dateOfSessionsTo'] || ""} />
                </div>

                <div className="filter-element">
                    <button id="resetFilter" name="resetFilter" onClick={setFilterData}>Reset filter</button>
                </div>
            </div>
        </div>

        <div className="filter-main-container">
            <span className="filter-header">Age range</span>
            <div className="filter-container">
                {Constants['ageRanges'].map((val, i) => {
                    return <div key={"filter-age-" + i} className="checkbox-filter">
                        <input id={"filter-age-" + val} name={val} type="checkbox" alt="ageRanges" onChange={setFilterData} checked={filterData['ageRanges'].includes(val)} />
                        <label htmlFor={"filter-age-" + val}>{val + " (" + filterStats['ageRanges'][val] + ")"}</label>
                        <button name={val} alt="ageRanges" className="filter-this-button" onClick={setFilterData}>!</button>
                    </div>
                })}
            </div>
        </div>

        <div className="filter-column">
            <div className="filter-main-container">
                <span className="filter-header">Gender</span>
                <div className="filter-container">
                    {Object.keys(Constants['genders']).map((genderId, i) => {
                        const val = Constants['genders'][genderId];
                        return <div key={"filter-gender-" + i} className="checkbox-filter">
                            <input id={"filter-gender-" + val} name={val} type="checkbox" alt="genders" onChange={setFilterData} checked={filterData['genders'].includes(val)} />
                            <label htmlFor={"filter-gender-" + val}>{val + " (" + filterStats['genders'][val] + ")"}</label>
                            <button name={val} alt="genders" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>

            <div className="filter-main-container growing-item">
                <span className="filter-header">Skin tones</span>
                <div className="filter-container">
                    {Constants['skintones'].map((val, i) => {
                        val = val.toString();
                        return <div key={"filter-skintone-" + i} className="checkbox-filter">
                            <input id={"filter-skintone-" + val} name={val} type="checkbox" alt="skintones" onChange={setFilterData} checked={filterData['skintones'].includes(val)} />
                            <label htmlFor={"filter-skintone-" + val}>{val + " (" + filterStats['skintones'][val] + ")"}</label>
                            <button name={val} alt="skintones" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>
        </div>

        <div className="filter-column">
            <div className="filter-main-container">
                <span className="filter-header">Ethnicity</span>
                <div className="filter-container">
                    {Object.keys(Constants['ethnicityGroups']).filter(el => el !== "Total").map((val, i) => {
                        val = val.toString();
                        return <div key={"filter-ethnicityGroups-" + i} className="checkbox-filter">
                            <input id={"filter-ethnicityGroups-" + val} name={val} type="checkbox" alt="ethnicityGroups" onChange={setFilterData} checked={filterData['ethnicityGroups'].includes(val)} />
                            <label htmlFor={"filter-ethnicityGroups-" + val}>{val + " (" + filterStats['ethnicityGroups'][val] + ")"}</label>
                            <button name={val} alt="ethnicityGroups" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>

            <div className="filter-main-container growing-item">
                <span className="filter-header">Multiple ethnicities</span>
                <div className="filter-container">
                    {["Yes", "No"].map((val, i) => {
                        val = val.toString();
                        return <div key={"filter-multipleEthnicities-" + i} className="checkbox-filter">
                            <input id={"filter-multipleEthnicities-" + val} name={val} type="checkbox" alt="multipleEthnicities" onChange={setFilterData} checked={filterData['multipleEthnicities'].includes(val)} />
                            <label htmlFor={"filter-multipleEthnicities-" + val}>{val + " (" + filterStats['multipleEthnicities'][val] + ")"}</label>
                            <button name={val} alt="multipleEthnicities" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>
        </div>

        <div className="filter-column">
            <div className="filter-main-container">
                <span className="filter-header">BMI range</span>
                <div className="filter-container">
                    {Constants['bmiRanges'].map((val, i) => {
                        return <div key={"filter-bmi-" + i} className="checkbox-filter">
                            <input id={"filter-bmi-" + val} name={val} type="checkbox" alt="bmiRanges" onChange={setFilterData} checked={filterData['bmiRanges'].includes(val)} />
                            <label htmlFor={"filter-bmi-" + val}>{val + " (" + filterStats['bmiRanges'][val] + ")"}</label>
                            <button name={val} alt="bmiRanges" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>

            <div className="filter-main-container growing-item">
                <span className="filter-header">Repeat</span>
                <div className="filter-container">
                    {["Yes", "No"].map((val, i) => {
                        val = val.toString();
                        return <div key={"filter-furtherSessions-" + i} className="checkbox-filter">
                            <input id={"filter-furtherSessions-" + val} name={val} type="checkbox" alt="furtherSessions" onChange={setFilterData} checked={filterData['furtherSessions'].includes(val)} />
                            <label htmlFor={"filter-furtherSessions-" + val}>{val + " (" + filterStats['furtherSessions'][val] + ")"}</label>
                            <button name={val} alt="furtherSessions" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>
        </div>

        <div className="filter-column">
            <div className="filter-main-container">
                <span className="filter-header">Hair length</span>
                <div className="filter-container">
                    {Object.keys(Constants['hairLength']).map((hairLengthId, i) => {
                        const val = Constants['hairLength'][hairLengthId];
                        return <div key={"filter-hairLength-" + i} className="checkbox-filter">
                            <input id={"filter-hairLength-" + val} name={val} type="checkbox" alt="hairLengths" onChange={setFilterData} checked={filterData['hairLengths'].includes(val)} />
                            <label htmlFor={"filter-hairLength-" + val}>{val + " (" + filterStats['hairLengths'][val] + ")"}</label>
                            <button name={val} alt="hairLengths" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>

            <div className="filter-main-container growing-item">
                <span className="filter-header">Hair color</span>
                <div className="filter-container">
                    {Object.keys(Constants['hairColor']).map((hairColorid, i) => {
                        const val = Constants['hairColor'][hairColorid];
                        return <div key={"filter-hairColor-" + i} className="checkbox-filter">
                            <input id={"filter-hairColor-" + val} name={val} type="checkbox" alt="hairColors" onChange={setFilterData} checked={filterData['hairColors'].includes(val)} />
                            <label htmlFor={"filter-hairColor-" + val}>{val + " (" + filterStats['hairColors'][val] + ")"}</label>
                            <button name={val} alt="hairColors" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>
        </div>

        <div className="filter-column">
            <div className="filter-main-container">
                <span className="filter-header">Hair types</span>
                <div className="filter-container">
                    {Object.keys(Constants['hairType']).map((hairTypeId, i) => {
                        const val = Constants['hairType'][hairTypeId];
                        return <div key={"filter-hairType-" + i} className="checkbox-filter">
                            <input id={"filter-hairType-" + val} name={val} type="checkbox" alt="hairTypes" onChange={setFilterData} checked={filterData['hairTypes'].includes(val)} />
                            <label htmlFor={"filter-hairType-" + val}>{val + " (" + filterStats['hairTypes'][val] + ")"}</label>
                            <button name={val} alt="hairTypes" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>

            <div className="filter-main-container growing-item">
                <span className="filter-header">Facial hair</span>
                <div className="filter-container">
                    {Object.keys(Constants['facialHair']).map((facialId, i) => {
                        const val = Constants['facialHair'][facialId];
                        return <div key={"filter-facialHair-" + i} className="checkbox-filter">
                            <input id={"filter-facialHair-" + val} name={val} type="checkbox" alt="facialHairs" onChange={setFilterData} checked={filterData['facialHairs'].includes(val)} />
                            <label htmlFor={"filter-facialHair-" + val}>{val + " (" + filterStats['facialHairs'][val] + ")"}</label>
                            <button name={val} alt="facialHairs" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>
        </div>

        <div className="filter-column">
            <div className="filter-main-container">
                <span className="filter-header">Status</span>
                <div className="filter-container">
                    {Object.keys(Constants['participantStatuses']).map((statusId, i) => {
                        const val = Constants['participantStatuses'][statusId] || "Blank";
                        return <div key={"filter-status-" + i} className="checkbox-filter">
                            <input id={"filter-status-" + val} name={val} type="checkbox" alt="statuses" onChange={setFilterData} checked={filterData['statuses'].includes(val)} />
                            <label htmlFor={"filter-status-" + val}>{val + " (" + filterStats['statuses'][val] + ")"}</label>
                            <button name={val} alt="statuses" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>

            <div className="filter-main-container growing-item">
                <span className="filter-header">Has ICF</span>
                <div className="filter-container">
                    {["Yes", "No"].map((val, i) => {
                        val = val.toString();
                        return <div key={"filter-hasIcf-" + i} className="checkbox-filter">
                            <input id={"filter-hasIcf-" + val} name={val} type="checkbox" alt="hasIcf" onChange={setFilterData} checked={filterData['hasIcf'].includes(val)} />
                            <label htmlFor={"filter-hasIcf-" + val}>{val + " (" + filterStats['hasIcf'][val] + ")"}</label>
                            <button name={val} alt="hasIcf" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>
        </div>

        <div className="filter-column">
            <div className="filter-main-container">
                <span className="filter-header">Last session</span>
                <div className="filter-container">
                    {['Blank', ...Object.keys(Constants['sessionStatuses'])].map((statusId, i) => {
                        const val = Constants['sessionStatuses'][statusId] || "Blank";
                        return <div key={"filter-session-status-" + i} className="checkbox-filter">
                            <input id={"filter-session-status-" + val} name={val} type="checkbox" alt="sessionStatuses" onChange={setFilterData} checked={filterData['sessionStatuses'].includes(val)} />
                            <label htmlFor={"filter-session-status-" + val}>{val + " (" + filterStats['sessionStatuses'][val] + ")"}</label>
                            <button name={val} alt="sessionStatuses" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>

            <div className="filter-main-container growing-item">
                <span className="filter-header">No ear</span>
                <div className="filter-container">
                    {["Yes", "No"].map((val, i) => {
                        val = val.toString();
                        return <div key={"filter-no-ear-" + i} className="checkbox-filter">
                            <input id={"filter-no-ear-" + val} name={val} type="checkbox" alt="noEar" onChange={setFilterData} checked={filterData['noEar'].includes(val)} />
                            <label htmlFor={"filter-no-ear-" + val}>{val + " (" + filterStats['noEar'][val] + ")"}</label>
                            <button name={val} alt="noEar" className="filter-this-button" onClick={setFilterData}>!</button>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </div>
};
export default ParticipantFilter;


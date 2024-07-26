import { useEffect, useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import { realtimeDb } from '../../firebase/config';

import './index.css';
import Constants from '../Constants';

function Bins({ setShowDemoBins }) {
    const [demos, setDemos] = useState({});

    useEffect(() => {
        const listener = realtimeDb.ref("/demoBins").on('value', snapshot => setDemos(snapshot.val() || {}));
        return () => realtimeDb.ref("/demoBins").off('value', listener);
    }, []);

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) setShowDemoBins(false); };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    if (Object.values(demos).length === 0) return;

    return ReactDOM.createPortal((
        <div id="demoBins" onClick={(e) => { if (e.target.id === "demoBins") setShowDemoBins(false); }}>
            <div id="mainContainer">
                <div id="header">Demo Bins</div>

                <div id="content">
                    {['Male', 'Female'].map((gender) => {
                        return <table key={gender}>
                            <thead>
                                <tr>
                                    <th>
                                        {gender}
                                    </th>
                                    {Object.keys(Constants['ethnicityGroups']).filter(el => el != "Total").map(eth => {
                                        return <th key={'stats-header-' + eth}>{eth}</th>
                                    })}
                                </tr>
                            </thead>
                            <tbody>
                                {Constants['listOfAgeRanges'].map(ageRange => {
                                    return <tr key={ageRange}>
                                        <th>{ageRange}</th>
                                        {Object.keys(Constants['ethnicityGroups']).filter(el => el != "Total").map(columnName => {
                                            let eth = Constants['ethDbMap2'][columnName];
                                            //let eth2 = Constants['ethnicityGroups'][columnName].map(el => Constants['ethnicities'][el]);

                                            let currentValue = demos[gender][eth][ageRange];
                                            return <td
                                                className={"demo-bin-" + currentValue.toString()}
                                                onClick={() => realtimeDb.ref("/demoBins/" + gender + "/" + eth).update({ [ageRange]: (currentValue === 2 ? 0 : currentValue + 1) })}
                                            >
                                                {Constants['demoBinStatusDictionary'][currentValue]}
                                            </td>
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

export default Bins;
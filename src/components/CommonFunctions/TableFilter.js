import React, { useEffect, useState, useRef } from "react";

import './TableFilter.css';

export default ({ filterName, alt, values, filterData, setFilterData }) => {
    const [filterIsOpen, setFilterIsOpen] = useState(false);
    const [each, setEach] = useState(false);
    const myRef = useRef();

    const handleClickOutside = e => {
        if (!myRef.current.contains(e.target)) {
            setFilterIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    });

    useEffect(() => {
        const handleEsc = (event) => { if (event.keyCode === 27) setFilterIsOpen(false) };
        window.addEventListener('keydown', handleEsc);
        return () => { window.removeEventListener('keydown', handleEsc) };
    }, []);

    return <div className="table-filter-object" ref={myRef}>

        <div className="filter-top" onClick={() => setFilterIsOpen(!filterIsOpen)}>
            <span>{filterName}</span>
            <button className={"fas fa-filter " +
                (JSON.stringify(JSON.parse(JSON.stringify(values)).sort()) == JSON.stringify(JSON.parse(JSON.stringify(filterData[alt])).sort()) ? "inactive" : "active")}
            />
        </div>

        {filterIsOpen &&
            <div className="filter-bottom">
                <button
                    name="checkAll"
                    field={alt}
                    values={each ? values : ""}
                    onClick={(e) => { setEach(!each); setFilterData(e); }}
                >
                    All
                </button>

                {values.filter(key => key).map(key => {
                    return <div key={key} className="table-filter-row">
                        <input
                            id={filterName + "-" + key}
                            type="checkbox"
                            alt={alt}
                            name={key}
                            onChange={setFilterData}
                            checked={filterData[alt].includes(key)}
                        />
                        <label htmlFor={filterName + "-" + key}>{key}</label>
                    </div>
                })}
            </div>
        }
    </div>
}
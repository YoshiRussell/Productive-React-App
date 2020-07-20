import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Details() {

    const [inputDetail, setInputDetail] = useState("");
    const [detailList, setDetailList] = useState(["detail one", "detail two"]);

    function handleSubmit(input) {
        setDetailList(prevList => [...prevList, input]);
    }

    return (
        <div className="details-content">
            <ul>
                {detailList.map(detail => {
                    return <li>{detail}</li>
                })}
            </ul>
            <div className="add-details-content">
                <input 
                    type="text"
                    placeholder="add detail here"
                    onChange={e => setInputDetail(e.target.value)}
                ></input>
                <button className="btn btn-secondary" onClick={e => {e.preventDefault(); handleSubmit(inputDetail)}}>+</button>
            </div>
        </div>
    )
}

export default Details;
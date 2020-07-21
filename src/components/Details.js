import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Details(props) {

    const [inputDetail, setInputDetail] = useState("");
    const [detailList, setDetailList] = useState(props.details);

    function handleSubmit(input) {
        console.log("detail list before: " + detailList);
        setDetailList(prevList => [...prevList, input]);
        setInputDetail("");
    }

    useEffect(() => {
        console.log("detail list after: " + detailList);
        props.updateDetails(props.id, detailList);
    }, [detailList])

    return (
        <div className="details-content">
            <ul>
                {detailList.map((detail, index) => {
                    return <li key={index}>{detail}</li>
                })}
            </ul>
            <div className="add-details-content">
                <input 
                    type="text"
                    placeholder="add detail here"
                    onChange={e => setInputDetail(e.target.value)}
                    value={inputDetail}
                ></input>
                <button className="btn btn-secondary" onClick={e => {e.preventDefault(); handleSubmit(inputDetail);}}>+</button>
            </div>
        </div>
    )
}

export default Details;
import React, { useState, useEffect } from 'react';

function Details(props) {

    const [inputDetail, setInputDetail] = useState("");
    const [detailList, setDetailList] = useState(props.details);

    // update list with new detail inputted
    function handleSubmit(input) {
        setDetailList(prevList => [...prevList, input]);
        setInputDetail("");
    }

    // propogate up updated details list to be added to database
    useEffect(() => {
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
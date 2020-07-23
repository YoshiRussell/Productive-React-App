import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {

    console.log("render nav-bar component");

    const [linkMap, updateLinkMap] = useState([{linkId: "todo-tab", linkClassName: "nav-link", to: "/todolist", caption: "TODO LIST"}, 
                                               {linkId: "calendar-tab", linkClassName: "nav-link", to: "/calendar", caption: "CALENDAR"}]);

    // activate the tab that was clicked
    function activate(event) {
        const newLinkMap = linkMap.map(link => {
            let updateLinkClassName = link.linkId === event.target.id ? "nav-link active" : "nav-link";
            return {
                ...link,
                linkClassName: updateLinkClassName
            };
        })
        updateLinkMap(newLinkMap);
    }

    // create list of links to render depending on the state of the links
    const linkMapView = linkMap.map(link => {
        return <li key={link.linkId} className="nav-item"><Link id={link.linkId} className={link.linkClassName} to={link.to} onClick={e => activate(e)}>{link.caption}</Link></li>
    });
     
    return (
        <nav>
            <ul className="nav nav-tabs nav-fill">
                <li className="nav-item"><a className="nav-link disabled" tabIndex="-1" aria-disabled="true">{props.userName}</a></li>
                {linkMapView}
            </ul>
        </nav>
    )
}

export default Navbar
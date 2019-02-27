import React from 'react';

import './customBadges.scss';


export default function CustomBadges(props) {
    const {options} = props;
    const badge = (            
        <div className={props.action ? "customBadge" : "customBadge customBadge--noAction"}>
            <span 
                className={options.className ? options.className : 'badge badge-pill badge-primary'}
                onClick={props.action ? props.action : null}>
                {options.label}
            </span>
        </div>);

    return options.label ? badge : null; 
}
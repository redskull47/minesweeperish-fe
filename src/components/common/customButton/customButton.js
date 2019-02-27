import React from 'react';

import './customButton.scss';

export default function CustomButton(props) {
    const handleClick = (e) => {
        const { options } = props; 
        e.preventDefault();
        
        if (options.actionParameters)    {
            options.action(options.actionParameters);
        } else {
            options.action.method();
        }
    }

    const { options } = props; 
    const button = (
        <button 
            className={ options.className ? options.className : 'btn btn-primary' }
            onClick={ options.action ? handleClick : null }>
            {options.label}
        </button>
    );
    
    return options.label ? button : null;
}
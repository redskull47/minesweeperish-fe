import React, { Component } from 'react';

import './toolTip.scss';

export default class ToolTip extends Component {

    componentDidMount() {
        this.toolTip.focus();
    }

    render() {
        return (
            <div 
                ref={ (toolTip) => {this.toolTip = toolTip} } 
                className="toolTip" 
                tabIndex="-1" 
                onBlur={this.props.toggleToolTip}>
                <div className="toolTip__header text-right">
                    <i className="toolTip__close-icon fa fa-times" onClick={this.props.toggleToolTip}></i>
                </div>
                <div className="toolTip__body">
                    {this.props.text ? this.props.text : (<i className="fa fa-spinner fa-spin"></i>)}
                </div>
            </div>
        );
    }
}


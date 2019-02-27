import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ToolTip from '../toolTip/toolTip'
import CustomBadge from '../customBadges/customBadges';

import { fetchWikiData } from '../../../actions/wikiData';

import { WIKI_API_PARAMS } from '../../../common/constants'

import './wikiBadge.scss';

class WikiBadge extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showToolTip: false
        }
        this.searchQuery = '';
    }

    fetchData = () => {
        const { wikiData } = this.props;
        const { label, query } = this.props.options;
        this.searchQuery = query ? query : label;
        
        if (!wikiData || this.searchQuery !== wikiData[0]) {
            const xhrOptions = {
                [WIKI_API_PARAMS.SEARCH]: this.searchQuery
            }
            this.props.fetchWikiData(xhrOptions);
        }
        this.toggleToolTip();
    }

    toggleToolTip = () => {
        this.setState( prevState => {
            return {
                showToolTip: !prevState.showToolTip
            }
        } );
    }

    renderToolTip = (data) => {
        return (
            <ToolTip 
                text={data[2]}
                toggleToolTip={this.toggleToolTip} />
        );
    }

    render() {
        const { wikiData } = this.props;
        const badge = (
            <div className="wikiBadge">
                { this.state.showToolTip && wikiData && wikiData[0] === this.searchQuery ? this.renderToolTip(wikiData) : null }
                <CustomBadge {...this.props} {...this.state} action={this.fetchData} />
            </div>
        );

        return this.props.options.label ? badge : null;
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchWikiData
    }, dispatch)
}


function mapStateToProps(state) {
    const { wikiData } = state;

    return {
        wikiData
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WikiBadge);
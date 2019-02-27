import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { fetchMovies } from '../actions/movies';
import { API_PARAMS } from '../common/constants'


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            [API_PARAMS.SEARCH]: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        this.props.fetchMovies(this.state);
        e.preventDefault();
    }

    render() {
        return (
            <div className="searchBar row">
                <div className="col-12">
                    <form onSubmit={this.handleSubmit}>
                        <label>Enter movie title:</label>
                        <input
                            name={API_PARAMS.SEARCH}
                            type="text"
                            onChange={this.handleChange} />
                        <input type="submit" value="Seach"/>
                    </form>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchMovies
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar);
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setBoardConfig } from '../../actions/mineBoardActions';
import { BOARD_SETTINGS_PARAMS } from '../../common/constants';

class BoardConfigPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
          [BOARD_SETTINGS_PARAMS.WIDTH]: undefined,
          [BOARD_SETTINGS_PARAMS.HEIGHT]: undefined,
          [BOARD_SETTINGS_PARAMS.AMOUNT_OF_MINES]: undefined
        }
    }

    setBoardSettings = (e) => {
      e.preventDefault();
      this.props.setBoardConfig(this.state);
    };

    handleChange = (e) => {
      this.setState({
          [e.target.name]: e.target.value
      });
    }

    isMinefieldSizeDefined = () => {
        return this.state[BOARD_SETTINGS_PARAMS.WIDTH] && this.state[BOARD_SETTINGS_PARAMS.HEIGHT];
    }
    
    maximumMines = () => {
        return this.isMinefieldSizeDefined() ? Math.round((this.state[BOARD_SETTINGS_PARAMS.WIDTH] * this.state[BOARD_SETTINGS_PARAMS.HEIGHT]) / 3) : 0;
    }

    render() {
        return (
          <form onSubmit={this.setBoardSettings} className="mb-3">
            <div className="form-group">
                <p>Enter desirable minefield size.</p>
                <hr />

                <label>Width:</label>
                <input
                    className="form-control"
                    name={BOARD_SETTINGS_PARAMS.WIDTH}
                    type="text"
                    onChange={this.handleChange} />
            </div>

            <div className="form-group">
                <label>Height:</label>
                <input
                    className="form-control"
                    name={BOARD_SETTINGS_PARAMS.HEIGHT}
                    type="text"
                    onChange={this.handleChange} />
            </div>

            <div className="form-group">
                <label>Amount of mines:</label>
                <input
                    className="form-control"
                    name={BOARD_SETTINGS_PARAMS.AMOUNT_OF_MINES}
                    type="number"
                    max={this.maximumMines()}
                    disabled={!this.isMinefieldSizeDefined()}
                onChange={this.handleChange} />
            </div>
            <hr />
            <input className="btn btn-primary" type="submit" value="Set Minefield"/>
          </form>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setBoardConfig
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(BoardConfigPanel);
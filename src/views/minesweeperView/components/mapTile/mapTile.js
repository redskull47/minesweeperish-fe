import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { markMine, markAlternative, checkTile } from './redux/actions/mapTileActions';
import { TILE_FLAGS } from 'common/constants';
import './mapTile.scss';

class MapTile extends Component {
    isClickBlocked = (event) => {
        return this.props.isRevealed
        || this.props.isMapDestroyed
        || (event.button === 0 && event.altKey)
    }

    handleClick = (event) => {
        event.preventDefault();
        
        if (this.isClickBlocked(event)) {
            return
        };

        switch (event.button) {
            case 0:
                if (this.props.flag) return;
                this.props.checkTile(this.props.x, this.props.y);
            break;
            
            case 2:
                if (event.altKey) {
                    this.props.markAlternative(this.props.x, this.props.y);
                } else {
                    this.props.markMine(this.props.x, this.props.y);
                }
                break;

            default: return 0;
        }
    };

    getTileCSSClass = () => {
        const classes = ['minefield__mapTile'];
        if (this.props.isRevealed) {
            classes.push('revealed')
        }

        if (this.props.flag && this.props.flag === TILE_FLAGS.MARKED_MINE) {
            classes.push('flag')
        } else if (this.props.flag) {
            classes.push('unknown');
        }

        if (this.props.isTileWithMine && this.props.isMapDestroyed) {
            classes.push('mine');
        }

        if (this.props.isMapDestroyed) {
            classes.push('destroyed');
        }
        return classes.join(' ');
    }

    getTileIcon = () => {
        if (this.props.flag === TILE_FLAGS.MARKED_MINE) {
            return (<i className="fas fa-flag"></i>);
        } else if (this.props.flag === TILE_FLAGS.MARKED_UNKNOWN) {
            return (<i className="fas fa-question-circle"></i>)
        } else if (this.props.isTileWithMine && this.props.isMapDestroyed) {
            return (<i className="fas fa-radiation-alt"></i>)
        } else if (this.props.amountOfMinesInRange && this.props.isRevealed) {
            return (<div>{this.props.amountOfMinesInRange}</div>)
        }
    }

    render() {
        return (
            <div className={this.getTileCSSClass()} onClick={this.handleClick} onContextMenu={this.handleClick}>
                {this.getTileIcon()}
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        markMine,
        markAlternative,
        checkTile
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(MapTile);
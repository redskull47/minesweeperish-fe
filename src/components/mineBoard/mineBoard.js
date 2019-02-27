import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { TILE_SIZE, TILE_GAP } from '../../common/constants';
import MapTile from '../mapTile/mapTile';
import './mineBoard.scss';

class MineBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getMinefieldWidth = () => {
    return { 
      width: this.props.minefield.width * (TILE_SIZE + TILE_GAP),
      height: this.props.minefield.height * (TILE_SIZE + TILE_GAP)
    };
  }

  getMinefieldTiles = () => {
    const {map} = this.props.minefield;
    return _.map(_.flatten(map), (tile) => {
      const {coordX, coordY, isRevealed, flag, mine} = tile;
      return (
        <MapTile 
          x={coordX}
          y={coordY}
          flag={flag}
          isTileWithMine={mine}
          amountOfMinesInRange={tile.amountOfMinesInRange}
          isRevealed={isRevealed}
          isMapDestroyed={this.props.minefield.isMapDestroyed}
          key={`${coordY}-${coordX}`}
        />
      )}
    );
  }

  render() {
    const { minefield } = this.props;

    if (minefield && minefield.height && minefield.width) {
      return (
        <div className="mineBoard" style={this.getMinefieldWidth()}>
          {this.getMinefieldTiles()}
        </div>
      );
    } else {
      return (
        <div className="p-2">Mineboard size is not defined.</div>
      );
    }
  }
}

function mapStateToProps(state) {
  const { minefield } = state;

  return {
    minefield
  }
}

export default connect(mapStateToProps, null)(MineBoard);
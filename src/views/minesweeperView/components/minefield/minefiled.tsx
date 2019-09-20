import React, { useCallback, memo } from 'react';
import _ from 'lodash';

import { TILE_SIZE, TILE_GAP } from 'common/constants';
import MapTile from '../mapTile/mapTile';

import './minefield.scss';
import { IMap } from 'views/minesweeperView/redux/reducers/minefield';

interface IMinefieldProps {
  width: number;
  height: number;
  map: IMap;
  isMapDestroyed: boolean;
}

function Minefield(props: IMinefieldProps) {
  const { width, height, map, isMapDestroyed } = props;
  const getMinefieldWidth = useCallback(() => ({
    width: width * (TILE_SIZE + TILE_GAP),
    height: height * (TILE_SIZE + TILE_GAP),
  }), [map]);

  const getMinefieldTiles = useCallback(() => {
    return _.map(_.flatten(map), (tile) => {
      const { coordX, coordY, isRevealed, flag, mine } = tile;
      return (
        <MapTile
          x={coordX}
          y={coordY}
          flag={flag}
          isTileWithMine={mine}
          amountOfMinesInRange={tile.amountOfMinesInRange}
          isRevealed={isRevealed}
          isMapDestroyed={isMapDestroyed}
          key={`${coordY}-${coordX}`}
        />
      );
    });
  }, [map]);

  function renderMinefield() {
    if (height && width) {
      return (
        <div className='minefield' style={getMinefieldWidth()}>
          {getMinefieldTiles()}
        </div>
      );
    }

    return (
      <div className='p-2'>Minefield size is not defined.</div>
    );
  }

  return (renderMinefield());
}

export default memo(Minefield);

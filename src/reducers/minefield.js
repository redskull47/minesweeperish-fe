import {ActionTypes, TILE_FLAGS} from '../common/constants';
import _ from 'lodash';

const defaultState = {
  width: 0,
  height: 0,
  amountOfMines: 0,
  map: undefined,
  isMapFilledWithMines: false,
  isMapDestroyed: false,
  revealQueue: [],
};

export default function minefield(state = defaultState, action) {
  const newState = _.cloneDeep(state);

  function setFlag(flag, actionPayload) {
    const {coordX, coordY} = actionPayload;
    const tile = _.get(newState, `map[${coordY}][${coordX}]`);
    let flagToSet = '';
    if (tile.flag !== flag) {
      flagToSet = flag;
    }
    _.update(newState, `map[${coordY}][${coordX}]`, tile => _.set(tile, 'flag', flagToSet));
  }

  switch(action.type) {
    case ActionTypes.SET_BOARD_CONFIG: {
      const {height, width} = action.payload;
      return {
        ...newState,
        ...defaultState,
        width,
        height,
        amountOfMines: action.payload.amountOfMines
      }
    }

    case ActionTypes.SAVE_MAP: {
      return {
        ...newState,
        map: action.payload.map
      }
    }

    case ActionTypes.SAVE_MAP_WITH_MINES: {
      return {
        ...newState,
        map: action.payload.map,
        isMapFilledWithMines: true
      }
    }

    case ActionTypes.REVEAL_TILE: {
      const { coordX, coordY } = action.payload;
      _.update(newState, `map[${coordY}][${coordX}]`, tile => _.set(tile, 'isRevealed', true));
      return {
        ...newState
      }
    }

    case ActionTypes.QUEUE_TILES_TO_REVEAL: {
      return {
        ...newState,
        revealQueue: action.payload
      }
    }

    case ActionTypes.REVEAL_TILES_IN_QUEUE: {
      _.forEach(newState.revealQueue, tileInQueue => {
        _.update(newState, `map[${tileInQueue.coordY}][${tileInQueue.coordX}]`, tile => _.set(tile, 'isRevealed', true));
      });
      return {
        ...newState,
        revealQueue: []
      }
    }

    case ActionTypes.EXPLODE_MAP: {
      const { coordX, coordY } = action.payload;
      _.update(newState, `map[${coordY}][${coordX}]`, tile => _.set(tile, 'exploded', true));
      _.set(newState, 'isMapDestroyed', true);
      return {
        ...newState
      }
    }

    case ActionTypes.MARK_MINE: {
      setFlag(TILE_FLAGS.MARKED_MINE, action.payload);
      return {
        ...newState
      }
    }

    case ActionTypes.MARK_ALTERNATIVE: {
      setFlag(TILE_FLAGS.MARKED_UNKNOWN, action.payload);
      return {
        ...newState
      }
    }
      
    default:
      return {...newState};
  }
}
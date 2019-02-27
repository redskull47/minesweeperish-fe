import { ActionTypes } from '../common/constants';

export const setBoardConfig = ({width, height, amountOfMines}) => {
  return {
    type: ActionTypes.SET_BOARD_CONFIG,
    payload: { width, height, amountOfMines }
  }
}

export const saveMap = (map) => {
  return {
    type: ActionTypes.SAVE_MAP,
    payload: { map }
  }
}

export const saveMapWithMines = (map) => {
  return {
    type: ActionTypes.SAVE_MAP_WITH_MINES,
    payload: { map }
  }
}

export const revealTile = (x, y) => {
  return {
    type: ActionTypes.REVEAL_TILE,
    payload: { coordX: x, coordY: y }
  }
}

export const revealTilesInQueue = (tiles) => {
  return {
    type: ActionTypes.REVEAL_TILES_IN_QUEUE,
    payload: tiles
  }
}

export const queueTilesToReveal = (tiles) => {
  return {
    type: ActionTypes.QUEUE_TILES_TO_REVEAL,
    payload: tiles
  }
}

export const flagTileInQueueForSurroundingCheck = (x, y) => {
  return {
    type: ActionTypes.SET_FLAG_ON_TILE_IN_QUEUE,
    payload: { coordX: x, coordY: y }
  }
}

export const explodeMap = (x, y) => {
  return {
    type: ActionTypes.EXPLODE_MAP,
    payload: { coordX: x, coordY: y }
  }
}
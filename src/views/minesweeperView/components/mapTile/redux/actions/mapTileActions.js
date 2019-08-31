import { ActionTypes } from "common/constants";

export const checkTile = (coordX, coordY) => {
  return {
    type: ActionTypes.CHECK_TILE,
    payload: { coordX, coordY }
  }
}

export const markMine = (coordX, coordY) => {
  return {
    type: ActionTypes.MARK_MINE,
    payload: { coordX, coordY }
  }
}

export const markAlternative = (coordX, coordY) => {
  return {
    type: ActionTypes.MARK_ALTERNATIVE,
    payload: { coordX, coordY }
  }
}
import keyMirror from 'keymirror';

const ActionTypes = keyMirror({
  CHECK_TILE: null,
  MARK_MINE: null,
  MARK_ALTERNATIVE: null,
  SET_FIELD_CONFIG: null,
  SAVE_MAP: null,
  SAVE_MAP_WITH_MINES: null,
  REVEAL_TILE: null,
  REVEAL_TILES_IN_QUEUE: null,
  QUEUE_TILES_TO_REVEAL: null,
  SET_FLAG_ON_TILE: null,
  SET_FLAG_ON_TILE_IN_QUEUE: null,
  EXPLODE_MAP: null,
});

const TILE_FLAGS = {
  MARKED_MINE: 'MARKED_MINE',
  MARKED_UNKNOWN: 'MARKED_UNKNOWN',
};

const TILE_SIZE = 25;
const TILE_GAP = 2;

export { ActionTypes, TILE_FLAGS, TILE_SIZE, TILE_GAP };

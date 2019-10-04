import { takeLatest, put, select } from 'redux-saga/effects';
import _ from 'lodash';

import { ActionTypes } from '../common/constants';
import {
  saveMap,
  saveMapWithMines,
  revealTile as revealTileAction,
  revealTilesInQueue,
  explodeMap,
  queueTilesToReveal
} from '../actions/mineBoardActions';


const getMapFromState = state => state.minefield.map;
const isMapFilledWithMines = state => state.minefield.isMapFilledWithMines;
const getMapSettings = state => ({
  amountOfMines: state.minefield.amountOfMines,
  width: state.minefield.width,
  height: state.minefield.height
});

function getRandomCoordinate(maxValue) {
  return (Math.random() * (maxValue + 1)) << 0
}

function getRandomCoordinates(maxX, maxY) {
  return { coordX: getRandomCoordinate(maxX), coordY: getRandomCoordinate(maxY) };
}

function getElementFromMap(map, y, x) {
  if (map[y] && map[y][x]) {
    return map[y][x];
  } else {
    return undefined;
  }
}

function getSurroundingTiles(map, coordinates) {
  const { coordX, coordY } = coordinates;
  const surroundingCoords = [
    { y: coordY - 1, x: coordX - 1 },
    { y: coordY - 1, x: coordX },
    { y: coordY - 1, x: coordX + 1 },
    { y: coordY, x: coordX - 1 },
    { y: coordY, x: coordX + 1 },
    { y: coordY + 1, x: coordX - 1 },
    { y: coordY + 1, x: coordX },
    { y: coordY + 1, x: coordX + 1 },
  ];

  // const surroundingTiles = [
  //   getElementFromMap(map, (coordY - 1), (coordX - 1)),
  //   getElementFromMap(map, (coordY - 1), coordX),
  //   getElementFromMap(map, (coordY - 1), (coordX + 1)),
  //   getElementFromMap(map, coordY, (coordX - 1)),
  //   getElementFromMap(map, coordY, (coordX + 1)),
  //   getElementFromMap(map, (coordY + 1), (coordX - 1)),
  //   getElementFromMap(map, (coordY + 1), coordX),
  //   getElementFromMap(map, (coordY + 1), (coordX + 1))
  // ];
  const surroundingTiles = []; 

  for (const coords of surroundingCoords) {
    const element = getElementFromMap(map, coords.y, coords.x);
    if (element) {
      surroundingTiles.push(element);
    }
  }

  // return _.filter(surroundingTiles, tile => tile || false);
  return surroundingTiles;
}

function getSurroundingNonRevealedTiles(map, coordinates) {
  const surroundingTiles = getSurroundingTiles(map, coordinates);
  return _.filter(surroundingTiles, tile => !tile.isRevealed);
}

function getTileToSetFlag(queue, coords) {
  return _.find(queue, tile => tile.coordX === coords.coordX && tile.coordY === coords.coordY);
}

function* getSurroundingTilesToReveal(map, coordinates) {
  let coords = coordinates;
  let isScanningInProgress = true;
  let revealQueue = [];
  do {
    const surroundingTiles = getSurroundingNonRevealedTiles(map, coords);
    revealQueue = _.uniqWith([...surroundingTiles, ...revealQueue], (arrVal, othVal) => {
      return arrVal.coordX === othVal.coordX && arrVal.coordY === othVal.coordY;
    });

    const tileToSetFlag = getTileToSetFlag(revealQueue, coords);

    if (tileToSetFlag) {
      tileToSetFlag.isCheckedForSurrounding = true;

      revealQueue = _.unionWith(revealQueue, [tileToSetFlag], (arrVal, othVal) => {
        return arrVal.coordX === othVal.coordX && arrVal.coordY === othVal.coordY;
      });
    }
    const notCheckedElement = _.find(revealQueue, tile => !tile.isCheckedForSurrounding && !tile.amountOfMinesInRange);
    if (notCheckedElement) {
      coords = { coordX: notCheckedElement.coordX, coordY: notCheckedElement.coordY };
    } else {
      isScanningInProgress = false;
    }
  }
  while (isScanningInProgress)

  yield put(queueTilesToReveal(revealQueue));
  return true;
}

function getSurroundingTilesWithMines(map, coordinates) {
  const surroundingTiles = getSurroundingTiles(map, coordinates);
  return _.filter(surroundingTiles, tile => tile ? tile.mine : false);
}

function isTileAvailableForMine(map, coordinates) {
  const { coordX, coordY } = coordinates;
  if (map[coordY][coordX].mine || map[coordY][coordX].isRevealed) return false;

  const surroundingTilesWithMines = getSurroundingTilesWithMines(map, coordinates);

  return surroundingTilesWithMines.length <= 8;
}

function putMineOnMap(map, coordinates) {
  _.set(map[coordinates.coordY][coordinates.coordX], 'mine', true);
  return map;
}

function* setMinesOnMap() {
  let map = yield select(getMapFromState);
  const mapSettings = yield select(getMapSettings);
  for (let minesOnField = 0; minesOnField < mapSettings.amountOfMines; minesOnField++) {
    let potentialCoordinates;
    do {
      potentialCoordinates = getRandomCoordinates(mapSettings.width - 1, mapSettings.height - 1);
    }
    while (!isTileAvailableForMine(map, potentialCoordinates))
    map = putMineOnMap(map, potentialCoordinates);
  }

  return map;
}

function setProximityAlertsOnMap(map) {
  const mapWithProximityAlerts = _.cloneDeep(map);
  _.forEach(map, (mapRow) => _.forEach(mapRow, (tile) => {
    const { coordX, coordY } = tile;
    const surroundingTilesWithMines = getSurroundingTilesWithMines(map, { coordX: coordX, coordY: coordY });
    if (!mapWithProximityAlerts[coordY][coordX].isTileWithMine) {
      _.set(mapWithProximityAlerts[coordY][coordX], 'amountOfMinesInRange', surroundingTilesWithMines.length);
    }
  }));

  return mapWithProximityAlerts;
}

function generateMap(width, height) {
  const map = [];
  for (let y = 0; y < height; y++) {
    map.push([]);
    for (let x = 0; x < width; x++) {
      map[y].push({ coordX: x, coordY: y });
    };
  };
  return map;
}

function* getMap(action) {
  try {
    const map = generateMap(action.payload.width, action.payload.height);
    yield put(saveMap(map));
  } catch (error) {
    console.error(error);
  }
}

function* prepareMapWithMines() {
  const mapWithMines = yield setMinesOnMap();
  const mapWithMinesAndProximityAlerts = yield setProximityAlertsOnMap(mapWithMines);
  yield put(saveMapWithMines(mapWithMinesAndProximityAlerts));
}

function* checkTile(action) {
  const { coordX, coordY } = action.payload;
  const map = yield select(getMapFromState);
  try {
    if (!map[coordY][coordX].mine) {
      yield put(revealTileAction(coordX, coordY));
    } else {
      yield put(explodeMap(coordX, coordY));
    }
    const isMapWithMines = yield select(isMapFilledWithMines);
    if (!isMapWithMines) {
      yield prepareMapWithMines();
    }
  } catch (error) {
    console.error(error);
  }
}

function* revealTile(action) {
  const { coordX, coordY } = action.payload;
  const map = yield select(getMapFromState);

  if (map[coordY][coordX].amountOfMinesInRange === 0) {
    yield getSurroundingTilesToReveal(map, action.payload);
    yield put(revealTilesInQueue());
  }
}

export function* watchMinefield() {
  yield takeLatest(ActionTypes.SET_BOARD_CONFIG, getMap);
  yield takeLatest(ActionTypes.CHECK_TILE, checkTile);
  yield takeLatest(ActionTypes.REVEAL_TILE, revealTile);
}

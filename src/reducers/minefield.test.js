import _ from 'lodash';
import {
  setBoardConfig,
  saveMap,
  revealTile
  } from '../actions/mineBoardActions';
import minefield from './minefield';
import { markMine, markAlternative } from '../actions/mapTileActions';
import { TILE_FLAGS } from '../common/constants';

describe('Minefield reducer', () => {
  const initialState = {};

  const fakeAction = () => {
    return {
      type: 'FAKE_ACTION',
      payload: {
        fakeData: 'fakeData'
      }
    }
  };

  let state;
  beforeEach(() => {
    state = _.cloneDeep(initialState);
  });

  it('should set board config to the state, 5x5 + 10', () => {
    const params = {
      width: 5,
      height: 5,
      amountOfMines: 10
    }
    state = minefield(state, setBoardConfig(params));
    expect(state.width).toBeDefined();
    expect(state.height).toBeDefined();
    expect(state.amountOfMines).toBeDefined();
  });

  it('should save map to state', () => {
    const fakeMap = [
      [
        {x:0, y:0},
        {x:1, y:0}
      ],
      [
        {x:0, y:1},
        {x:1, y:1}
      ],
    ];
    state = minefield(state, saveMap(fakeMap))
    expect(state.map.length).toBe(2);
    expect(state.map[0][1].x).toBe(1);
  });

  describe('Minefield flags', () => {
    beforeEach(() => {
      const fakeMap = [
        [
          {x:0, y:0},
          {x:1, y:0}
        ],
        [
          {x:0, y:1},
          {x:1, y:1}
        ],
      ];

      state = minefield(state, saveMap(fakeMap))
    });

    it('should set isReavealed flag of proper tile', () => {
      state = minefield(state, revealTile(1, 1))
      expect(state.map[1][1].isRevealed).toBeTruthy();
      const flatMap = _.flatMap(state.map);
      expect(_.filter(flatMap, tile => tile.isRevealed).length).toBe(1);
    });

    it('should mark mine of proper tile', () => {
      state = minefield(state, markMine(1, 0))
      expect(state.map[0][1].flag).toBe(TILE_FLAGS.MARKED_MINE);
      const flatMap = _.flatMap(state.map);
      expect(_.filter(flatMap, tile => tile.flag).length).toBe(1);
    });

    it('should mark unknown of proper tile', () => {
      state = minefield(state, markAlternative(0, 1))
      expect(state.map[1][0].flag).toBe(TILE_FLAGS.MARKED_UNKNOWN);
      const flatMap = _.flatMap(state.map);
      expect(_.filter(flatMap, tile => tile.flag).length).toBe(1);
    });
  });

  it('should not change state for random actions', () => {
    state = minefield(state, fakeAction);
    expect(state).toEqual(initialState);
  });
});
const minefieldSelector = (state: any) => {
  return {
    width: state.minefield.width,
    height: state.minefield.height,
    map: state.minefield.map,
    isMapDestroyed: state.minefield.isMapDestroyed,
  };
};

export default minefieldSelector;

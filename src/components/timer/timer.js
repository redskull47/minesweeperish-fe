import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
// import { useMappedState } from 'redux-react-hook';

// const mapStatus = state => ({
//   isMapFilledWithMines: state.minefield.isMapFilledWithMines,
//   isMapDestroyed: state.minefield.isMapDestroyed
// });

var incrementer = 'alabanga';

function Timer({status}) {
  console.log('state', status);
  const [timerState, setTimer] = useState({timer: 0});
  // const status = useMappedState(
  //   useCallback(state => mapStatus(state), [])
  // );

  function startTimer() {
    incrementer = setInterval(() => {
      setTimer((state) => ({timer: state.timer + 1}));
    }, 1000);
  }

  function stopTimer(interval) {
    clearInterval(interval);
  }
  
  function resetTimer(interval) {
    console.log('aa', interval);
    clearInterval(interval);
    setTimer(() => ({timer: 0}));
  }

  useEffect(() => {
    if (status.isMapFilledWithMines && !status.isMapDestroyed) {
      startTimer();
    } else if (!status.isMapFilledWithMines && !status.isMapDestroyed) {
      stopTimer(incrementer);
    } else {
      console.log('KONIEC TEJ ZABAWY');
      resetTimer(incrementer);
    }
  }, [status.isMapFilledWithMines, status.isMapDestroyed]);

  return (
    <div>
      {timerState.timer}
    </div>
  );
};

const mapStateToProps = (state) => ({
  status: {
    isMapFilledWithMines: state.minefield.isMapFilledWithMines,
    isMapDestroyed: state.minefield.isMapDestroyed
  }
});

export default connect(mapStateToProps)(Timer);
import React from 'react';
import MineBoard from '../components/mineBoard/mineBoard';
import BoardConfigPanel from '../components/boardConfigPanel/boardConfigPanel';

export default function MinesweeperView(props) {
  return (
    <section className="minesweeperView">
      <div className="container">
        <BoardConfigPanel />        

        <MineBoard history={props.history} />
      </div>
    </section>
  );
}
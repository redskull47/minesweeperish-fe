import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NavBar from './components/navBar';
import MinesweeperView from './views/minesweeperView';

import logo from './logo.svg';
import './App.scss';

export default function App () {
  return (
    <div className="App">
      <header className="App-header text-center">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome</h1>
      </header>

      <NavBar />

      <Switch>
        <Route path="/minesweeper" component={MinesweeperView} />
      </Switch>
    </div>
  );
}

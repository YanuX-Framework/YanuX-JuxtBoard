import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//import logo from './logo.svg';
//import './App.css';

import Header from './components/Header'
import YanuX from './components/YanuX'
import Board from './components/Board'


function App() {
  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <img src={logo} className="App-logo" alt="logo" />
  //       <p>Edit <code>src/App.js</code> and save to reload.</p>
  //       <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
  //     </header>
  //   </div>
  // );
  return (
    <div className="App">
      <Header.NavigationBar />
      <YanuX.Coordinator>
        <Board.View />
      </YanuX.Coordinator>
    </div>
  );
}


export default App;

import React from 'react';
import './bootstrap-studio/bootstrap.min.css';
import './bootstrap-studio/fonts/font-awesome.min.css';
import './bootstrap-studio/overall.css';
import "video-react/dist/video-react.css"; 
//import logo from './logo.svg';
//import './App.css';

import Header from './components/Header'
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
    <div className="App" id="page-top">
      <Header.NavigationBar />
        <Board.View />
    </div>
  );
}


export default App;

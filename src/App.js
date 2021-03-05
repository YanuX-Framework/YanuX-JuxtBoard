import React from 'react';

//TODO: Replace the version of Bootstrap that came with bootstrap-studio with some other custom Bootstrap 4.5.x/5.x.y build that has a similar effect.
import './bootstrap-studio/bootstrap.min.css';
//TODO: FontAwesome also needs proper install.
import './bootstrap-studio/fonts/font-awesome.min.css';
import './bootstrap-studio/overall.css';

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

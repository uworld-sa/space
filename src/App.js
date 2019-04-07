import React, { Component } from 'react';
import './App.css';
import Game from './components/Game.js'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Game></Game>
        <div className = "footer" >
          Created by <a href = "https://github.com/uworld-sa/space" target = "_blank" rel = "noopener noreferrer" > Sergey Temnenko </a>
        </div>
      </div>
    );
  }
}

export default App;

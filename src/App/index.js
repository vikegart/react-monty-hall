import React, { Component } from 'react';
import s from './App.css';

import Header from './../Header';
import MontyHallGame from './../MontyHallGame';

class App extends Component {
  render() {
    return (
      <div className={s.wrapper}>
        <Header
          title="Битва за 🍕, спасибо Мотни Холлу"
        />
        
        <div className={s.intro}>
          <MontyHallGame />
        </div>

      </div>
    );
  }
}

export default App;

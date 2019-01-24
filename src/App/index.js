import React, { Component } from 'react';
import s from './App.css';

import Header from './../Header';
import MontyHallGame from './../MontyHallGame';

class App extends Component {
  constructor() {
    super();
    this.state = {
      controls1: {
        first: 'Digit1',
        second: 'Digit2',
        third: 'Digit3',
      },
      controls2: {
        first: 'Numpad1',
        second: 'Numpad2',
        third: 'Numpad3',
      },
    };
  }

  render() {
    const { controls1, controls2 } = this.state;
    return (
      <div className={s.wrapper}>
        <Header
          title="Битва за 🍕, спасибо Мотни Холлу"
        />
        
        <div className={s.intro}>
          <MontyHallGame controls={controls1}/>
          <MontyHallGame controls={controls2}/>
        </div>

      </div>
    );
  }
}

export default App;

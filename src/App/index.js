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
      isHorizontalMode: false,
    };
  }

  handleKeyDown(e) {
    const { code } = e;

    switch (code) {
      case 'Digit9':
        this.setState({isHorizontalMode: true});
        break;
      case 'Digit0':
      this.setState({isHorizontalMode: true});
        break;
      default:
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
  }

  render() {
    const { controls1, controls2 } = this.state;
    return (
      <div className={s.wrapper}>
        <Header
          title="Битва за 🍕, спасибо Мотни Холлу"
        />
        <div className={s.container_vertical}>
          <div className={s.intro}>
            <MontyHallGame controls={controls1} />
          </div>
          <div className={s.intro}>
            <MontyHallGame controls={controls2} />
          </div>
        </div>
      </div>

    );
  }
}

export default App;

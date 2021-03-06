import React, { Component } from 'react';
import s from './MontyHallGame.css';

import DoorGroup from './DoorGroup';
import WinLoseList from './WinLoseList';
import Button from '../Button';
import arrayWithNext from './winnerDoors';

class MontyHallGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      played_games: 0,
      turn: 0,
      selected_door: null,
      opened_door: null,
      switch_door: null,
      winning_door: 2,
      action: null,
      results: {
        stayed: {
          wins: 0,
          losses: 0
        },
        switched: {
          wins: 0,
          losses: 0
        }
      }
    }
    console.log('Победная дверь = 3');
  }

  remove_from_array = (array, element) => {
    const index = array.indexOf(element);

    if (index !== -1) { array.splice(index, 1); }
  }

  get_door_roles = (selected_door) => {
    let opened_door = [0, 1, 2],
      switch_door = [0, 1, 2];

    const winning_door = this.state.winning_door;

    this.remove_from_array(opened_door, selected_door);
    this.remove_from_array(opened_door, winning_door);
    opened_door = opened_door[Math.floor(Math.random() * opened_door.length)];

    this.remove_from_array(switch_door, selected_door);
    this.remove_from_array(switch_door, opened_door);
    switch_door = switch_door[0];

    return {
      opened: opened_door,
      switch: switch_door
    }
  }

  select_door = (i) => {
    if (this.state.turn === 0) {
      const roles = this.get_door_roles(i);
      const opened_door = roles.opened;
      const switch_door = roles.switch;
        console.log({
          open: opened_door,
          switch: switch_door,
        });

      this.setState({
        turn: 1,
        selected_door: i,
        opened_door: opened_door,
        switch_door: switch_door
      });
    }
  }

  stay_or_switch = (action) => {
    if (this.state.turn === 1) {
      let results = this.state.results;
      const did_switch = (action === "switch") ? true : false,
        final_door = (did_switch) ? this.state.switch_door : this.state.selected_door,
        did_win = (this.state.winning_door === final_door);

      if (did_switch) {
        (did_win) ? results.switched.wins++ : results.switched.losses++
      } else {
        (did_win) ? results.stayed.wins++ : results.stayed.losses++
      }

      this.setState({
        selected_door: final_door,
        turn: 2,
        results: results
      });
    }
  }

  restart_game = () => {
    if (this.state.turn === 2) {
      this.setState({
        played_games: this.state.played_games + 1,
        turn: 0,
        selected_door: null,
        opened_door: null,
        switch_door: null,
        // winning_door: arrayWithNext.next(),
        winning_door: Math.floor(Math.random() * 3),
        action: null,
      }, () => { console.log(`Победная дверь = ${this.state.winning_door + 1}`) });
    }
  }

  show_game_buttons = () => {
    if (this.state.turn === 1) {
      return (
        <div className={s.buttons}>
          <Button
            text="Оставить дверь"
            click_event={() => this.stay_or_switch("stay")}
          />
          <Button
            secondary
            text="Выбрать другую"
            click_event={() => this.stay_or_switch("switch")}
          />
        </div>
      );
    } else if (this.state.turn === 2) {
      return (
        <div className={s.buttons}>
          <Button
            text="Проиграть еще разок"
            click_event={this.restart_game}
          />
        </div>
      );
    }

    return <div style={{height: 53 + 24 + 'px'}}></div>;
  }

  handle_key = (event) => {
    console.log('asd');
    console.log(event.key);
  }

  intro_text = () => {
    let text;
    const { turn, selected_door, winning_door } = this.state,
      ending_text = (selected_door === winning_door) ? "Поздровляю, ты ВЫИГРАЛ" : "Извини, но ты проиграл, а значит парниша, сидящий рядом - выиграл)";


    if (turn === 0) {
      text = [
        `Выбери дверь, за которой, возможно будет лежать приз ^^. Игр сыграно = ${this.state.played_games}`,
      ];
    } else if (turn === 1) {
      text = [
        `Выбор сделан, теперь ведущий открывает пустую дверь. Поменяшь ли ты свой выбор?`
      ];
    } else if (turn === 2) {
      text = [
        ending_text,
      ];
    }

    return text.map((p, i) => <p key={i}>{p}</p>);
  }

  handleKeyDown(e, controls) {
    const { code } = e;

    switch (code) {
      case controls.first:
        this.select_door(0);
        break;
      case controls.second:
        this.select_door(1);
        break;
      case controls.third:
        this.select_door(2);
        break;
      default:
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', (e) => this.handleKeyDown(e, this.props.controls));
  }

  render() {
    return (
      <div>
        <div className={s.text}>
          {this.intro_text()}
        </div>

        {this.show_game_buttons()}

        <DoorGroup
          selected_door={this.state.selected_door}
          winning_door={this.state.winning_door}
          opened_door={this.state.opened_door}
          turn={this.state.turn}
          click_event={this.select_door}
        />

        <div className={s.tallies}>
          <WinLoseList
            label="Stayed"
            data={this.state.results.stayed}
          />
          <WinLoseList
            label="Switched"
            data={this.state.results.switched}
          />
        </div>
      </div>
    )
  }
}

export default MontyHallGame;

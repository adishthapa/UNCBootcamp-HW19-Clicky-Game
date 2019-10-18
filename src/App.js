import React, { Component } from "react";
import "./App.css";
import colors from "./colors.json";

class App extends Component {
  state = {
    score: 0,
    topScore: 0,
    colors: colors,
    guessedColors: [],
    message: <h5>Click an image to begin!</h5>
  };

  shuffleArrays = arr => {
    for (let i = arr.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
    return arr;
  };

  shuffleColors = () => {
    this.setState({ colors: this.shuffleArrays(this.state.colors) });
  };

  handleClick = event => {
    event.preventDefault();
    const name = event.target.value;
    if (this.state.guessedColors.includes(name)) {
      this.setState({
        score: 0,
        guessedColors: [],
        message: <h5>You guessed incorrectly!</h5>
      });
    } else {
      this.setState({
        score: this.state.score + 1,
        guessedColors: this.state.guessedColors.concat(name),
        message: <h5>You guessed correctly!</h5>
      });
      if (this.state.score === this.state.topScore) {
        this.setState({
          topScore: this.state.topScore + 1
        });
      }
      this.shuffleColors();
    }
  };

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row text-center pt-4 pb-2" id="directions">
            <div className="col-12">
              <h1>Clicky Game!</h1>
              <p className="lead">
                Click on a color to earn points, but don't click on any more
                than once!
              </p>
            </div>
          </div>
          <div className="row text-center pt-3" id="scores">
            <div className="col-2"></div>
            <div className="col-3">
              <h4>Score: {this.state.score}</h4>
            </div>
            <div className="col-2"></div>
            <div className="col-3">
              <h4>Top Score: {this.state.topScore}</h4>
            </div>
            <div className="col-2"></div>
            <div className="col-12">{this.state.message}</div>
          </div>
          <div className="row">
            {this.state.colors.map(color => {
              return (
                <div className="col-3 p-3" key={color.name}>
                  <input
                    type="image"
                    src={color.image}
                    alt={color.name}
                    value={color.name}
                    className="img-fluid colorImg"
                    onClick={this.handleClick}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

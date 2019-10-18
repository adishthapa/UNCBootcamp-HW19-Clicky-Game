import React, { Component } from "react";
import { bounce, flash, shake } from "react-animations";
import Radium, { StyleRoot } from "radium";
import "./App.css";
import colors from "./colors.json";

const styles = {
  bounce: {
    animation: "x 1s",
    animationName: Radium.keyframes(bounce, "bounce")
  },
  flashRed: {
    animation: "x 1s",
    color: "red",
    animationName: Radium.keyframes(flash, "flashRed")
  },
  flashGreen1: {
    animation: "x 1s",
    color: "green",
    animationName: Radium.keyframes(flash, "flashGreen1")
  },
  flashGreen2: {
    animation: "x 1s",
    color: "green",
    animationName: Radium.keyframes(flash, "flashGreen2")
  },
  shake: {
    animation: "x .75s",
    animationName: Radium.keyframes(shake, "shake")
  }
};

class App extends Component {
  state = {
    score: 0,
    topScore: 0,
    colors: colors,
    guessedColors: [],
    message: <h5>Click an image to begin!</h5>,
    messageColor: "",
    containerStyle: null
  };

  componentDidMount = () => {
    try {
      if (localStorage.getItem("topScore")) {
        this.setState({ topScore: Number(localStorage.getItem("topScore")) });
      }
      return true;
    } catch (e) {
      this.setState({ topScore: 0 });
      return false;
    }
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
        message: <h5 style={styles.flashRed}>You guessed incorrectly!</h5>,
        containerStyle: styles.shake
      });
    } else {
      this.setState({
        score: this.state.score + 1,
        guessedColors: this.state.guessedColors.concat(name),
        containerStyle: null
      });
      this.shuffleColors();
      if (this.state.messageColor === "green1") {
        this.setState({
          message: <h5 style={styles.flashGreen2}>You guessed correctly!</h5>,
          messageColor: "green2"
        });
      } else {
        this.setState({
          message: <h5 style={styles.flashGreen1}>You guessed correctly!</h5>,
          messageColor: "green1"
        });
      }
      if (this.state.score >= this.state.topScore) {
        this.setState({
          topScore: this.state.topScore + 1
        });
        try {
          localStorage.setItem("topScore", this.state.topScore + 1);
          return true;
        } catch (e) {
          return false;
        }
      }
    }
  };

  render() {
    return (
      <StyleRoot>
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
          <div className="row text-center py-3" id="scores">
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
          <div className="row" style={this.state.containerStyle}>
            {this.state.colors.map(color => {
              return (
                <div className="col-4 col-md-3 text-center" key={color.name}>
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
      </StyleRoot>
    );
  }
}

export default App;

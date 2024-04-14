import React from "react";
import matadorImage from "../images/matador.png";
import applause01 from "../assets/applause01.wav";
import applause02 from "../assets/applause02.wav";
import applause03 from "../assets/applause03.wav";
import applause04 from "../assets/applause04.wav";

interface MatadorProps {
    matadorPosition: number;
    setMatarodPosition: (newPosition: number) => void;  
    applause: number;
}

export class OldMatador extends React.Component<MatadorProps> {

  componentDidMount() {
    document.addEventListener("bullRun", this.handleBullRun);
  }

  componentWillUnmount() {
    document.removeEventListener("bullRun", this.handleBullRun);
  }

  handleBullRun = (event: any) => {
    const currentBullPosition = event.detail.position;

    if (currentBullPosition === this.props.matadorPosition) {
      let randomPosition;
      do {
        randomPosition = Math.floor(Math.random() * 9);
      } while (randomPosition === this.props.matadorPosition);

      this.props.setMatarodPosition(randomPosition);
      console.log(`Matador is moving from ${currentBullPosition} to ${randomPosition}`);
    }
  };

  componentDidUpdate(prevProps: MatadorProps) {
    if (prevProps.applause !== this.props.applause) {
      let applause;
      switch (this.props.applause) {
        case 1:
          applause = applause01;
          break;
        case 2:
          applause = applause02;
          break;
        case 3:
          applause = applause03;
          break;
        case 4:
          applause = applause04;
          break;
        default:
          applause = null;
      }
      
      if (applause) {
        const audio = new Audio(applause);
        audio.play();
      }
    }
  }

  shouldComponentUpdate(nextProps: MatadorProps) {
    return this.props.applause === 3 && nextProps.applause !== 3;
  }

  render() {
    return (
        <div>
            <img src={matadorImage} alt="matador" className="matador" />
        </div>
    )
  }
}

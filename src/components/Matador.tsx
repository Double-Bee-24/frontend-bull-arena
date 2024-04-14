import React from "react";
import matadorImage from "../images/matador.png";
import applause01 from "../assets/applause01.wav";
import applause02 from "../assets/applause02.wav";
import applause03 from "../assets/applause03.wav";
import applause04 from "../assets/applause04.wav";

export const Matador = React.memo((props: {
  applause: number;
  matadorPosition: number;
  setMatarodPosition: (newPosition: number) => void;  
}) => {

  React.useEffect(function(){
    const handleBullRun = (event: any) => {
      const currentBullPosition = event.detail.position;

      if (currentBullPosition === props.matadorPosition) {
        let randomPosition;
        do {
          randomPosition = Math.floor(Math.random() * 9);
        } while (randomPosition === props.matadorPosition);
    
        props.setMatarodPosition(randomPosition);
        console.log(`Matador is moving from ${currentBullPosition} to ${randomPosition}`)
      }
    };

    document.addEventListener("bullRun", handleBullRun);

    return () => {
      document.removeEventListener("bullRun", handleBullRun);
    };
  },[]);

  React.useEffect(function(){
    let applause;
    switch (props.applause) {
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
  },[props.applause]);

  return (
    <div>
      <img src={matadorImage} alt="matador" className="matador" />
    </div>
  );
}, (prevProps, nextProps) => {
  return prevProps.applause === 3 && nextProps.applause !== 3;
});
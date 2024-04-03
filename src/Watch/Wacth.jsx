import React, { useState, useEffect } from "react";
import "./style.css";
import DigitalClock from "./DigitalClock";

const Mark = ({ angle, type }) => {
  return (
    <div
      className={`clock__face-mark clock__face-mark--${type}`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div
        style={{
          width: "5px",
          height: type === "hour" ? "15px" : "6px",
          backgroundColor: type === "hour" ? "black" : "gray",
          borderRadius: "3px",
        }}
      ></div>
    </div>
  );
};

const Hand = ({ type, angle }) => {
  let handColor = "black";
  let handSize = "4px"; 
  let handWidth = "2px";
  
  if (type === "hour") {
    handColor = "black";
    handSize = "30%";
    handWidth = "6px";
  } else if (type === "minute") {
    handColor = "back";
    handSize = "20%";
    handWidth = "4px";
  } else if (type === "second") {
    handColor = "red";
    handSize = "12%";
    handWidth = "2px";
  }
  return (
    <div
      className={`clock__hand clock__hand--${type}`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      <div
        className="clock__hand-body"
        style={{ backgroundColor: handColor, top: handSize, width: handWidth }}
      ></div>
    </div>
  );
};

function Watch() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hour = currentTime.getHours() % 12;
  const minute = currentTime.getMinutes();
  const second = currentTime.getSeconds();

  const hourAngle = hour * 30 + 0.5 * minute; // 30 degrees per hour, 0.5 degrees per minute
  const minuteAngle = minute * 6 + 0.1 * second; // 6 degrees per minute, 0.1 degrees per second
  const secondAngle = second * 6; // 6 degrees per second

  return (
    <div className="container">
      <h1>CLOCK</h1>
      <div className="clock">
        <div className="clock-face">
          {Array.from({ length: 60 }, (_, index) => (
            <Mark
              key={index}
              angle={index * 6}
              type={index % 5 === 0 ? "hour" : "minute"}
            />
          ))}
        </div>
        <Hand type="hour" angle={hourAngle} />
        <Hand type="minute" angle={minuteAngle} />
        <Hand type="second" angle={secondAngle} />
      </div>
      <div className="digitalClock">
        <DigitalClock />
      </div>
    </div>
  );
}

export default Watch;

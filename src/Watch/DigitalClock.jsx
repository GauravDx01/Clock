import React, { useState, useEffect } from 'react';
import './style.css';

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Function to format time as HH:MM:SS  
  const formatTime = (time) => {
    let hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const seconds = time.getSeconds().toString().padStart(2, '0');
    if(hours>12){
     
      hours = `0${hours-12}`
    }
    return `${hours}:${minutes}:${seconds}`;
  
  };
  let hours = time.getHours().toString().padStart(2, '0');
  return (
    <div className="digital-clock">
      <h2>{formatTime(time)}
      
      {hours>12?" PM" : " AM"}
      
      </h2>
      
    </div>
  );
}

export default DigitalClock;

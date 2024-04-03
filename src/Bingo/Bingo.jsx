import React, { useState } from 'react';
import './style.css'
const generateRandomNumbers = () => {
  const numbers = [];
  while (numbers.length < 25) {
    const randomNumber = Math.floor(Math.random() * 25) + 1;
    if (!numbers.includes(randomNumber)) {
      numbers.push(randomNumber);
    }
  }
  return numbers;
};


const BingoGrid = () => {
  const randomNumbers = generateRandomNumbers();

  return (
    <div className="bingo-grid">
      {randomNumbers.map((number, index) => (
        <div key={index} className="bingo-cell">
          {number}
        </div>
      ))}
    </div>
  );
};

const Bingo = () => {

  // state of random no

const [turnNo , setTurnNo] = useState(null)



const turnCutNo = ()=>{
  const turnRandomNumber = Math.floor(Math.random() * 25) + 1;
  setTurnNo(turnRandomNumber)
}
  return (
    <div className="bingo">
      <h1>Bingo Grid</h1>
      <div className="bingo-container">
        <BingoGrid />
        <BingoGrid />
        <p onClick={turnCutNo}>Generate random no : {turnNo}</p>
      </div>
   
    </div>
  );
};

export default Bingo;

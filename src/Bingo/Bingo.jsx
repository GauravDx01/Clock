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
  const [playerOneTurn, setPlayerOneTurn] = useState('');
  const [playerTwoTurn, setPlayerTwoTurn] = useState('');
  const [randomNumbers] = useState(generateRandomNumbers());

  const cutNo = () => {
    if (randomNumbers.includes(Number(playerOneTurn))) {
      alert('Jai ho');
    }
  };

  console.log(randomNumbers);
  console.log(playerOneTurn);
  



  return (
    <div className="bingo">
      <h1>Bingo Grid</h1>
      <div className="bingo-container">
        <div>
        <h1>Player 1</h1>
        <BingoGrid />

        </div>
        
        <div>
        <h1>Player 1</h1>
        <BingoGrid />
        </div>
        
        
      </div>
      <div className="turns">
          <label htmlFor="">Player 1's turn</label>
          <input type="text" className="turn1" value={playerOneTurn } onChange={(e)=>setPlayerOneTurn(e.target.value)}/>
          <button onClick={cutNo}>Done</button>
        </div>
    </div>
  );
};

export default Bingo;

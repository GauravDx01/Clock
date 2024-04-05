
import React, { useState, useEffect } from 'react';
import './style.css';

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

const BingoGrid = ({ randomNumbers }) => {
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
  const [currentTurn, setCurrentTurn] = useState('player1');
  const [inputValue, setInputValue] = useState('');
  const [randomNumbersPlayerOne, setRandomPlayerOne] = useState(generateRandomNumbers());
  const [randomNumbersPlayerTwo, setRandomPlayerTwo] = useState(generateRandomNumbers());
  const [playerOneLines, setPlayerOneLines] = useState(0); // Number of lines completed by Player 1
  const [playerTwoLines, setPlayerTwoLines] = useState(0); // Number of lines completed by Player 2
  const [playerOneEmoji, setPlayerOneEmoji] = useState('B I N G O');
  const [playerTwoEmoji, setPlayerTwoEmoji] = useState('B I N G O');
  const [winnerDeclared, setWinnerDeclared] = useState(false); // Track if a winner has been declared

  useEffect(() => {
    if (!winnerDeclared && checkWinner(randomNumbersPlayerOne, playerOneLines, setPlayerOneLines, setPlayerOneEmoji)) {
      alert("Player 1 wins!");
      setWinnerDeclared(true); 
      window.location.reload()
    }
    if (!winnerDeclared && checkWinner(randomNumbersPlayerTwo, playerTwoLines, setPlayerTwoLines, setPlayerTwoEmoji)) {
      alert("Player 2 wins!");
      setWinnerDeclared(true); 
      window.location.reload()
    }
  }, [randomNumbersPlayerOne, randomNumbersPlayerTwo, playerOneLines, playerTwoLines, winnerDeclared]);

  const cutNo = () => {
    const enteredNumber = Number(inputValue);
    if (!enteredNumber) {
      alert("Please enter a valid number.");
      return;
    }

    const updatedPlayerOneNumbers = randomNumbersPlayerOne.map(num =>
      num === enteredNumber ? '❌' : num
    );
    const updatedPlayerTwoNumbers = randomNumbersPlayerTwo.map(num =>
      num === enteredNumber ? '❌' : num
    );
    setRandomPlayerOne(updatedPlayerOneNumbers);
    setRandomPlayerTwo(updatedPlayerTwoNumbers);

    setCurrentTurn(currentTurn === 'player1' ? 'player2' : 'player1');
    setInputValue('');
  };

  const checkWinner = (randomNumbers, playerLines, setPlayerLines, setPlayerEmoji) => {
    // Define the function to check if a line is marked
    const isBingo = (line) => {
      let count = 0;
      line.forEach((index) => {
        if (randomNumbers[index] === '❌') {
          count++;
        }
      });
      return count === 5;
    };
  
    let linesMarked = 0; // Counter to track the number of lines marked
  
    // Define rows, columns, and diagonals
    const rows = [[0, 1, 2, 3, 4], [5, 6, 7, 8, 9], [10, 11, 12, 13, 14], [15, 16, 17, 18, 19], [20, 21, 22, 23, 24]];
    const columns = [[0, 5, 10, 15, 20], [1, 6, 11, 16, 21], [2, 7, 12, 17, 22], [3, 8, 13, 18, 23], [4, 9, 14, 19, 24]];
    const diagonals = [[0, 6, 12, 18, 24], [4, 8, 12, 16, 20]];
  
    // Check rows, columns, and diagonals for marked lines
    for (let i = 0; i < rows.length; i++) {
      if (isBingo(rows[i])) {
        linesMarked++;
      }
      if (isBingo(columns[i])) {
        linesMarked++;
      }
      if (i < diagonals.length && isBingo(diagonals[i])) {
        linesMarked++;
      }
    }
  
    // Define emojis for each stage of completion
    const emojis = ['✔️', '✔️✔️', '✔️✔️✔️', '✔️✔️✔️✔️', '✔️✔️✔️✔️✔️'];
  
    // Update the emoji for the player whose lines are marked
    if (linesMarked > playerLines) {
      if(linesMarked===1 && playerLines===0){
        setPlayerLines(linesMarked);
        setPlayerEmoji(emojis[linesMarked - 1] + ' I N G O');
        
      }
      if(linesMarked===2 && playerLines===1){
        setPlayerLines(linesMarked);
        setPlayerEmoji(emojis[linesMarked - 1] + '  N G O');
        
      }
      if(linesMarked===3 && playerLines===2){
        setPlayerLines(linesMarked);
        setPlayerEmoji(emojis[linesMarked - 1] + 'G O');
        
      }
      if(linesMarked===4 && playerLines===3){
        setPlayerLines(linesMarked);
        setPlayerEmoji(emojis[linesMarked - 1] + 'O');
        
      }
      if(linesMarked===5 && playerLines===4){
        setPlayerLines(linesMarked);
        setPlayerEmoji(emojis[linesMarked - 1] + '');
        
      }
      
    }
  
    // Check if any player has marked 5 lines
    if (linesMarked >= 5) {
      return true; // Declare the winner
    }
  
    return false; // No winner yet
  };

  return (
    <div className="bingo">
      <h1>Bingo Grid</h1>
      <div className="bingo-container">
        <div>
          <h1>Player 1</h1>
          <span className='bingoName'>{playerOneEmoji}</span>
          
          <BingoGrid randomNumbers={randomNumbersPlayerOne} />
          
        </div>
        <div>
          <h1>Player 2</h1>
          <span className='bingoName'>{playerTwoEmoji}</span>
          
          <BingoGrid randomNumbers={randomNumbersPlayerTwo} />
        </div>
      </div>
      <div className="turns">
        <label htmlFor="">Current Turn: {currentTurn.toUpperCase()}</label>
        <input
          type="text"
          className="turn"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={cutNo}>Done</button>
      </div>
      
    </div>
  );
};

export default Bingo;


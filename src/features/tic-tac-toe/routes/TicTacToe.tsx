import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '../components/Box';
import './TicTacToe.scss';

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setIsXPlaying] = useState(true);
  const [winner, setWinner] = useState<null | string>(null);

  const determineWinner = (board: string[]) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    // using the predetermined winningCombinations 2d array, check when all 3 match the same value
    // return the value of the winner (x or o)
    for (const [x, y, z] of winningCombinations) {
      if ([board[x], board[y], board[z]].every((cell) => cell === board[x])) {
        return board[x];
      }
    }
  
    // no winner yet
    return null;
  }

  const handleClick = (selectedBoxIndex: number) => {
    const playerMark = xIsPlaying ? 'X' : 'O';
    const updatedBoard = board.map((boxValue, boxIndex) =>
      boxIndex === selectedBoxIndex ? playerMark : boxValue
    );

    // update the board and who is next
    setIsXPlaying(!xIsPlaying)
    setBoard(updatedBoard);

    // check if we have a winner
    const winnerStatus = determineWinner(updatedBoard);
    if (winnerStatus) {
      setWinner(winnerStatus);
    }
  }

  const renderGameStatus = () => {
    if (winner) {
      return <span>{ winner === 'X' ? 'Player 1 (X)' : 'Player 2 (O)' } is the WINNER</span>
    }

    if (!board.includes(null)) {
      return <span>Draw</span>;
    }
    
    return <span>{ xIsPlaying ? 'Player 1 (X)' : 'Player 2 (O)' } is up</span>;
  }

  const resetGame = () => {
    setIsXPlaying(true);
    setBoard(Array(9).fill(null));
    setWinner(null);
  }

  return (
    <>
      <h1>Tic-Tac-Toe</h1>
      <div className="game-info">
        <div className="game-status">
          { renderGameStatus() }
        </div>
        <div className="reset-game">
          <Button
            variant="text"
            size="small"
            onClick={ resetGame }
          >
            Reset Game
          </Button>
        </div>
      </div>
      <div className={ "game-board" + (winner ? " freeze-board" : "") }>
        {
          board.map((boxValue, boxIndex) => {
            return (
              <Box
                key={ boxIndex }
                disabled={ boxValue !== null }
                onClick={() => handleClick(boxIndex)}
              >
                { boxValue }
              </Box>
            )
          })
        }
      </div>
    </>
  );
};
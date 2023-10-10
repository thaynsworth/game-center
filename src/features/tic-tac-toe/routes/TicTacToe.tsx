import { useState } from 'react';
import Button from '@mui/material/Button';
import { Box } from '../components/Box';
import './TicTacToe.scss';

type Winner = {
  value: string | null,
  winningCombination: number[] | null,
}

export const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsPlaying, setIsXPlaying] = useState(true);
  const [winner, setWinner] = useState<Winner>({ value: null, winningCombination: null });

  const determineWinner = (board: string[]): Winner => {
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
    for (const [x, y, z] of winningCombinations) {
      // before comparing each index, ensure the initial value is not null. i'm using x but you could use any (x, y, z)
      if (board[x] && [board[x], board[y], board[z]].every((cell) => cell === board[x])) {
        // return the value of the winning combination (x or o) and the winningCombination
        return {
          value: board[x],
          winningCombination: [x, y, z]
        };
      }
    }
  
    // no winner yet
    return {
      value: null,
      winningCombination: null,
    };
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
    const winner = determineWinner(updatedBoard);
    if (winner.value) {
      setWinner({
        value: winner.value,
        winningCombination: winner.winningCombination,
      });
    }
  }

  const renderGameStatus = () => {
    if (winner.value) {
      return <span>{ winner.value === 'X' ? 'Player 1 (X)' : 'Player 2 (O)' } is the WINNER</span>
    }

    if (!board.includes(null)) {
      return <span>Draw</span>;
    }
    
    return <span>{ xIsPlaying ? 'Player 1 (X)' : 'Player 2 (O)' } is up</span>;
  }

  const resetGame = () => {
    setIsXPlaying(true);
    setBoard(Array(9).fill(null));
    setWinner({ value: null, winningCombination: null });
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
      <div className={ "game-board" + (winner.value ? " freeze-board" : "") }>
        {
          board.map((boxValue, boxIndex) => {
            return (
              <Box
                key={ boxIndex }
                isDisabled={ boxValue !== null }
                isActive={
                  winner.winningCombination != null
                  && winner.winningCombination.includes(boxIndex)
                }
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
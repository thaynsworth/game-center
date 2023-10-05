import { Routes, Route } from 'react-router-dom';
import { Dashboard } from './features/dashboard';
import { TicTacToe } from './features/tic-tac-toe';
import './App.scss'

function App() {
  return (
    <> 
      <Routes> 
        <Route path="/" element={<Dashboard />} /> 
        <Route path="/tictactoe" element={<TicTacToe/>} /> 
      </Routes> 
    </> 
  )
}

export default App

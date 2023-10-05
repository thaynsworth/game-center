import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { Link } from "react-router-dom";

export const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Link to="/tictactoe">
        <Card>
          <CardContent>Tic Tac Toe</CardContent>
        </Card>
      </Link>
    </>
  );
};
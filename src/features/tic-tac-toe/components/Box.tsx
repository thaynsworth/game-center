import Button from '@mui/material/Button';
import './Box.scss'

type BoxProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  disabled: boolean;
};

export const Box = ({ children, onClick, disabled }: BoxProps) => {
  return (
    <Button
      className={ "game-box" + (disabled ? " disabled" : "") }
      variant="outlined"
      size="large"
      onClick={ onClick }
    >
      { children }
    </Button>
  );
};
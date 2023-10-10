import Button from '@mui/material/Button';
import './Box.scss'

type BoxProps = {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled: boolean;
  isActive: boolean;
};

export const Box = ({ children, onClick, isDisabled, isActive }: BoxProps) => {
  return (
    <Button
      className={
        "game-box"
        + (isDisabled ? " disabled" : "")
        + (isActive ? " active" : "")
      }
      variant="outlined"
      size="large"
      onClick={ onClick }
    >
      { children }
    </Button>
  );
};
import "../styles/Plain.css";
import Grid from "./Grid";
import type { TGameFinish, TMove } from "../types/Game";

interface IPlain {
  move:TMove
  board: Array<string | null>;
  onClick: (index: number) => void;
  isFinished:TGameFinish | null;
  winCombination:number[] | undefined
}

export default function Plain({move,board,onClick,isFinished,winCombination}:IPlain) {
  return (
    <>
      <div className="PlainSquare">
        <Grid winCombination={winCombination} move={move} board={board} onClick={onClick} isFinished={isFinished}/>
      </div>
    </>
  );
}

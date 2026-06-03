import "../styles/Plain.css";
import Grid from "./Grid";
import type { TMove } from "../types/Game";

interface IPlain {
  move:TMove
  board: Array<string | null>;
  onClick: (index: number) => void;
  isFinished:boolean;
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

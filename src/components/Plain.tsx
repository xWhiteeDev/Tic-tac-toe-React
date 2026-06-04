import "../styles/Plain.css";
import Grid from "./Grid";
import type { TGameFinish } from "../types/Game";

interface IPlain {
  board: Array<string | null>;
  onClick: (index: number) => void;
  isFinished:TGameFinish | null;
  winCombination:number[] | undefined
}

export default function Plain({board,onClick,isFinished,winCombination}:IPlain) {
  return (
    <>
      <div className="PlainSquare">
        <Grid winCombination={winCombination}  board={board} onClick={onClick} isFinished={isFinished}/>
      </div>
    </>
  );
}

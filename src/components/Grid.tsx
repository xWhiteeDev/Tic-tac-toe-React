import MyButton from "./Button";
import "../styles/Grid.css";
import type { TMove } from "../types/Game";

interface IGrid {
  move: TMove;
  board: Array<string | null>;
  onClick: (index: number) => void;
  isFinished: boolean;
  winCombination:number[] | undefined;
}

export default function Grid(props: IGrid) {
  return (
    <>
      <div className="GridSquare">
        {[...Array(9).keys()].map((key) => (
          <MyButton
            text={`${props.board[key] ?? ""}`}
            onclick={() => props.onClick(key)}
            key={`${key}`}
            disabled={props.isFinished}
            type="GAME"
            isWinner={props.winCombination?.includes(key) ?? false}

          />
        ))}
      </div>
    </>
  );
}

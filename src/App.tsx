import { useState } from "react";
import "./App.css";
import Plain from "./components/Plain";
import { type TGameFinish, type TBoardArray, type TMove } from "./types/Game";
import Text from "./components/Text";
import MyButton from "./components/Button";
import List from "./components/List";

const winingConfiguration: number[][] = [
  [0, 3, 6],
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [1, 4, 7],
  [0, 4, 8],
  [6, 4, 2],
];

function checkWinnerConfiguration(
  board: TBoardArray,
  move: TMove,
): number[] | undefined {
  return winingConfiguration.find((cfg) => cfg.every((v) => board[v] === move));
}

function isEven(num: number): boolean {
  return num % 2 === 0;
}

function getGameEndMessage(
  finishedGameType: TGameFinish,
  move?: TMove,
): string {
  const messages: Record<TGameFinish, string> = {
    DRAW: "Draw!! It was really great game for you",
    WIN: `Game finished! Huge congratulations for: ${move}`,
  };
  return messages[finishedGameType];
}

function App() {
  const [board, setBoard] = useState<TBoardArray>(Array(9).fill(null));
  const [move, setMove] = useState<TMove>("X");
  const [isFinished, setGameFinished] = useState<TGameFinish | null>(null);
  const [winCombo, setWinCombo] = useState<number[]>();
  const [history, setHistory] = useState<TBoardArray[]>([]);

  function updateBoard(board: TBoardArray, index: number): TBoardArray {
    const newBoard = [...board];
    newBoard[index] = move;
    setBoard(newBoard);
    return newBoard;
  }

  function updateHistory(
    history: TBoardArray[],
    currentBoard: TBoardArray,
  ): void {
    setHistory([...history, currentBoard]);
  }

  function goBack(index: number) {
    const archivedBoard = history[index - 1];
    if (!archivedBoard) {
      resetGame();
      const cuttedArr = history.slice(0, index);
      setHistory(cuttedArr);
      return;
    }
    const cuttedArr = history.slice(0, index);
    setBoard(archivedBoard);
    setHistory(cuttedArr);
    setMove(isEven(index) ? "X" : "O");
  }

  function onClick(index: number) {
    if (isFinished) return;
    if (board[index]) return;
    const newBoard = updateBoard(board, index);
    const winConfig = checkWinnerConfiguration(newBoard, move);
    if (newBoard.every((el) => el !== null) && !winConfig) {
      setGameFinished("DRAW");
      return;
    }
    if (winConfig) {
      const newCombo = [...winConfig];
      setGameFinished("WIN");
      setWinCombo(newCombo);
      return;
    }
    updateHistory(history, newBoard);
    setMove(move === "O" ? "X" : "O");
  }

  function resetGame() {
    const newBoard = Array(9).fill(null);
    setBoard(newBoard);
    setMove("X");
    setGameFinished(null);
    setWinCombo(undefined);
    setHistory([]);
  }
  return (
    <div className="Game-container">
      <div className="Game-Plain-Container">
        <Plain
          board={board}
          onClick={onClick}
          isFinished={isFinished}
          winCombination={winCombo}
        />
      </div>
      <div className="Game-subInfo">
        {history.length > 0 && !isFinished && (
          <List
            listMembers={history.map((_, i) => {
              const text =
                i === 0 ? "Back to start position" : `Back to move ${i}`;
              return {
                text,
                className: `listMember`,
                key: `lm-${i}`,
                onClick: () => {
                  goBack(i);
                },
              };
            })}
          />
        )}
        {isFinished && (
          <>
            <Text text={getGameEndMessage(isFinished, move)} />
            <MyButton
              onclick={resetGame}
              type="NORMAL"
              text={"Let's start from begin!"}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default App;

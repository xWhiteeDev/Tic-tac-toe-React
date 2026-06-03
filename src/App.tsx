import { useState } from "react";
import "./App.css";
import Plain from "./components/Plain";
import type { TBoardArray, TMove } from "./types/Game";
import Text from "./components/Text";
import MyButton from "./components/Button";
import List, { type IListMember } from "./components/List";

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

function isWin(board: Array<string | null>, move: TMove) {
  return winingConfiguration.find((cfg) =>
    cfg.every((v) => board[v] === move),
  );
}

function isEven(num: number): boolean {
  return num % 2 === 0;
}
function App() {
  const [board, setBoard] = useState<TBoardArray>(Array(9).fill(null));
  const [move, setMove] = useState<TMove>("X");
  const [isFinished, setGameFinished] = useState(false);
  const [winCombo, setWinCombo] = useState<number[]>();
  const [history, setHistory] = useState<TBoardArray[]>([]);

  function updateBoard(board: Array<string | null>, index: number) {
    const newBoard = [...board];
    newBoard[index] = move;
    setBoard(newBoard);
    return newBoard;
  }

  function updateHistory(history: TBoardArray[], currentBoard: TBoardArray) {
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
    const winCombo = isWin(newBoard, move);
    if (winCombo) {
      const newCombo = [...winCombo];
      setGameFinished(true);
      setWinCombo(newCombo);
      return;
    }
    updateHistory(history, newBoard);
    setMove(move == "O" ? "X" : "O");
  }

  function resetGame() {
    const newBoard = Array(9).fill(null);
    setBoard(newBoard);
    setMove("X");
    setGameFinished(false);
    setWinCombo(undefined);
    setHistory([]);
  }
  return (
    <>
      <Plain
        move={move}
        board={board}
        onClick={onClick}
        isFinished={isFinished}
        winCombination={winCombo}
      />
      {history.length > 0 && (
        <List
          listMembers={history.map((_, i) => {
            const text =
              i == 0 ? "Back to start position" : `Back to move ${i}`;
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
          <Text text={`Game finished! Huge congratulations for: ${move}`} />
          <MyButton
            onclick={resetGame}
            type="NORMAL"
            text={"Let's start from begin!"}
          />
        </>
      )}
    </>
  );
}

export default App;

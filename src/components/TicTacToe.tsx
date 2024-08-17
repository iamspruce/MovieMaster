import React, { useState, useEffect, useCallback } from "react";

const DIMENSIONS = 3;
const SQUARE_DIMS = 20;
const DRAW = 0;
const PLAYER_X = 1;
const PLAYER_O = 2;

const GAME_STATES = {
  notStarted: "notStarted",
  inProgress: "inProgress",
  over: "over",
};

const GAME_MODES = {
  easy: "easy",
  medium: "medium",
  difficult: "difficult",
};

type Grid = Array<null | number>;

class Board {
  grid: Grid;
  winningIndex: null | number;

  constructor(grid?: Grid) {
    this.grid = grid || new Array(DIMENSIONS ** 2).fill(null);
    this.winningIndex = null;
  }

  makeMove = (square: number, player: number) => {
    if (this.grid[square] === null) {
      this.grid[square] = player;
    }
  };

  getEmptySquares = (grid = this.grid): number[] => {
    return grid
      .map((square, i) => (square === null ? i : null))
      .filter((index): index is number => index !== null);
  };

  isEmpty = (grid = this.grid): boolean => {
    return this.getEmptySquares(grid).length === DIMENSIONS ** 2;
  };

  getWinner = (grid = this.grid): null | number => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    let res: null | number = null;

    winningCombos.forEach((combo, i) => {
      if (
        grid[combo[0]] !== null &&
        grid[combo[0]] === grid[combo[1]] &&
        grid[combo[0]] === grid[combo[2]]
      ) {
        res = grid[combo[0]];
        this.winningIndex = i;
      } else if (res === null && this.getEmptySquares(grid).length === 0) {
        res = DRAW;
        this.winningIndex = null;
      }
    });

    return res;
  };

  getStrikethroughStyles = (): React.CSSProperties => {
    const defaultWidth = 285;
    const diagonalWidth = 400;
    const styles: React.CSSProperties = {
      transform: "",
      top: "",
      left: "",
      width: "",
    };

    switch (this.winningIndex) {
      case 0:
        styles.transform = "none";
        styles.top = "41px";
        styles.left = "15px";
        styles.width = `${defaultWidth}px`;
        break;
      case 1:
        styles.transform = "none";
        styles.top = "140px";
        styles.left = "15px";
        styles.width = `${defaultWidth}px`;
        break;
      case 2:
        styles.transform = "none";
        styles.top = "242px";
        styles.left = "15px";
        styles.width = `${defaultWidth}px`;
        break;
      case 3:
        styles.transform = "rotate(90deg)";
        styles.top = "145px";
        styles.left = "-86px";
        styles.width = `${defaultWidth}px`;
        break;
      case 4:
        styles.transform = "rotate(90deg)";
        styles.top = "145px";
        styles.left = "15px";
        styles.width = `${defaultWidth}px`;
        break;
      case 5:
        styles.transform = "rotate(90deg)";
        styles.top = "145px";
        styles.left = "115px";
        styles.width = `${defaultWidth}px`;
        break;
      case 6:
        styles.transform = "rotate(45deg)";
        styles.top = "145px";
        styles.left = "-44px";
        styles.width = `${diagonalWidth}px`;
        break;
      case 7:
        styles.transform = "rotate(-45deg)";
        styles.top = "145px";
        styles.left = "-46px";
        styles.width = `${diagonalWidth}px`;
        break;
      default:
        return {};
    }

    return styles;
  };

  clone = (): Board => {
    return new Board(this.grid.concat());
  };
}

const minimax = (board: Board, player: number): [number, number | null] => {
  const emptySquares = board.getEmptySquares();
  const isMaximizing = player === PLAYER_X;
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMove: number | null = null;

  const winner = board.getWinner();
  if (winner === PLAYER_X) return [10, null];
  if (winner === PLAYER_O) return [-10, null];
  if (emptySquares.length === 0) return [0, null];

  emptySquares.forEach((index) => {
    const newBoard = board.clone();
    newBoard.makeMove(index, player);
    const score = minimax(
      newBoard,
      player === PLAYER_X ? PLAYER_O : PLAYER_X
    )[0];

    if (isMaximizing) {
      if (score > bestScore) {
        bestScore = score;
        bestMove = index;
      }
    } else {
      if (score < bestScore) {
        bestScore = score;
        bestMove = index;
      }
    }
  });

  return [bestScore, bestMove];
};

const switchPlayer = (player: number): number =>
  player === PLAYER_X ? PLAYER_O : PLAYER_X;

export default function TicTacToe() {
  const [grid, setGrid] = useState<Grid>(new Array(DIMENSIONS ** 2).fill(null));
  const [players, setPlayers] = useState<{
    human: number | null;
    ai: number | null;
  }>({
    human: null,
    ai: null,
  });
  const [gameState, setGameState] = useState<string>(GAME_STATES.notStarted);
  const [winner, setWinner] = useState<string | null>(null);
  const [nextMove, setNextMove] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<string>(GAME_MODES.medium);

  useEffect(() => {
    const board = new Board(grid);
    const boardWinner = board.getWinner();

    const declareWinner = (winner: number) => {
      let winnerStr;
      switch (winner) {
        case PLAYER_X:
          winnerStr = "Player X wins!";
          break;
        case PLAYER_O:
          winnerStr = "Player O wins!";
          break;
        case DRAW:
        default:
          winnerStr = "It's a draw";
      }
      setGameState(GAME_STATES.over);
      setWinner(winnerStr);
      setTimeout(() => setModalOpen(true), 300);
    };

    if (boardWinner !== null && gameState !== GAME_STATES.over) {
      declareWinner(boardWinner);
    }
  }, [gameState, grid, nextMove]);

  const move = useCallback(
    (index: number, player: number | null) => {
      if (player !== null && gameState === GAME_STATES.inProgress) {
        setGrid((grid) => {
          const gridCopy = grid.concat();
          gridCopy[index] = player;
          return gridCopy;
        });
      }
    },
    [gameState]
  );

  const aiMove = useCallback(() => {
    const board = new Board(grid);
    const emptyIndices = board.getEmptySquares();
    let index: number | null = null;

    switch (mode) {
      case GAME_MODES.easy:
        do {
          index = Math.floor(Math.random() * 9);
        } while (!emptyIndices.includes(index));
        break;
      case GAME_MODES.medium:
        const smartMove = !board.isEmpty() && Math.random() < 0.5;
        if (smartMove) {
          index = minimax(board, players.ai!)[1];
        } else {
          do {
            index = Math.floor(Math.random() * 9);
          } while (!emptyIndices.includes(index));
        }
        break;
      case GAME_MODES.difficult:
      default:
        index = board.isEmpty()
          ? Math.floor(Math.random() * 9)
          : minimax(board, players.ai!)[1];
    }

    if (index !== null && !grid[index]) {
      if (players.ai !== null) {
        move(index, players.ai);
      }
      setNextMove(players.human);
    }
  }, [move, grid, players, mode]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (
      nextMove !== null &&
      nextMove === players.ai &&
      gameState !== GAME_STATES.over
    ) {
      timeout = setTimeout(() => {
        aiMove();
      }, 500);
    }
    return () => timeout && clearTimeout(timeout);
  }, [nextMove, aiMove, players.ai, gameState]);

  const humanMove = (index: number) => {
    if (!grid[index] && nextMove === players.human) {
      move(index, players.human);
      setNextMove(players.ai);
    }
  };

  const choosePlayer = (option: number) => {
    setPlayers({ human: option, ai: switchPlayer(option) });
    setGameState(GAME_STATES.inProgress);
    setNextMove(PLAYER_X);
  };

  const startNewGame = () => {
    setGameState(GAME_STATES.notStarted);
    setGrid(new Array(DIMENSIONS ** 2).fill(null));
    setModalOpen(false);
  };

  const changeMode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMode(e.target.value);
  };

  return gameState === GAME_STATES.notStarted ? (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl mb-4">Tic Tac Toe</h1>
      <div className="flex space-x-4">
        <button
          onClick={() => choosePlayer(PLAYER_X)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          X
        </button>
        <button
          onClick={() => choosePlayer(PLAYER_O)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          O
        </button>
      </div>
      <div className="mt-4">
        <label htmlFor="gameMode" className="mr-2">
          Difficulty:
        </label>
        <select
          className="bg-background text-white"
          id="gameMode"
          value={mode}
          onChange={changeMode}
        >
          <option value={GAME_MODES.easy}>Easy</option>
          <option value={GAME_MODES.medium}>Medium</option>
          <option value={GAME_MODES.difficult}>Difficult</option>
        </select>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-3 gap-1">
        {grid.map((value, index) => (
          <div
            key={index}
            className={`w-${SQUARE_DIMS} h-${SQUARE_DIMS} border-2 border-gray-500 flex items-center justify-center text-2xl cursor-pointer ${
              value === PLAYER_X
                ? "text-blue-500"
                : value === PLAYER_O
                ? "text-red-500"
                : ""
            }`}
            onClick={() => humanMove(index)}
          >
            {value === PLAYER_X ? "X" : value === PLAYER_O ? "O" : ""}
          </div>
        ))}
      </div>
      {winner && <div className="mt-4 text-xl font-bold">{winner}</div>}
      <div className="mt-4">
        <button
          onClick={startNewGame}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start New Game
        </button>
      </div>
      {modalOpen && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded shadow-lg">
          <div style={{ position: "relative", height: "100%" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {winner && (
                <div
                  style={new Board(grid).getStrikethroughStyles()}
                  className="border-t-2 border-red-500"
                ></div>
              )}
            </div>
          </div>
          <button
            onClick={startNewGame}
            className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

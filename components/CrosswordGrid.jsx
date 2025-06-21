import React, { useState } from "react";

const gridLayout = [
  ["", "", "1", "", ""],
  ["2", "", "#", "3", ""],
  ["", "", "#", "", ""],
  ["4", "", "", "", ""],
  ["5", "", "", "", ""]
];

const solution = [
  ["", "", "L", "", ""],
  ["A", "B", "#", "I", "N"],
  ["", "O", "#", "F", "O"],
  ["S", "T", "U", "F", "F"],
  ["P", "A", "G", "E", ""]
];

export default function CrosswordGrid() {
  const [grid, setGrid] = useState(
    gridLayout.map((row) => row.map((cell) => (cell === "#" ? "#" : "")))
  );
  const [feedback, setFeedback] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [lockedCells, setLockedCells] = useState(
    gridLayout.map((row) => row.map(() => false))
  );
  const [incorrectCells, setIncorrectCells] = useState(
    gridLayout.map((row) => row.map(() => false))
  );
  const [fullyCorrect, setFullyCorrect] = useState(false);

  const handleKeyPress = (r, c, e) => {
    const val = e.key.toUpperCase();
    if (/^[A-Z]$/.test(val) && !lockedCells[r][c]) {
      const newGrid = [...grid];
      newGrid[r][c] = val;
      setGrid(newGrid);
    }
  };

  const checkAnswers = () => {
    let correct = true;
    const newLocked = lockedCells.map((row) => [...row]);
    const newIncorrect = incorrectCells.map((row) => [...row]);

    for (let r = 0; r < grid.length; r++) {
      for (let c = 0; c < grid[r].length; c++) {
        if (solution[r][c] && solution[r][c] !== "#") {
          if (grid[r][c] === solution[r][c]) {
            newLocked[r][c] = true;
            newIncorrect[r][c] = false;
          } else {
            newIncorrect[r][c] = true;
            correct = false;
          }
        }
      }
    }

    setLockedCells(newLocked);
    setIncorrectCells(newIncorrect);
    setFullyCorrect(correct);
    setFeedback(correct ? "✅ All correct!" : "❌ Some answers are incorrect.");
  };

  const revealAnswers = () => {
    const newGrid = grid.map((row, r) =>
      row.map((cell, c) => (solution[r][c] === "#" ? "#" : solution[r][c]))
    );
    const allLocked = grid.map((row, r) =>
      row.map((_, c) => (solution[r][c] === "#" ? false : true))
    );
    setGrid(newGrid);
    setLockedCells(allLocked);
    setIncorrectCells(grid.map((row) => row.map(() => false)));
    setRevealed(true);
    setFullyCorrect(false);
    setFeedback("📖 Puzzle revealed.");
  };

  const clearPuzzle = () => {
    const clearedGrid = gridLayout.map((row) =>
      row.map((cell) => (cell === "#" ? "#" : ""))
    );
    setGrid(clearedGrid);
    setRevealed(false);
    setLockedCells(gridLayout.map((row) => row.map(() => false)));
    setIncorrectCells(gridLayout.map((row) => row.map(() => false)));
    setFullyCorrect(false);
    setFeedback("🧼 Puzzle cleared.");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-5 border border-black">
        {grid.map((row, r) =>
          row.map((cell, c) => (
            <div
              key={`${r}-${c}`}
              className={`w-12 h-12 border border-black flex items-center justify-center relative ${
                gridLayout[r][c] === "#" ? "bg-black" : "bg-white"
              }`}
            >
              {gridLayout[r][c] && gridLayout[r][c] !== "#" && (
                <span className="absolute top-0 left-0 text-xs m-1">
                  {gridLayout[r][c]}
                </span>
              )}
              {gridLayout[r][c] !== "#" && (
                <input
                  type="text"
                  maxLength={1}
                  value={grid[r][c]}
                  onKeyDown={(e) => handleKeyPress(r, c, e)}
                  className={`w-full h-full text-center outline-none text-lg font-bold ${
                    fullyCorrect && lockedCells[r][c]
                      ? "text-green-600"
                      : lockedCells[r][c]
                      ? "text-blue-600"
                      : ""
                  } ${
                    incorrectCells[r][c] ? "line-through text-red-500" : ""
                  }`}
                  disabled={revealed || lockedCells[r][c]}
                />
              )}
            </div>
          ))
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-4 mt-4">
        <button
          onClick={checkAnswers}
          className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white"
        >
          Check Puzzle
        </button>
        <button
          onClick={revealAnswers}
          className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white"
        >
          Reveal Puzzle
        </button>
        <button
          onClick={clearPuzzle}
          className="px-4 py-2 border border-black rounded hover:bg-black hover:text-white"
        >
          Clear Puzzle
        </button>
      </div>

      {feedback && <p className="mt-2 text-lg">{feedback}</p>}

        <div className="mt-8">
        <h2 className="font-semibold mb-2">Clues</h2>
        <ul className="space-y-1 underline">
            <li><a href="/home">1. home</a></li>
            <li><a href="/about-me">2. about me</a></li>
            <li><a href="/contact">3. contact</a></li>
            <li><a href="/project">4. project</a></li>
            <li><a href="/experience">5. experience</a></li>
        </ul>
        </div>
        import { Link } from "react-router-dom";
    </div>
    
  );
}

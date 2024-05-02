"use strict";

const SudokuSolver = require("../controllers/sudoku-solver.js");
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");
let regex = /^[1-9.]+$/;
let coordinateRegex = /^[A-I][1-9]$/;

module.exports = function (app) {
  let solver = new SudokuSolver();

  app.route("/api/check").post((req, res) => {
    if (!req.body.puzzle || !req.body.coordinate || !req.body.value)
      return res.json({ error: "Required field(s) missing" });

    let puzzle = req.body.puzzle;
    let coordinate = req.body.coordinate;
    let value = req.body.value;

    if (!value || !coordinate || !puzzle)
      return res.json({ error: "Required field(s) missing" });

    const validate = validateCheckInput(puzzle);
    if (validate) return res.json(validate);

    if (!coordinate.match(coordinateRegex))
      return res.json({ error: "Invalid coordinate" });

    if (!value.match(/^[1-9]$/)) return res.json({ error: "Invalid value" });

    let row = coordinate[0].charCodeAt(0) - "A".charCodeAt(0);
    let col = parseInt(coordinate[1]) - 1;
    let conflict = [];

    let solution = solver.solve(puzzle);
    //Check the placement of the value and compare with solution
    if (solution) {
      if (solution[row][col] === value) return res.json({ valid: true });
    }

    if (!solver.checkRowPlacement(solution, row, col, value))
      conflict.push("row");

    if (!solver.checkColPlacement(solution, row, col, value))
      conflict.push("column");

    if (!solver.checkRegionPlacement(solution, row, col, value))
      conflict.push("region");

    if (conflict.length === 0) return res.json({ valid: true });

    res.json({ valid: false, conflict });
  });

  app.route("/api/solve").post((req, res) => {
    if (!req.body.puzzle) return res.json({ error: "Required field missing" });

    let puzzle = req.body.puzzle;
    const validate = validateCheckInput(puzzle);

    if (validate) return res.json(validate);

    if (!solver.solve(puzzle))
      return res.json({ error: "Puzzle cannot be solved" });

    const solution = solver.solve(puzzle).flat().join("");
    res.json({ solution });
  });
};

//Validate the input for check route
const validateCheckInput = (puzzle) => {
  if (!puzzle || puzzle.length !== 81) {
    return { error: "Expected puzzle to be 81 characters long" };
  }
  if (!puzzle.match(/^[1-9.]+$/)) {
    return { error: "Invalid characters in puzzle" };
  }

  return null;
};

const validateSolveInput = (puzzle) => {
  if (puzzle.length !== 81)
    return { error: "Expected puzzle to be 81 characters long" };

  //Check is coordinate is valid

  return null;
};

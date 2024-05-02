const chai = require("chai");
const assert = chai.assert;
const { puzzlesAndSolutions } = require("../controllers/puzzle-strings");
const Solver = require("../controllers/sudoku-solver.js");
let solver;

suite("Unit Tests", () => {
  suiteSetup(() => {
    solver = new Solver();
  });
  // Logic handles a valid puzzle string of 81 characters
  // Logic handles a puzzle string with invalid characters (not 1-9 or .)
  // Logic handles a puzzle string that is not 81 characters in length
  // Logic handles a valid row placement
  // Logic handles an invalid row placement
  // Logic handles a valid column placement
  // Logic handles an invalid column placement
  // Logic handles a valid region (3x3 grid) placement
  // Logic handles an invalid region (3x3 grid) placement
  // Valid puzzle strings pass the solver
  // Invalid puzzle strings fail the solver
  // Solver returns the expected solution for an incomplete puzzle

  test("Logic handles a valid puzzle string of 81 characters", function () {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.equal(solver.validate(puzzle), true);
  });

  test("Logic handles a puzzle string with invalid characters (not 1-9 or .)", function () {
    let puzzle = puzzlesAndSolutions[0][0].replace("1", "A");
    assert.deepEqual(solver.validate(puzzle), {
      error: "Invalid characters in puzzle",
    });
  });

  test("Logic handles a puzzle string that is not 81 characters in length", function () {
    let puzzle = puzzlesAndSolutions[0][0].slice(1);
    assert.deepEqual(solver.validate(puzzle), {
      error: "Expected puzzle to be 81 characters long",
    });
  });

  test("Logic handles a valid row placement", function () {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.equal(solver.checkRowPlacement(puzzle, 0, 0, 1), true);
  });

  test("Logic handles an invalid row placement", function () {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.equal(solver.checkRowPlacement(puzzle, 0, 0, 5), false);
  });

  test("Logic handles a valid column placement", function () {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.equal(solver.checkColPlacement(puzzle, 0, 0, 1), true);
  });

  test("Logic handles an invalid column placement", function () {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.equal(solver.checkColPlacement(puzzle, 0, 0, 5), false);
  });

  test("Logic handles a valid region (3x3 grid) placement", function () {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.equal(solver.checkRegionPlacement(puzzle, 0, 0, 1), true);
  });

  test("Logic handles an invalid region (3x3 grid) placement", function () {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.equal(solver.checkRegionPlacement(puzzle, 0, 0, 5), false);
  });

  test("Valid puzzle strings pass the solver", function () {
    let puzzle = puzzlesAndSolutions[0][0];
    assert.equal(solver.solve(puzzle), true);
  });

  test("Invalid puzzle strings fail the solver", function () {
    let puzzle = puzzlesAndSolutions[0][0].replace("1", "A");
    assert.equal(solver.solve(puzzle), false);
  });

  test("Solver returns the expected solution for an incomplete puzzle", function () {
    let puzzle = puzzlesAndSolutions[0][0];
    let solution = puzzlesAndSolutions[0][1];
    assert.equal(solver.solve(puzzle).flat().join(""), solution);
  });
});

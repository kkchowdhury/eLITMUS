import React, {
    useState
} from "react";

import "./Game.css";
import {
    doc,
    updateDoc
} from "firebase/firestore";
import {
    db,
    auth,
} from "/home/mahesh/Documents/timeportal/src/firebase-config.js";

import {
    Grid,
    Button,
    ChoiceBoard
} from "../../components/index.js";

import {
    animateElement,
    arrayDeepCopy,
    checkPlayerWon,
    createSudokuGrid,
} from "../../utility";

import useLocalStorage from "../../hooks/useLocalStorage";

const mediumMaxEmptyCells = 40;

const SudokuGame = (props) => {
    const docRef = doc(db, "users", auth.currentUser.uid, "puzzles", "sudoku");
    const nextGame = doc(db, "users", auth.currentUser.uid);

    const [grid, setGrid] = useLocalStorage("currentGrid", null);
    const [startingGrid, setStartingGrid] = useLocalStorage("startingGrid", null);
    const [clickValue, setClickValue] = useLocalStorage("clickValue", 1);

    // Game Score logic
    const [gameMode, setGameMode] = useLocalStorage(
        "gameMode",
        mediumMaxEmptyCells
    );
    const [movesTaken, setMovesTaken] = useLocalStorage("movesTaken", 0);
    const [gameScore, setGameScore] = useState(500);
    const [isPlayerWon, setIsPlayerWon] = useLocalStorage("playerWon", false);

    const [startTime, setStartTime] = useLocalStorage("startTime", () =>
        Date().toLocaleString()
    );

    const handleNewGame = (maxEmptyCellsCount) => {
        // Waiting for the function to return the grid
        let newSudokuGrid = createSudokuGrid(maxEmptyCellsCount);

        setStartingGrid(arrayDeepCopy(newSudokuGrid));
        setGrid(arrayDeepCopy(newSudokuGrid));

        // Setting the game mode with maxEmptyCellsCount
        setGameMode(maxEmptyCellsCount);

        setIsPlayerWon(false);
        setStartTime(() => Date().toLocaleString());
    };

    const handleClearBoard = () => {
        setIsPlayerWon(false);
        setGrid(arrayDeepCopy(startingGrid));
    };
    const getWrongLines = (board, type) => {
        let wrongLines = new Set();

        for (let i = 0; i < 9; i++) {
            let dict = {};

            for (let j = 0; j < 9; j++) {
                let key;
                if (type === "horizontal") key = board[i][j].value;
                else key = board[j][i].value;

                if (key === 0) continue;

                if (Object.hasOwnProperty.call(dict, key)) {
                    dict[key] += 1;
                    if (dict[key] > 1) {
                        wrongLines.add(i);
                        break;
                    }
                } else dict[key] = 1;
            }
        }
        return wrongLines;
    };

    const isBoxValid = (board, x0, y0) => {
        let dict = {};

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let key = board[x0 + i][y0 + j].value;
                if (key === 0) continue;

                if (Object.hasOwnProperty.call(dict, key)) {
                    dict[key] += 1;
                    if (dict[key] > 1) {
                        console.log(x0, y0);
                        return false;
                    }
                } else dict[key] = 1;
            }
        }
        return true;
    };

    const getWrongBoxes = (board) => {
        let wrongBoxes = new Set();
        let boxValues = {
            0: {
                x: 0,
                y: 0
            },
            1: {
                x: 0,
                y: 3
            },
            2: {
                x: 0,
                y: 6
            },
            3: {
                x: 3,
                y: 0
            },
            4: {
                x: 3,
                y: 3
            },
            5: {
                x: 3,
                y: 6
            },
            6: {
                x: 6,
                y: 0
            },
            7: {
                x: 6,
                y: 3
            },
            8: {
                x: 6,
                y: 6
            },
        };

        // We check for every boxes
        for (let box = 0; box < 9; box++) {
            // Now check all cells of the selected box
            let x0 = boxValues[box].x;
            let y0 = boxValues[box].y;

            if (!isBoxValid(board, x0, y0)) {
                wrongBoxes.add(box);
            }
        }
        return wrongBoxes;
    };

    const getBoxNumber = (x, y) => {
        let x0 = Math.floor(x / 3);
        let y0 = Math.floor(y / 3);
        let BoxNumber = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
        ][x0][y0];
        return BoxNumber;
    };
    const checkBoard = (board) => {
        // Check for the Horizontal
        // we will check all the board

        let wrongHorizontal = getWrongLines(board, "horizontal");
        let wrongVertical = getWrongLines(board, "vertical");
        let wrongBoxes = getWrongBoxes(board);

        console.log(getBoxNumber(1, 5));
        console.log(wrongBoxes);

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (
                    wrongHorizontal.has(i) ||
                    wrongVertical.has(j) ||
                    wrongBoxes.has(getBoxNumber(i, j))
                ) {
                    board[i][j].isValid = false;
                    setGameScore(gameScore - 5);
                } else {
                    board[i][j].isValid = true;
                }
            }
        }
    };
    const handleCellClick = async (row, column, isModifiable) => {
        if (!isModifiable) {
            animateElement(".grid-table", "headShake");
            return;
        }

        // moves registered when the value is not 0
        if (clickValue !== 0) setMovesTaken((moves) => moves + 1);

        let newGrid = arrayDeepCopy(grid);
        newGrid[row][column].value = clickValue;

        // Marking the node valid or invalid depending on the grid
        checkBoard(newGrid);

        // Checking if the player has won
        let playerWon = checkPlayerWon(newGrid);
        if (playerWon) {
            // Dosomething here
            setIsPlayerWon(true);
            const game = await updateDoc(docRef, {
                completed: true,
                score: gameScore,
                accuracy: gameScore / 5,
            });
            const gmaes = await updateDoc(nextGame, {
                score: props.score + gameScore,
                level: "memoryGame",
                completed: true,
                started: false,
            });
            handleNewGame(mediumMaxEmptyCells);
        }

        // setting the value to the grid and also to the local storage
        setGrid(newGrid);
    };

    console.log("....");

    // If we donot have anything in the local storage
    if (grid == null && startingGrid == null) handleNewGame(gameMode);

    return ( <
        div className = "Game" >
        <
        h1 className = "main-title" > Sudoku Game < /h1>

        <
        Grid handleCellClick = {
            handleCellClick
        }
        grid = {
            grid
        }
        /> <
        ChoiceBoard setClickValue = {
            setClickValue
        }
        selected = {
            clickValue
        }
        /> <
        div className = "action-container" >
        <
        Button onClick = {
            handleClearBoard
        }
        buttonStyle = "btn--primary--solid"
        text = "Clear" /
        >
        <
        Button onClick = {
            () => handleNewGame(mediumMaxEmptyCells)
        }
        buttonStyle = "btn--danger--solid"
        text = "New Game" /
        >
        <
        /div> <
        /div>
    );
};

export default SudokuGame;
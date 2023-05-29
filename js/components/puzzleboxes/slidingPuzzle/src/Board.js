import React, {
    useState
} from "react";
import Tile from "./Tile";
import {
    TILE_COUNT,
    GRID_SIZE,
    BOARD_SIZE
} from "./constants";
import {
    canSwap,
    shuffle,
    swap,
    isSolved
} from "./helpers";
import {
    doc,
    updateDoc
} from "firebase/firestore";
import {
    db,
    auth,
} from "/home/mahesh/Documents/timeportal/src/firebase-config.js";

import "./index.css";

function Board({
    imgUrl,
    score,
    func
}) {
    const docRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "puzzles",
        "memoryGame"
    );
    const nextGame = doc(db, "users", auth.currentUser.uid);

    const [tiles, setTiles] = useState([...Array(TILE_COUNT).keys()]);
    const [isStarted, setIsStarted] = useState(false);

    const shuffleTiles = () => {
        const shuffledTiles = shuffle(tiles);
        setTiles(shuffledTiles);
    };

    const swapTiles = async (tileIndex) => {
        if (canSwap(tileIndex, tiles.indexOf(tiles.length - 1))) {
            const swappedTiles = swap(
                tiles,
                tileIndex,
                tiles.indexOf(tiles.length - 1)
            );
            setTiles(swappedTiles);
        }
    };

    const handleTileClick = async (index) => {
        swapTiles(index);
        console.log("sloved" + isSolved);
        if (isSolved(tiles)) {
            const game = await updateDoc(docRef, {
                completed: true,
                score: 500,
                accuracy: 100,
            });
            const gmaes = await updateDoc(nextGame, {
                level: "sudoku",
                score: score + 500,
            });
        }
    };

    const handleShuffleClick = () => {
        shuffleTiles();
    };

    const handleStartClick = () => {
        shuffleTiles();
        setIsStarted(true);
    };

    const pieceWidth = Math.round(BOARD_SIZE / GRID_SIZE);
    const pieceHeight = Math.round(BOARD_SIZE / GRID_SIZE);
    const style = {
        width: BOARD_SIZE,
        height: BOARD_SIZE,
    };
    const hasWon = isSolved(tiles);

    return ( <
        >
        <
        ul style = {
            style
        }
        className = "board" > {
            tiles.map((tile, index) => ( <
                Tile key = {
                    tile
                }
                index = {
                    index
                }
                imgUrl = {
                    imgUrl
                }
                tile = {
                    tile
                }
                width = {
                    pieceWidth
                }
                height = {
                    pieceHeight
                }
                handleTileClick = {
                    handleTileClick
                }
                />
            ))
        } <
        /ul> {
            hasWon && isStarted && < div > Puzzle solved🧠🎉 < /div>} {
                    !isStarted ? ( <
                        button className = "button"
                        onClick = {
                            () => handleStartClick()
                        } >
                        Start game <
                        /button>
                    ) : ( <
                        button className = "button"
                        onClick = {
                            () => handleShuffleClick()
                        } >
                        Restart game <
                        /button>
                    )
                } <
                />
        );
    }

    export default Board;
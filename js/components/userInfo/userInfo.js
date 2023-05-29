import React, {
    useState,
    useEffect
} from "react";
import "../userInfo/userInfo.css";
import arrow from "../../assets/images/development/arrow.svg";
import arrowleft from "../../assets/images/development/arrowleft.svg";
import key from "../../assets/images/development/key.png";
import link from "../../assets/images/development/link.png";
import lock from "../../assets/images/development/lock.png";
import {
    db
} from "../../firebase-config";
import {
    getDoc,
    doc
} from "firebase/firestore";
import sudokuimg from "../../assets/images/development/sudoku.png";
import slidingimg from "../../assets/images/development/slidingimg.png";
import memoryimg from "../../assets/images/development/memoryimg.png";

function UserGameDetails(params) {
    const storedUid = localStorage.getItem("uid");
    const [users, setUserData] = useState({});
    const [memoryGame, setmemoryGame] = useState({});
    const [slidingGame, setslidingGame] = useState({});
    const [sudoku, setSudoku] = useState({});
    const [count, setCount] = useState(0);
    const userDocument = doc(db, "users", storedUid);
    const memoryGameDocument = doc(
        db,
        "users",
        storedUid,
        "puzzles",
        "memoryGame"
    );
    const slidingGameDocument = doc(
        db,
        "users",
        storedUid,
        "puzzles",
        "slidingGame"
    );
    const sudokuGameDocument = doc(db, "users", storedUid, "puzzles", "sudoku");

    useEffect(() => {
        const getUsers = async () => {
            const userData = await getDoc(userDocument);
            setUserData(userData.data());
            console.log(userData);
            const gameData = await getDoc(memoryGameDocument);
            setmemoryGame(gameData.data());
            console.log(gameData.data());
            const gameData1 = await getDoc(slidingGameDocument);
            setslidingGame(gameData1.data());
            console.log(gameData1.data());
            const gameData2 = await getDoc(sudokuGameDocument);
            setSudoku(gameData2.data());
            console.log(gameData2.data());
        };
        getUsers();
    }, [params]);
    const [isOpen, setIsOpen] = useState(true);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [time, setTime] = useState("");
    const [gameTime, setGameTime] = useState("");

    var timer;
    useEffect(() => {
        const storedName = localStorage.getItem("time");
        if (storedName) {
            setTime(storedName);
        }
        timer = setInterval(() => {
            setSeconds(seconds + 1);
            if (seconds === 59) {
                setMinutes(minutes + 1);
                setSeconds(0);
            }
            localStorage.setItem("name", minutes + ":" + seconds);
        }, 1000);
        console.log(time);
        return () => clearInterval(timer);
    }, [time]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };
    return ( <
        div className = {
            isOpen ? "panel open" : "panel closed"
        } >
        <
        div className = "divider" > < /div> <
        div className = {
            isOpen ? "PanelComponents open" : "PanelComponents closeComponent"
        } >
        <
        div className = "stats"
        style = {
            {
                background: memoryGame.completed ? "green" : ""
            }
        } >
        <
        img src = {
            memoryimg
        }
        alt = "memory"
        className = "images" / > {
            memoryGame.completed ? < h2 > {
                memoryGame.accuracy
            } < /h2> : <></ >
        } <
        /div> <
        div className = "stats"
        style = {
            {
                background: slidingGame.completed ? "green" : ""
            }
        } >
        <
        img src = {
            slidingimg
        }
        alt = "sliding"
        className = "images" / > {
            slidingGame.completed ? < h2 > {
                slidingGame.accuracy
            } < /h2> : <></ >
        } <
        /div> <
        div className = "stats"
        style = {
            {
                background: sudoku.completed ? "green" : ""
            }
        } >
        <
        img src = {
            sudokuimg
        }
        alt = "sudoku"
        className = "images" / > {
            sudoku.completed ? < h2 > {
                sudoku.accuracy
            } < /h2> : <></ >
        } <
        /div> <
        /div> <
        /div>
    );
}

export default UserGameDetails;
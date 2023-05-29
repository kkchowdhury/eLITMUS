import React from "react";
import profile from "../../assets/images/development/profile.svg";
import scoreCoin from "../../assets/images/development/score.png";
import UserGameDetails from "../../components/userInfo/userInfo.js";
import {
    useNavigate
} from "react-router-dom";
import {
    db,
    auth
} from "../../firebase-config.js";
import {
    getDoc,
    doc
} from "firebase/firestore";
import {
    useState,
    useEffect,
    useCallback
} from "react";
import "./userDetails.css";

function UserDetails(props) {
    const navigate = useNavigate();
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
    }, [count]);

    return ( <
        div className = "container" >
        <
        div className = "background" >
        <
        div className = "centerbar" >
        <
        div className = "topbar" >
        <
        div className = "profile" >
        <
        img src = {
            profile
        }
        alt = "profile" / >
        <
        h1 > {
            users.userName
        } < /h1> <
        /div> <
        div className = "profile" >
        <
        h1 > PROFILE < /h1> <
        /div> <
        div className = "profile" >
        <
        h1 > SCORE: < /h1> <
        div className = "scoreboard" >
        <
        img src = {
            scoreCoin
        }
        alt = "score coin"
        style = {
            {
                paddingRight: "20px"
            }
        }
        /> <
        h1 > {
            users.score
        } < /h1> <
        /div> <
        /div> <
        /div> <
        div className = "stageBoard" >
        <
        h1 > Stage: {
            users.level
        } < /h1> <
        /div>

        <
        div className = "gameDetailsBG" >
        <
        div className = "gameDetails" >
        <
        h3 >
        <
        u > Memory Game < /u> <
        /h3> <
        h3 > Score: {
            memoryGame.score
        } < /h3> <
        h3 > Started: {
            memoryGame.started ? "Yes" : " No"
        } < /h3> <
        h3 > Completed: {
            memoryGame.completed ? "Yes" : " No"
        } < /h3> <
        h3 > Accuracy: {
            memoryGame.accuracy
        } < /h3> <
        /div> <
        div className = "gameDetails" >
        <
        h3 >
        <
        u > Sliding Game < /u> <
        /h3> <
        h3 > Score: {
            slidingGame.score
        } < /h3> <
        h3 > Started: {
            slidingGame.started ? "Yes" : " No"
        } < /h3> <
        h3 > Completed: {
            slidingGame.completed ? "Yes" : " No"
        } < /h3> <
        h3 > Accuracy: {
            slidingGame.accuracy
        } < /h3> <
        /div> <
        div className = "gameDetails" >
        <
        h3 >
        <
        u > Sudoku Game < /u> <
        /h3> <
        h3 > Score: {
            sudoku.score
        } < /h3> <
        h3 > Started: {
            sudoku.started ? "Yes" : " No"
        } < /h3> <
        h3 > Completed: {
            sudoku.completed ? "Yes" : " No"
        } < /h3> <
        h3 > Accuracy: {
            sudoku.accuracy
        } < /h3> <
        /div> <
        /div>

        <
        div onClick = {
            async () => {
                if (localStorage.getItem("uid")) {
                    auth.signOut();
                    navigate("/");
                } else {
                    navigate(-1);
                }
                localStorage.removeItem("uid");
            }
        }
        style = {
            {
                color: "white",
                padding: "20px 40px",
                borderRadius: "20px",
                background: "linear-gradient(110deg, rgba(22.91, 0, 163.62, 0.70), rgba(35.93, 0.27, 255, 0.75))",
                boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
            }
        } >
        Logout <
        /div> <
        /div> <
        /div> <
        /div>
    );
}

export default UserDetails;
import "./startGame.css";
import {
    useState,
    useEffect
} from "react";
import {
    useNavigate
} from "react-router-dom";

function StartGame(params) {
    const navigate = useNavigate();
    const [startGame, setStartGame] = useState(false);

    useEffect(() => {
        if (startGame) {
            const timeoutId = setTimeout(() => {
                console.log("going");
                navigate("slides");
            }, 2000);
            return () => clearTimeout(timeoutId);
        }
    });

    return ( <
        div >
        <
        div className = "backGround" > < /div> <
        button className = {
            startGame ? "startGame" : "startButton"
        }
        onClick = {
            () => {
                console.log("going");
                setStartGame(true);
            }
        } >
        {
            startGame ? "" : "Start My Time Machine"
        } <
        /button> <
        /div>
    );
}

export default StartGame;
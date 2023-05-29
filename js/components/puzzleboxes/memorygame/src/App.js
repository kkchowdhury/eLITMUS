import Cards from "./components/Cards";
import "../src/index.css";

function MemoryGame(props) {
    return ( <
        div >
        <
        h1 > {
            " "
        } <
        u > Memory Game < /u>{" "} <
        /h1> <
        div className = "App" >
        <
        Cards score = {
            props.score
        }
        func = {
            props.func
        }
        /> <
        /div> <
        /div>
    );
}

export default MemoryGame;
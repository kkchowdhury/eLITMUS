import {
    useState
} from "react";
import Card from "./Card";
import "../index.css";
import htmlImage from "../img/html.png";
import cssImage from "../img/css.png";
import jsImage from "../img/js.png";
import scssImage from "../img/scss.png";
import reactImage from "../img/react.png";
import vueImage from "../img/vue.png";
import angualarImage from "../img/angular.png";
import nodejsImage from "../img/nodejs.png";
import {
    doc,
    updateDoc
} from "firebase/firestore";
import {
    db,
    auth
} from "../../../../../firebase-config.js";

function Cards(props) {
    const [gameScore, setGameScore] = useState(500);

    const docRef = doc(
        db,
        "users",
        auth.currentUser.uid,
        "puzzles",
        "memoryGame"
    );
    const nextGame = doc(db, "users", auth.currentUser.uid);
    const [items, setItems] = useState(
        [{
                id: 1,
                img: htmlImage,
                stat: ""
            },
            {
                id: 1,
                img: htmlImage,
                stat: ""
            },
            {
                id: 2,
                img: cssImage,
                stat: ""
            },
            {
                id: 2,
                img: cssImage,
                stat: ""
            },
            {
                id: 3,
                img: jsImage,
                stat: ""
            },
            {
                id: 3,
                img: jsImage,
                stat: ""
            },
            {
                id: 4,
                img: scssImage,
                stat: ""
            },
            {
                id: 4,
                img: scssImage,
                stat: ""
            },
            {
                id: 5,
                img: reactImage,
                stat: ""
            },
            {
                id: 5,
                img: reactImage,
                stat: ""
            },
            {
                id: 6,
                img: vueImage,
                stat: ""
            },
            {
                id: 6,
                img: vueImage,
                stat: ""
            },
            {
                id: 7,
                img: angualarImage,
                stat: ""
            },
            {
                id: 7,
                img: angualarImage,
                stat: ""
            },
            {
                id: 8,
                img: nodejsImage,
                stat: ""
            },
            {
                id: 8,
                img: nodejsImage,
                stat: ""
            },
        ].sort(() => Math.random() - 0.5)
    );
    const [count, setCount] = useState(16);
    const [moves, countmoves] = useState(0);
    const [prev, setPrev] = useState(-1);

    async function check(current) {
        if (items[current].id === items[prev].id && current !== prev) {
            items[current].stat = "correct";
            items[prev].stat = "correct";
            setItems([...items]);
            setCount(count - 2);
            setPrev(-1);
        } else {
            setGameScore(gameScore - 10);
            items[current].stat = "wrong";
            items[prev].stat = "wrong";
            setItems([...items]);
            setTimeout(() => {
                items[current].stat = "";
                items[prev].stat = "";
                setItems([...items]);
                setPrev(-1);
            }, 1000);
        }
        countmoves(moves + 2);
        console.log(count);

        if (count === 2) {
            const game = await updateDoc(docRef, {
                completed: true,
                score: gameScore,
                accuracy: moves <= 16 ? 100 : 100 - 16 / moves ** 100,
            });
            const gmaes = await updateDoc(nextGame, {
                level: "slidingGame",
                score: props.score + gameScore,
            });
        }
    }

    function handleClick(id) {
        if (prev === -1) {
            items[id].stat = "active";
            setItems([...items]);
            setPrev(id);
        } else {
            check(id);
        }
    }

    return ( <
        >
        <
        div className = "cardsBG" > {
            items.map((item, index) => ( <
                Card key = {
                    index
                }
                item = {
                    item
                }
                id = {
                    index
                }
                handleClick = {
                    handleClick
                }
                />
            ))
        } <
        /div> <
        />
    );
}

export default Cards;
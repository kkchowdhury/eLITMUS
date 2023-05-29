import {
    useState
} from "react";
import {
    useNavigate
} from "react-router-dom";
import {
    addDoc,
    collection,
    doc,
    setDoc
} from "firebase/firestore";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";
import {
    auth,
    db
} from "../../firebase-config.js";
import "./authScreen.css";

function AuthScreen(params) {
    const [login, setAuth] = useState(true);
    const navigate = useNavigate();
    const userCollectionRef = collection(db, "users");
    const [emailID, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUsername] = useState("");

    return ( <
        div className = "authBackground" >
        <
        div className = "authcenterbar" >
        <
        h1 > LOGIN TO START PLAYING < /h1> <
        div className = "inputBG" >
        <
        span >
        <
        h3 > Email ID < /h3> <
        /span> <
        span >
        <
        input className = "inputBox"
        type = "email"
        placeholder = "Email"
        onChange = {
            (event) => {
                setEmail(event.target.value);
            }
        }
        /> <
        /span> <
        /div> <
        div className = "inputBG" >
        <
        span >
        <
        h3 > User Name < /h3> <
        /span> <
        span >
        <
        input className = "inputBox"
        type = "text"
        placeholder = "User Name"
        onChange = {
            (event) => {
                setUsername(event.target.value);
            }
        }
        /> <
        /span> <
        /div> <
        div className = "inputBG" >
        <
        span >
        <
        h3 > Password < /h3> <
        /span> <
        span >
        <
        input className = "inputBox"
        type = "password"
        placeholder = "Password"
        onChange = {
            (event) => {
                setPassword(event.target.value);
            }
        }
        /> <
        /span> <
        /div> <
        br / >
        <
        input type = "button"
        value = {
            login ? "Login" : "Singup"
        }
        className = "authButton"
        onClick = {
            async () => {
                console.log("loging");
                if (emailID == "admin@gmail.com" && password == "admin@123") {
                    navigate("/admin");
                } else {
                    try {
                        console.log("trying1");
                        const user = await signInWithEmailAndPassword(
                            auth,
                            emailID,
                            password
                        ).then(() => {
                            localStorage.setItem("uid", auth.currentUser.uid);
                            navigate("/startGame", {
                                replace: "true"
                            });
                        });
                        console.log(user);
                    } catch (error) {
                        console.log("error");
                        console.log(error.code);
                        if (error.code === "auth/user-not-found") {
                            await createUserWithEmailAndPassword(
                                auth,
                                emailID,
                                password
                            ).then(async () => {
                                await setDoc(doc(db, "users", auth.currentUser.uid), {
                                    id: auth.currentUser.uid,
                                    userName: userName,
                                    emailID: emailID,
                                    level: "memoryGame",
                                    started: false,
                                    score: 0,
                                    accuracy: 0,
                                    time: "00:00",
                                    sessionTime: "00:00",
                                });
                                await setDoc(
                                    doc(
                                        db,
                                        "users",
                                        auth.currentUser.uid,
                                        "puzzles",
                                        "memoryGame"
                                    ), {
                                        started: false,
                                        completed: false,
                                        time: "00::00",
                                        trials: 0,
                                        wrongPairs: 0,
                                        accuracy: 0,
                                        score: 0,
                                    }
                                );
                                await setDoc(
                                    doc(
                                        db,
                                        "users",
                                        auth.currentUser.uid,
                                        "puzzles",
                                        "slidingGame"
                                    ), {
                                        started: false,
                                        completed: false,
                                        time: "00::00",
                                        trials: 0,
                                        moves: 0,
                                        accuracy: 0,
                                        score: 0,
                                    }
                                );
                                await setDoc(
                                    doc(
                                        db,
                                        "users",
                                        auth.currentUser.uid,
                                        "puzzles",
                                        "sudoku"
                                    ), {
                                        started: false,
                                        completed: false,
                                        time: "00::00",
                                        trials: 0,
                                        accuracy: 0,
                                        score: 0,
                                    }
                                );
                                console.log(auth.currentUser.uid);
                                localStorage.setItem("uid", auth.currentUser.uid);
                                navigate("/startGame", {
                                    replace: "true"
                                });
                            });
                        } else {}
                    }
                }
            }
        }
        /> <
        /div> <
        /div>
    );
}

export default AuthScreen;
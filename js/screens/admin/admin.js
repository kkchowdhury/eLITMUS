import React from "react";
import {
    db,
    auth
} from "../../firebase-config.js";
import {
    collection,
    getDocs
} from "firebase/firestore";
import {
    useState,
    useEffect,
    useCallback
} from "react";
import "./admin.css";
import {
    useNavigate
} from "react-router-dom";

function AdminScreen() {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [users, setUsers] = useState([]);
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(userCollectionRef);

            setUsers(data.docs.map((doc) => ({ ...doc.data()
            })));
            console.log(data.docs[1].data());
        };
        getUsers();
    }, [refresh]);
    return ( <
        div className = "container" >
        <
        div className = "background" >
        <
        div className = "adminTopBar" >
        <
        h1 > ADMIN DASHBOARD < /h1> <
        /div> <
        div className = "centerbar" >
        <
        div style = {
            {
                display: "flex",
                width: "90%",
                flexDirection: "row",
                justifyItems: "start",
                alignItems: "baseline",
                textUnderlinePosition: "under",
            }
        } >
        <
        h2 style = {
            {
                width: "30%",
                paddingLeft: "30px"
            }
        } > {
            "User Name"
        } < /h2> <
        h2 style = {
            {
                width: "30%"
            }
        } > {
            "Email Id"
        } < /h2> <
        h2 style = {
            {
                width: "20%"
            }
        } > {
            "Current Level"
        } < /h2> <
        h2 style = {
            {
                width: "20%"
            }
        } > {
            "Current Score"
        } < /h2> <
        /div> {
            users.map((user) => {
                return ( <
                    div className = "centerbarComponents"
                    onClick = {
                        () => {
                            localStorage.setItem("uid", user.id);

                            navigate("/userDetails");
                        }
                    } >
                    <
                    h2 style = {
                        {
                            width: "20%"
                        }
                    } > {
                        user.userName
                    } < /h2> <
                    h2 style = {
                        {
                            width: "40%"
                        }
                    } > {
                        user.emailID
                    } < /h2> <
                    h2 style = {
                        {
                            width: "30%"
                        }
                    } > {
                        user.level
                    } < /h2> <
                    h2 style = {
                        {
                            width: "5%"
                        }
                    } > {
                        user.score
                    } < /h2> <
                    /div>
                );
            })
        } <
        /div> <
        /div> <
        /div>
    );
}

export default AdminScreen;
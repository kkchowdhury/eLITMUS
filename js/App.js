import React, {
    useState,
    useEffect
} from "react";
import Board from "./Board";
import {
    updateURLParameter
} from "./helpers";
import imageData from "../../../../assets/images/development/egypt.jpg";

function SlidingGame(props) {
    const [imgUrl, setImgUrl] = useState(imageData);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has("img")) {
            setImgUrl(urlParams.get("img"));
        }
    }, []);

    const handleImageChange = (e) => {
        setImgUrl(e.target.value);
        window.history.replaceState(
            "",
            "",
            updateURLParameter(window.location.href, "img", e.target.value)
        );
    };

    return ( <
        div className = "slidingPuzzle" >
        <
        Board score = {
            props.score
        }
        imgUrl = {
            imgUrl
        }
        func = {
            props.func
        }
        /> { /* <input value={imgUrl} onChange={handleImageChange} /> */ } <
        /div>
    );
}

export default SlidingGame;
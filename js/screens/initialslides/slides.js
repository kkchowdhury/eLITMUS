import {
    useState,
    useEffect
} from "react";
import {
    useNavigate
} from "react-router-dom";
import chronosphere from "../../assets/images/development/chronosphere.png";
import legend from "../../assets/images/development/legend.png";
import journey from "../../assets/images/development/journey.png";
import warning from "../../assets/images/development/warning.png";
import {
    auth
} from "../../firebase-config.js";
import "./slides.css";

function SlideShow() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [{
            title: "Welcome to Chronosphere",
            description: "Welcome to Chronosphere, a place beyond time and space. It is said that whoever reaches Chronosphere can manipulate time itself Do you have what it takes to enter Chronosphere?",
            image: chronosphere,
        },
        {
            title: "The Legend",
            description: "According to the legend, Chronosphere is a place where time has no meaning. It is said that whoever enters Chronosphere gains access to the power of time. The Chronosphere is located in a place beyond our universe, accessible only to those who can solve the mysterious puzzles guarding its entrance.",
            image: legend,
        },
        {
            title: "The Journey",
            description: "The journey to Chronosphere is full of challenges and obstacles. The puzzles you encounter along the way will test your wit and intellect. But the reward is worth it. For whoever reaches Chronosphere gains the ability to manipulate time itself. Are you ready to embark on this epic journey?",
            image: journey,
        },
        {
            title: "The Warning",
            description: "Be warned, not everyone who attempts to enter Chronosphere succeeds. If you fail to solve the puzzles guarding Chronosphere's entrance, you will be sent back to your home in your original timeline. You will have to start your journey all over again. Only the most skilled and persistent travelers can enter Chronosphere.",
            image: warning,
        },
    ];

    return ( <
        div >
        <
        div className = "slidesBackground" > < /div> <
        div className = "startGameNow" > < /div> <
        div className = "screenBG" >
        <
        div className = "screen" >
        <
        h1 className = "title" > {
            slides[currentSlide].title
        } < /h1> <
        img className = "imageStyle"
        src = {
            slides[currentSlide].image
        }
        alt = {
            slides[currentSlide].title
        }
        /> <
        p className = "info" > {
            slides[currentSlide].description
        } < /p> <
        div className = "submit"
        onClick = {
            () => {
                if (currentSlide === slides.length - 1) {
                    console.log("navigations");
                    // Redirect to the next screen
                    //   window.location.href = "/next-screen";
                    if (auth.currentUser) {
                        navigate("/startGame");
                    } else {
                        navigate("/auth");
                    }
                } else {
                    console.log("sliding");
                    // Move to the next slide after 10 seconds
                    setCurrentSlide(currentSlide + 1);
                }
            }
        } >
        Coninue <
        /div> <
        /div> <
        /div> <
        /div>
    );
}

export default SlideShow;
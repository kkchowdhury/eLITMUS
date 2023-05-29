import "./chronosphere.css";
import {
    useNavigate
} from "react-router-dom";
import {
    useState,
    useEffect
} from "react";
import imag1 from "../../assets/images/timetravel4.gif";
import imag2 from "../../assets/images/timetravel3.gif";
import imag3 from "../../assets/images/timetravel2.gif";
import imag4 from "../../assets/images/timetravel1.gif";
import imag5 from "../../assets/images/timetravel8.gif";
import imag6 from "../../assets/images/development/chronosphere.png";

function ChronoSphere(params) {
    const navigate = useNavigate();
    const [currentPath, setPath] = useState(0);
    var path = [imag1, imag2, imag3, imag4, imag5, imag6];
    const currentimg = path[currentPath];
    useEffect(() => {
        if (currentPath < 5) {
            const timer = setTimeout(() => {
                setPath(currentPath + 1);
            }, 2000);
        } else {}
        console.log(currentPath);
    }, [currentPath]);
    return ( <
        >
        <
        img className = "chronoSphereBG"
        src = {
            currentimg
        }
        sizes = "scale" > < /img> <
        />
    );
}

export default ChronoSphere;
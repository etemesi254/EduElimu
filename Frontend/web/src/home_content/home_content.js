import {AiOutlinePlus} from "react-icons/ai";
import "./home_content.css";
import CarouselImage from "../carousell/carousell";

function HomeContent(){
    return <div className="home-image">
        <CarouselImage/>
    
    {/* <div className="display">
        <div className="display-img">
            <img src={`${process.env.PUBLIC_URL}/assets/home (1).jpg`} alt="Example" id="active" />
        </div>
        <div className="display-img">
            <img src={`${process.env.PUBLIC_URL}/assets/home (2).jpg`} alt="Example" />
        </div>
        <div className="display-img">
            <img src={`${process.env.PUBLIC_URL}/assets/home (3).jpg`} alt="Example" />
        </div>
    </div> */}

</div>
}

export default HomeContent;
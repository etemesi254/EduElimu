import {AiOutlinePlus} from "react-icons/ai";
import "./home_content.css";

function HomeContent(){
    <div className="home-image">
        <div className="creator-name">
            <p>Megan Dette</p>
        </div>
        <img src={`${process.env.PUBLIC_URL}/assets/home (1).jpg`} alt="Example" id="main-img" />
        <h2>Learn Algebra</h2>
        <p>Learn algebra from scratch</p>
        <div className="controls">
            <button>watch</button>
            <button><AiOutlinePlus/></button>
        </div>
        <div className="display">
            <div className="display-img">
                <img src={`${process.env.PUBLIC_URL}/assets/home (1).jpg`} alt="Example" id="active" />
            </div>
            <div className="display-img">
                <img src={`${process.env.PUBLIC_URL}/assets/home (2).jpg`} alt="Example" />
            </div>
            <div className="display-img">
                <img src={`${process.env.PUBLIC_URL}/assets/home (3).jpg`} alt="Example" />
            </div>
        </div>

    </div>
}

export default HomeContent;
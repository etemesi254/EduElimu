import ProgressBar from "./progressbar";
import "./splash_screen.css";
import {GiConsoleController} from 'react-icons/gi';

function GameSplashScreen(){
    return <section className="game-sec" style={{
        backgroundImage: `url("./assets/gamesplash.jpg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        }}>
       <div> 
            <h1>EduElimu Presents</h1>
            <div className="game-sec-div">
                <h3>INTERACTIVE GAMES</h3>
            </div>
            <div className="progressbar-div">
                <h4>Loading...</h4>
                <ProgressBar/>
            </div>
        </div>
    </section>
}
export default GameSplashScreen;
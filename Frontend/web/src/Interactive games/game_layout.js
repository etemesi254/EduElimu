import {AiFillCloseSquare} from 'react-icons/ai';
import { Outlet } from 'react-router-dom';
import "./game_layout.css";

function GameLayout(){
    return <>
        <section className="game-layout">
            <nav>
                <div className="game-stats">
                    <div className="stats-container">
                        <img src={process.env.PUBLIC_URL+"/assets/coin.png"} id='coins'/>
                        <span>200</span>
                    </div>
                    <div className="stats-container">
                        <img src={process.env.PUBLIC_URL+"/assets/straks.png"} id='streaks'/>
                        <span>200</span>
                    </div>
                    <div className="stats-container">
                        <div>
                            <img src={process.env.PUBLIC_URL+"/assets/poster (1).jpg"} id='img'/>
                        </div>
                    </div>
                </div>
                <div className="stats-container">
                    <AiFillCloseSquare id='close'/>
                </div>
            </nav>
            <Outlet/>
        </section>
    </>
}
export default GameLayout;
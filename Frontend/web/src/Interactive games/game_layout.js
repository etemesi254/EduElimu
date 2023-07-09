import {AiFillCloseSquare,AiOutlineHome} from 'react-icons/ai';
import { Link, Outlet } from 'react-router-dom';
import "./game_layout.css";

function GameLayout(){
    return <>
        <section className="game-layout">
            <nav>
                <div>
                    <h3>EDUELIMU</h3>
                    <h4>Interactive Games</h4>
                </div>
                <div className='flex-nav'>
                    <div className="game-stats">
                        <div className="stats-container">
                            <Link to="/interactive_games/dashboard">
                                <AiOutlineHome id='home'/>
                            </Link>
                        </div>
                        <div className="stats-container">
                            <div>
                                <img src={process.env.PUBLIC_URL+"/assets/poster (1).jpg"} id='img'/>
                            </div>
                        </div>
                    </div>
                    <div className="stats-container">
                        <Link to={"/"}>
                            <AiFillCloseSquare id='close'/>
                        </Link>
                    </div>
                </div>
            </nav>
            <Outlet/>
        </section>
    </>
}
export default GameLayout;
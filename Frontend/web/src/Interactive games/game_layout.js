import {AiFillCloseSquare,AiOutlineHome} from 'react-icons/ai';
import { Link, Outlet } from 'react-router-dom';
import "./game_layout.css";
import { useUserContext } from '../context/UserContext';

function GameLayout(){
    const {user} = useUserContext();

    const displaypic = user && user.profile_image ? `http://127.0.0.1:8000/storage/${user.profile_image}`:`${process.env.PUBLIC_URL}/assets/eduelimu.png`;
    
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
                                <img src={displaypic} id='img'/>
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
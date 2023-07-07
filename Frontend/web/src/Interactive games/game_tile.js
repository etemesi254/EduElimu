import "./game_tile.css";
import {BiMath,BiAtom,BiTimeFive} from "react-icons/bi";
import {RiEnglishInput} from "react-icons/ri";
import {SlChemistry} from "react-icons/sl";
import {FaBiohazard} from "react-icons/fa";
import {TiWeatherPartlySunny} from "react-icons/ti";
import GameProgress from "./game_progress";

function GameTile({category}){
    let IconComponent;
        switch (category.icon) {
            case 'BiMath':
                IconComponent = BiMath;
                break;
            case 'RiEnglishInput':
                IconComponent = RiEnglishInput;
                break;
            case 'SlChemistry':
                IconComponent = SlChemistry;
                break;
            case 'BiAtom':
                IconComponent = BiAtom;
                break;
            case 'FaBiohazard':
                IconComponent = FaBiohazard;
                break;
            case 'BiTimeFive':
                IconComponent = BiTimeFive;
                break;
            case 'TiWeatherPartlySunny':
                IconComponent = TiWeatherPartlySunny;
                break;
          default:
            IconComponent = null;
            break;
        }

        const quizStyle = {
            color: category.color,
            backgroundColor: category.backgroundColor,
          };
        const iconDiv = {
            backgroundColor:category.color
        }        
    return <>
        <div className="game-tile">
            <div className="game-tile-icon" style={iconDiv}>
                <IconComponent/>
            </div>
            <h3>{category.subject}</h3>
            <p>Explore more in the world of {category.subject}</p>
            <div className="game-tile-progress">
                <div>
                    <span>Progress</span>
                    <span>{category.percentage}%</span>
                </div>
            <GameProgress progress = {category.percentage}/>
            </div>
            <div className="game-tile-count">
                <p style={quizStyle}>5 quizzes</p>
            </div>
        </div>
    </>
}
export default GameTile;
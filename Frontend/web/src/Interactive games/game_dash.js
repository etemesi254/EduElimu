import { useState } from "react";
import { gamedata,Category_data } from "./game_data";
import GameTile from "./game_tile";


import "./game_dash.css";
import { Link } from "react-router-dom";

function GameDashboard(){
    
    const [categories,setCategories] = useState(Category_data);
    
    return <>
     <div className="game-dashboard-container">
        {categories.map((category,index)=>{
            const linkTo = `/interactive_games/dashboard/${category.subject}/${category.color}/${category.icon}`;
            return <Link to={linkTo} >
                <GameTile category={category}/>
            </Link>
        })}
     </div>
    </>
}
export default GameDashboard;
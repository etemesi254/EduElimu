import { useState } from "react";
import { gamedata,Category_data } from "./game_data";
import GameTile from "./game_tile";

import "./game_dash.css";

function GameDashboard(){
    const [games,setGames] = useState(gamedata);
    const [categories,setCategories] = useState(Category_data);


    return <>
     <div className="game-dashboard-container">
        {categories.map((category,index)=>{
            return <GameTile category={category}/>
        })}
     </div>
    </>
}
export default GameDashboard;
import { Link, useParams } from "react-router-dom";
import { gamedata } from "./game_data";
import GameCategoryTile from "./game_cate_tile";
import { useState } from "react";

function GameCategoryDash(){
    const {category,color,icon} = useParams();

    const [games,setGames] = useState(gamedata);
    const filteredData = games.filter((game) => game.category.toLowerCase() === category.toLowerCase());

    return <>
       <div className="game-dashboard-container">
        {filteredData.map((data,index)=>{
            let linkTo = `/interactive_games/dashboard/${encodeURIComponent(
                JSON.stringify(data)
              )}`;
            return <Link to= {linkTo}>
                <GameCategoryTile data={data} color={color} icon={icon}/>
            </Link>
        })}
     </div>
    </>
}
export default GameCategoryDash;
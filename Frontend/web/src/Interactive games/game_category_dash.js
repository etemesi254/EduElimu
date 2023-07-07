import { useParams } from "react-router-dom";
import { gamedata } from "./game_data";
import GameCategoryTile from "./game_cate_tile";
import { useState } from "react";

function GameCategoryDash(){
    const {category} = useParams();
    console.log(category);

    const [games,setGames] = useState(gamedata);
    const filteredData = games.filter((game) => game.category.toLowerCase() === category.toLowerCase());


    console.log(filteredData);

    return <>
       <div className="game-dashboard-container">
        <h1>hello</h1>
        {filteredData.map((data,index)=>{
            return <GameCategoryTile data={data}/>
        })}
     </div>
    </>
}
export default GameCategoryDash;
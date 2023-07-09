import { BiMath, BiAtom, BiTimeFive } from "react-icons/bi";
import { RiEnglishInput } from "react-icons/ri";
import { SlChemistry } from "react-icons/sl";
import { FaBiohazard } from "react-icons/fa";
import { TiWeatherPartlySunny } from "react-icons/ti";
import { useEffect, useState } from "react";

function GameCategoryTile({ data,color, icon }) {
//   const [color, setColor] = useState("");
//   const [icon, setIcon] = useState("");

//   useEffect(() => {
//     const storedColor = localStorage.getItem("color");
//     const storedIcon = localStorage.getItem("icon");
//     setColor(storedColor);
//     setIcon(storedIcon);
//   }, []);
console.log(icon)

  let IconComponent;

  switch (icon) {
    case "BiMath":
      IconComponent = BiMath;
      break;
    case "RiEnglishInput":
      IconComponent = RiEnglishInput;
      break;
    case "SlChemistry":
      IconComponent = SlChemistry;
      break;
    case "BiAtom":
      IconComponent = BiAtom;
      break;
    case "FaBiohazard":
      IconComponent = FaBiohazard;
      break;
    case "BiTimeFive":
      IconComponent = BiTimeFive;
      break;
    case "TiWeatherPartlySunny":
      IconComponent = TiWeatherPartlySunny;
      break;
    default:
      IconComponent = null;
      break;
  }

  const iconDiv = {
    backgroundColor: color,
  };

  return (
    <div className="game-tile">
      <div className="game-tile-icon" style={iconDiv}>
        {icon && <IconComponent />}
      </div>
      <h3>{data.category}</h3>
      <p>{data.name}</p>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          overflow: "hidden",
          height: "180px",
        }}
      >
        <iframe
          src={data.link}
          title={data.name}
          style={{ flex: "1", height: "100%" }}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default GameCategoryTile;

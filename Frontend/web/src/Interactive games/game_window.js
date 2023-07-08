import { useParams } from "react-router-dom";

function GameWindow(){
    const {quiz} = useParams();
    const data = JSON.parse(decodeURIComponent(quiz));

    const { link, name } = data;

    return  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', minHeight: '100vh' }}>
    <iframe src={link} title={name} style={{ flex: '1' }} frameBorder="0" allowFullScreen></iframe>
  </div>
}
export default GameWindow; 
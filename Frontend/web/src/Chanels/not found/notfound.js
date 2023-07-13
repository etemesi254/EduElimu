import "./notfound.css";
function NotFound(){
    return <div className="not-found">
    <div id="div">
        <div className="not-found-container">
        <img src={`${process.env.PUBLIC_URL}/assets/not_found.png`}/>
        </div>
        <h2>No videos here :(</h2>
    </div>
  </div>
}
export default NotFound;
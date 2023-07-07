function GameCategoryTile({data}){
    return <div className="game-tile">
    <div className="game-tile-icon">
        <p>En</p>
    </div>
    <h3>{data.category}</h3>
        <p>{data.name}</p>
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden',height:"180px" }}>
    <iframe src={data.link} title={data.name} style={{ flex: '1', height: '100%' }} frameBorder="0" allowFullScreen></iframe>
    </div>


</div>
}
export default GameCategoryTile;
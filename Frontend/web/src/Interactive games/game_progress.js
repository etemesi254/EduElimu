import React from 'react';
import './game_progress.css';

const GameProgress = ({ progress }) => {
  return (
    <div className="progress-bar-game">
      <div className="progress" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default GameProgress;

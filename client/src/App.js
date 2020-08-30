import React from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './Canvas';

const Score = () => <div>Score</div>;
const LeaderBoard = () => <div>LeaderBoard</div>
const GameMessage = () => <div>Game Message</div>

function App() {

  const draw = (ctx, frameCount) => {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
        ctx.fillStyle = '#000000'
        ctx.beginPath()
        ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
        ctx.fill()
    }
  return <div><Canvas draw={draw}/> <Score /> <LeaderBoard /> <GameMessage /> </div>
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import Canvas from './Canvas';
import { mouseMoveHandler } from './util';
import io from 'socket.io-client';

const Score = () => <div>Score</div>;
const LeaderBoard = () => <div>LeaderBoard</div>
const GameMessage = () => <div>Game Message</div>

function App() {
  const [playerPos, setPlayerPos] = useState({
      locX: Math.floor(500*Math.random()+10),
      locY: Math.floor(500*Math.random()+10)
  });

  const [socket, setSocket] = useState();

  useEffect(() => {
    const s = io('http://localhost:8000');
    if(s) {
      setSocket(s);
    }    
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('init', (data) => {
        console.log(data.orbs);
      })
    }
  }, [socket]);

  const handleMouseMove = (e, canvas) => {
    const updatedPlayer = mouseMoveHandler(e, playerPos, canvas)
    setPlayerPos(updatedPlayer);
  }

  const draw = (ctx, frameCount) => {
  //   let randomX = Math.floor(500*Math.random()+10);
  // let randomY = Math.floor(500*Math.random()+10);

    ctx.canvas.width  = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // Init translate, set to default
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const camX = -playerPos.locX + ctx.canvas.width / 2;
    const camY = -playerPos.locY + ctx.canvas.height  /2;
    ctx.translate(camX, camY);

        ctx.beginPath();
        ctx.fillStyle = "rgb(255,0,0)";
        ctx.arc(playerPos.locX, playerPos.locY, 10, 0, Math.PI*2);
        ctx.arc(200,200, 10, 0, Math.PI *2);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgb(0,255,0)';
        ctx.stroke();
    }
  return <div className="App"><Canvas draw={draw} onMouseMove={handleMouseMove}/> <Score /> <LeaderBoard /> <GameMessage /> </div>
}

export default App;

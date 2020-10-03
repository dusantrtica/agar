import React, { useCallback, useEffect, useRef, useState } from 'react';
import './App.css';
import Canvas from './Canvas';
import { mouseMoveHandler } from './util';
import io from 'socket.io-client';

const Score = () => <div>Score</div>;
const LeaderBoard = () => <div>LeaderBoard</div>;
const GameMessage = () => <div>Game Message</div>;

var i = 0;

function App() {
  const [orbs, setOrbs] = useState([]);
  const [players, setPlayers] = useState([]);

  const [socket, setSocket] = useState();
  const [player, setPlayer] = useState({ locX: 0, locY: 0 });
  const [{ xVector, yVector }, setVector] = useState({
    xVector: 0,
    yVector: 0,
  });

  useEffect(() => {
    const s = io('http://localhost:8000');
    if (s) {
      setSocket(s);
    }
  }, []);

  const sendVectors = () => {};

  useEffect(() => {
    console.log('Called useEffect');

    if (socket) {
      socket.emit('init', {
        playerName: 'Dusan',
      });
      socket.on('initReturn', (data) => {
        setOrbs(data.orbs);
        setInterval(sendVectors, 500);
      });
      socket.on('tock', (data) => {
        setPlayers(data.players);
        setPlayer(data.player);
      });
    }
  }, [socket]); // eslint-disable-line

  const handleMouseMove = (e, canvas) => {
    const updatedVector = mouseMoveHandler(e, canvas);
    i += 1;
    // console.log({ updatedVector }, i);
    setVector({ ...updatedVector });
  };

  const draw = (ctx, frameCount) => {
    //   let randomX = Math.floor(500*Math.random()+10);
    // let randomY = Math.floor(500*Math.random()+10);

    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // Init translate, set to default
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    const camX = -player.locX + ctx.canvas.width / 2;
    const camY = -player.locY + ctx.canvas.height / 2;
    ctx.translate(camX, camY);

    ctx.beginPath();
    ctx.fillStyle = 'rgb(255,0,0)';
    ctx.arc(player.locX, player.locY, 10, 0, Math.PI * 2);
    // ctx.arc(200, 200, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = 'rgb(0,255,0)';
    ctx.stroke();

    // draw all the players
    players.forEach((p) => {
      ctx.beginPath();
      ctx.fillStyle = p.color;
      ctx.arc(p.locX, p.locY, 10, 0, Math.PI * 2);
      // ctx.arc(200, 200, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 3;
      ctx.strokeStyle = 'rgb(0,255,0)';
      ctx.stroke();
    });

    // draw all the orbs
    orbs.forEach((orb) => {
      ctx.beginPath();
      ctx.fillStyle = orb.color;
      ctx.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
      ctx.fill();
    });
  };
  return (
    <div className="App">
      <Canvas draw={draw} onMouseMove={handleMouseMove} /> <Score />{' '}
      <LeaderBoard /> <GameMessage />{' '}
    </div>
  );
}

export default App;

import React from 'react';
import useCanvas from './useCanvas';
import './index.scss';

const inititalDraw = (ctx) => {};

const Canvas = ({ draw = inititalDraw, onMouseMove, ...rest }) => {
  const canvasRef = useCanvas({ draw, onMouseMove });

  return <canvas ref={canvasRef} {...rest}></canvas>;
};

export default Canvas;

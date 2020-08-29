import React, { useRef, useEffect } from 'react';
import useCanvas from './useCanvas';

const inititalDraw = (ctx) => {}

const Canvas = ({draw = inititalDraw, ...rest}) => {
    const canvasRef = useCanvas(draw);

    return <canvas ref={canvasRef} {...rest} />
}

export default Canvas;
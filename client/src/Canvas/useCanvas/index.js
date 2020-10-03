import { useEffect, useRef } from 'react';

const useCanvas = ({ draw, onMouseMove }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    console.log('use effect of canvas');
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', (e) => onMouseMove(e, canvas));
    const context = canvas.getContext('2d');

    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw]); // eslint-disable-line

  return canvasRef;
};

export default useCanvas;

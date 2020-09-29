import { useEffect, useRef } from 'react';

const useCanvas = ({ draw, onMouseMove }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener('mousemove', (e) => onMouseMove(e, canvas));
    const context = canvas.getContext('2d');

    let frameCount = 0;
    let animationFrameId;

    const render = () => {
      frameCount += 1;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [draw, onMouseMove]);

  return canvasRef;
};

export default useCanvas;

export const mouseMoveHandler = (event, player, canvas) => {
    const mousePosition = {
        x: event.clientX,
        y: event.clientY
    };
    let xVector;
    let yVector;
    
    const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
    if(angleDeg >= 0 && angleDeg < 90){
        xVector = 1 - (angleDeg/90);
        yVector = -(angleDeg/90);
    }else if(angleDeg >= 90 && angleDeg <= 180){
        xVector = -(angleDeg-90)/90;
        yVector = -(1 - ((angleDeg-90)/90));
    }else if(angleDeg >= -180 && angleDeg < -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 + ((angleDeg+90)/90));
    }else if(angleDeg < 0 && angleDeg >= -90){
        xVector = (angleDeg+90)/90;
        yVector = (1 - ((angleDeg+90)/90));
    }

    const speed = 10;
    const xV = xVector;
    const yV = yVector;

    if((player.locX < 5 && player.xVector < 0) || (player.locX > 500 && xV > 0)){
        player.locY -= speed * yV;
    }else if((player.locY < 5 && yV > 0) || (player.locY > 500 && yV < 0)){
        player.locX += speed * xV;
    }else{
        player.locX += speed * xV;
        player.locY -= speed * yV;
    }

    return player;
}

import io from 'socket.io-client';

let socket = io('http://localhost:8000')

socket.on('init', (data) => {
    console.log(data.orbs);
})


export {socket};
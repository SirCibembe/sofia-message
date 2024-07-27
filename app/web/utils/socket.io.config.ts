import { io, Socket } from 'socket.io-client';

const URL = 'http://localhost:8000';
const socket: Socket = io(URL, {
   // withCredentials: true,
   // extraHeaders: {
   //    "my-custom-header": "abcd"
   // }
   transports: ['websocket']
});

export default socket;

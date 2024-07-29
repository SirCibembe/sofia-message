import { io, Socket } from 'socket.io-client';

const BACKEND_URL = 'http://localhost:8000';
const socket: Socket = io(BACKEND_URL, {
   // withCredentials: true,
   // extraHeaders: {
   //    "my-custom-header": "abcd"
   // }
   transports: ['websocket']
});

export default socket;

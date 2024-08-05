import { io, Socket } from 'socket.io-client';
import appConfig from './app.config';


const socket: Socket = io(appConfig.BACKEND_URL|| '', {
   // withCredentials: true,
   // extraHeaders: {
   //    "my-custom-header": "abcd"
   // }
   transports: ['websocket']
});

export default socket;

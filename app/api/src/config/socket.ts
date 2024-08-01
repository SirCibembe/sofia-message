import { Server, Socket } from "socket.io";
let io: any;

export function initSocket(server: any) {
   io = new Server(server, {
      cors: {
         origin: "*",
         methods: ["GET", "POST", "PUT", "DELETE"],
      }
   });

   io.on('connection', (socket: Socket) => {
      console.log('a user connected');

      socket.on('disconnect', () => {
         console.log('user disconnected');
      });

      socket.on('sendMessage', (message) => {
         io.emit('receiveMessage', message);
      });
   });
};
export const getIo = () => {
   if (!io) {
      throw new Error('Socket.io not initialized!');
   }
   return io;
};
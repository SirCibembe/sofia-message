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
      // when user is connected
      // console.log('a user connected');

      // socket.broadcast.emit('message', `user with ${socket.id.substring(0, 5)} is connected`);
      // socket.emit('message', 'Welcome to chat');


      // socket.emit('typing', 'typing...');


      socket.on('sendMessage', (message) => {
         io.emit('receiveMessage', message);
      });

      // when user disconnect -> all users 
      socket.on('disconnect', () => {
         console.log('disconnected');
         socket.broadcast.emit('message', `user with ${socket.id.substring(0, 5)} is disconnected`);
      });


      // listen for activity

      // socket.on('typing', function () {
      //    socket.broadcast.emit('typing...');
      // });

      socket.on('typing', (data) => {
         socket.broadcast.emit('typing', data);
     });
 
     // Listen for stop typing events
     socket.on('stopTyping', (data) => {
         socket.broadcast.emit('stopTyping', data);
     })
   });
};
export const getIo = () => {
   if (!io) {
      throw new Error('Socket.io not initialized!');
   }
   return io;
};
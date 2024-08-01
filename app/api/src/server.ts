/**
 * @license
 * Copyright 2024 Birusha Ndegeya, sofia and Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import notFound from './controllers/notfound';
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes';
import messageRouter from './routes/message.routes';
import currentUserRouter from './routes/current.routes';
import http from 'http';
// import { initSocket } from "./config/socket";
// import { Server, Socket } from 'socket.io'
// import mainConfig from './config/config';

const app: Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());

const server = http.createServer(app);
// export const io = new Server(server, {
//    cors: {
//       origin: mainConfig.WEB_LINK,
//       methods: ['GET', 'POST', 'PUT', 'DELETE']
//    }
// });

// io.on('connection', function (socket: Socket) {
//    console.log('User Id: ', socket.id);
//    console.log('User Name: ', socket.id) ;

//    // console.log('working!!');

//    socket.on('sendMessage', function (data: any) {
//       socket.broadcast.emit('receivedMessage', data);
//       console.log(data);
//    })


//    // socket.on('message', function (data: any) {
//    //    console.log(data);
//    // });

//    socket.on('disconnect', () => {
//       console.log(`user disconnected ${socket.id}`);
//    });
// });

app.use('/api/getcurrentuser/', currentUserRouter);
app.use('/', authRouter);
app.use('/', userRouter);
app.use('/', messageRouter);
app.get('*', notFound)


export default server;
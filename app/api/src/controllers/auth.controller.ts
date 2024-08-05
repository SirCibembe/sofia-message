import { Request, Response, NextFunction } from "express";
import userSchema, { authenticate } from "../models/user.model";
import jwt from 'jsonwebtoken';
import mainConfig from '../config/config';
import { expressjwt } from 'express-jwt';

export default class AuthController {
   static async signin(req: Request, res: Response): Promise<void> {
      const { userEmail, userPassword } = req.body;
      try {
         const user = await userSchema.findUnique({
            where: {
               userEmail: userEmail
            }
         });
         if (!user) {
            res.status(401).json({ error: 'User not found!' });
            return;
         }
         if (!await authenticate(userPassword, user.userPassword)) {
            res.status(401).json({
               error: "Email and Password don't match"
            });
            return;
         }
         const token = jwt.sign({ userId: user.userId }, mainConfig.jwtSecret);
         // const delaisExpirationCookie = new Date().getMilliseconds() + 9999999; I cannot extend times as I want
         res.cookie('accesstoken', token, { expires: new Date() });
         // console.log(token);
         res.status(200).json({
            statusCode: 200,
            message: 'Login sucessfully',
            data: {
               accessToken: token,
               userId: user.userId,
               userName: user.userName,
               userDescription: user.userDescription,
               userEmail: user.userEmail,
               userAvatarURL: user.userAvatarURL,
               created: user.created
            }
         });
      } catch (error: any) {
         console.log(error.stack);
         return;
      }
   }

   static signout(_: Request, res: Response) {
      res.clearCookie('accesstoken');
      res.status(200).json({
         message: 'signed out!'
      });
   }

   static requireSignin = expressjwt({
      secret: mainConfig.jwtSecret,
      algorithms: ["HS256"]
   },);

   static hasAuthorization(
      req: Request | any,
      res: Response,
      next: NextFunction
   ) {
      const authorized = req.profile && req.auth && req.profile.userId && req.auth.userId;
      if (!(authorized)) {
         res.status(403).json({
            error: 'User is not authorized!'
         });
      }
      console.log(authorized);
      next();
   }

   /**
    * VERIFY TOKEN
    */

   static async verifyToken(req: Request, res: Response) {
      const token = req.body.token;
      if (!token) {
         res.send({ authenticated: false });
         return;
      }
      jwt.verify(token, mainConfig.jwtSecret, (err: any, _: any) => {
         if (err) {
            res.status(401).send({ authenticated: false });
         }
         res.send({ authenticated: true });
      });
   }
}

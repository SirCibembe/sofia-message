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
import { Request, Response, NextFunction } from "express";
import userSchema from "../models/user.model";
import isValidEmail from '../utils/isValidEmail';
import isValidInput from '../utils/isValidInput';
import isValidPassword from '../utils/isValidPassword';
import { encryptPassword } from "../models/user.model";
// import formidable from 'formidable';
// import fs from 'fs';
// import path from 'path';
import client from "../client";

export default class UserController {
   static async create(req: Request, res: Response): Promise<void> {
      /*
     ===================================================================================
     CREATE A NEW USER | REGISTER USER
     ===================================================================================
     */
      const { userEmail, userPassword, userName } = req.body;
      try {
         if (!isValidEmail(userEmail)) {
            res.send('Invalid email adress');
            return;
         }
         if (!isValidInput(userName)) {
            res.send('Enter a name');
            return;
         }
         if (!isValidPassword(userPassword)) {
            res.send('The password must be at least 6 characters long, must contain at least one letter, must contain at least one number and must not be an empty string');
            return;
         }

         // Handle avatar URL if provided
         // let avatarURL: string | null = null;
         // if (userAvatarURL) {
         //    try {
         //       const result = await cloudinary.uploader.upload(userAvatarURL, {
         //          folder: 'avatars' // Optionally specify a folder in Cloudinary
         //       });
         //       avatarURL = result.secure_url;
         //    } catch (uploadError) {
         //       res.status(400).json({
         //          status: "Bad request",
         //          message: "Avatar upload unsuccessful",
         //          statusCode: 400,
         //          error: uploadError.message
         //       });
         //       return;
         //    }
         // }


         /**
          * hash password in order to store it in the data
          * warning: Don't store plain text into a database
          */
         const hashPassword = await encryptPassword(userPassword);
         const user = await userSchema.create({
            data: {
               userEmail,
               userPassword: hashPassword,
               userName
            },
         });
         res.status(201).json({
            status: "created",
            message: "Registration successful",
            data: {
               userId: user.userId,
               userName: user.userName,
               userEmail: user.userEmail,
               userDescription: null,
               userAvatarURL: user.userAvatarURL
            }
         });
      } catch (error: any) {
         res.status(400).json({
            status: "Bad request",
            message: "Registration unsuccessful",
            statusCode: 400,
            error: error.message
         });
      } finally {
         await client.$disconnect();
      }

   }

   static async list(_: Request, res: Response): Promise<void> {
      /*
      ===================================================================================
      GET ALL USERS
      ===================================================================================
      */
      try {
         const allUsers = await userSchema.findMany({
            select: {
               userId: true,
               userName: true,
               userEmail: true,
               created: true,
               updated: true,
               userAvatarURL: true,
               userDescription: true
            }
         });
         if (!allUsers) {
            res.send('cannot retrieve all users!');
            return;
         }
         res.status(200).json({
            status: "OK",
            message: 'retrieve all users succesfully',
            users: allUsers,
         });
      } catch (error: any) {
         res.status(400).json({
            status: "Bad request",
            message: "failed to retrieve all users",
            statusCode: 400,
            error: error.message
         });
      } finally {
         await client.$disconnect();
      }
   }

   static async userById(
      req: Request | any,
      res: Response,
      next: NextFunction,
      userId: string
   ): Promise<void> {
      /*
      ===================================================================================
      GET A SPECIFIC USER BY ID
      ===================================================================================
      */
      try {
         const user = await userSchema.findUnique({
            where: {
               userId: userId
            }
         });
         if (!user) {
            res.status(400).json('user not found!');
            return;
         }
         req.profile = user;
         next();
      } catch (error: any) {
         res.status(400).json({
            statusCode: 400,
            message: 'Could not retrieve user',
            error: error.message
         });
      } finally {
         await client.$disconnect();
      }
   }

   static read(req: Request | any, res: Response) {
      req.profile.role = null;
      req.profile.userPassword = null;
      res.send(req.profile);
   }

   static async update(
      req: Request | any,
      res: Response
   ) {
      const { userName, userEmail, userDescription, userAvatarURL, userPassword } = req.body;
      try {
         let user = req.profile;
         const id = user.userId;
         await userSchema.update({
            where: {
               userId: id
            },
            data: {
               userName: userName,
               userEmail: userEmail,
               userPassword: userPassword,
               userAvatarURL: userAvatarURL,
               userDescription: userDescription
               // updated: Date.now().toLocaleString() 
               // how to handle date errors in my code
            }
         })
         user.userPassword = null;
         user.role = null;
         res.json({
            message: "Updated successfully",
            user
         });
      } catch (error: any) {
         res.status(400).json({
            status: 'Bad request',
            message: 'Failed to update user information',
            statusCode: 400,
            error: error.message
         });
      }
   }

   static async remove(req: Request | any, res: Response): Promise<void> {
      try {
         const user = req.profile;
         await userSchema.delete({
            where: {
               userId: user.userId
            }
         });
         user.userPassword = undefined;
         user.role = null;
         res.json({
            message: "Deleted successfully"
         });
      } catch (error: any) {
         res.status(400).json({
            statusCode: 400,
            message: 'Failed to delete!',
            error: error.message
         });
      }
   }

   /**
    * @public
    */

   static async search(req: Request, res: Response): Promise<void> {
      try {
         const userName: any = req.query.name;
         const user = await userSchema.findMany({
            where: {
               userName: userName
            },
            select: {
               userAvatarURL: true,
               userDescription: true,
               userEmail: true,
               userName: true,
               userId: true,
            }
         });
         if (user.length == 0) {
            res.send('User not found');
            return;
         }
         res.json(user);

      } catch (error: any) {
         res.status(400).json({});
         return;
      } finally {
         await client.$disconnect();
      }
   }
}
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
"use client";
import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import { AiOutlineClose } from 'react-icons/ai';
import { FaUserEdit, FaFileImage } from 'react-icons/fa';
import { AuthContext } from "@/contexts/authContext";
import axios from "axios";


interface InputProps {
   userName?: string;
   userEmail?: string;
   userAvatar?: string;
   userDescription?: string;
}

export default function UpdateProfile({
   cancel,
   visibility,
   userProfileId,
}: {
   cancel: () => void;
   visibility: boolean;
   userProfileId?: string | null;
}) {
   const { userName, userDescription, userEmail } = useContext(AuthContext);
   const [loading, setLoading] = useState(true);
   const [userProfile, setUserProfile] = useState<any>([]);
   const { register, handleSubmit } = useForm<InputProps>();
   // load profile information

   useEffect(() => {
      const controller = new AbortController();
      const fetchData = async () => {
         try {
            const currentUserData = await axios.get(`http://localhost:8000/api/users/${userProfileId}`, {
               headers: {
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
               }
            });
            const result = await currentUserData;
            setUserProfile(result.data);
            setLoading(!loading);
         } catch (err) {
            console.log('Failed to fetch users');
            setLoading(!loading);
         }
      }
      fetchData()
   }, []);

   const onSubmit: SubmitHandler<InputProps> = async (updatedData) => {
      // const { userName, userEmail, userDescription } = d;
      // console.log(d);
      // console.log(awai/t d.userName);
      // console.log(d.userDescription);
      // console.log(userName);
      const updateProfile: () => Promise<void> = async () => {
         try {
            const resp = await axios.put(`http://localhost:8000/api/users/${userProfileId}`, {
               headers: {
                  'Accept': 'application/json',
               },
               data: JSON.stringify(await updatedData)
            });
            const result = await resp.data;
            console.log(result);
         } catch (err) {
            console.warn(err);
         }
      }
      updateProfile();
   }


   return (
      <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ${visibility ? '' : "hidden"} `}>
         <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 bg-white border border-gray-300 rounded-lg shadow">

            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal" onClick={cancel}>
               <AiOutlineClose
                  className="w-3 h-3"
               />
            </button>
            {/* kdkddk */}

            <div className="p-4 md:p-5 text-center">
               <FaUserEdit
                  className='mx-auto mb-4 text-gray-400 w-12 h-12'
               />
               <h3 className="mb-5 text-lg font-normal text-gray-500">Edit Profile</h3>

               {/* dkdkdk */}

               <Input
                  type="text"
                  register={register}
                  refLabel="userName"
                  label="Name"
                  placeholder={userName ? userName : userProfile.userName}
               />
               <Input
                  type="email"
                  register={register}
                  refLabel="userEmail"
                  label="Email Address"
                  placeholder={userName ? userEmail : userProfile.userEmail}
               />

               <div className="mb-4">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea placeholder={userProfile.userDescription ? userProfile.userDescription : userDescription ? userDescription : "I am a mysterious who has yet to fill out my bio"}
                     {...register('userDescription')} className="mt-1 p-2 border rounded w-full" />
               </div>

               <div className="bg-black my-4 p-4 flex items-center justify-center">
                  <FaFileImage size={24} color="white" />
                  <input type="file" className="file:bg-slate-800 file:text-slate-800 file:collapse placeholder:hidden" placeholder="" />
               </div>

               <div className="flex justify-end gap-5">
                  <Button
                     className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                     title="CANCEL"
                     handleClick={cancel}
                  />
                  <button
                     type="submit"
                     className="font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center bg-blue-400 hover:bg-blue-500 text-gray-50  focus:ring-4 focus:ring-blue-300 focus:outline-none border focus:z-10"
                  >
                     SAVE
                  </button>
               </div>
            </div>
         </form>
      </div>
   )
}
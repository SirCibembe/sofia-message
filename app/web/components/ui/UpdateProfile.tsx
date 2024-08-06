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
import Input from "./Input";
import { AiOutlineClose } from 'react-icons/ai';
import { FaUserEdit, FaFileImage } from 'react-icons/fa';
import { AuthContext } from "@/contexts/authContext";
import axiosInstance from "@/config/axios.config";
import { toast, ToastContainer } from "react-toastify";

interface InputProps {
   userName?: string;
   userEmail?: string;
   userAvatar?: string;
   userDescription?: string;
   file: Buffer | any;
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
   const { register, handleSubmit } = useForm<InputProps>();
   const { userName, userDescription, userEmail, setUserDescription, setUserEmail, setUserName } = useContext(AuthContext);
   const [userProfile, setUserProfile] = useState<any>([]);

   // Load profile information
   useEffect(() => {
      const fetchUserInfo = async () => {
         const controller = new AbortController();
         try {
            const currentUserData = await axiosInstance.get(`/api/users/${userProfileId}`, {
               signal: controller.signal,
            });
            setUserProfile(currentUserData.data);
         } catch (err: any) {
            toast.info(err.message);
         }
      }
      fetchUserInfo();

   }, [userProfileId]);

   const onSubmit: SubmitHandler<InputProps> = async (updatedData) => {
      alert("something happenned");
      console.log('Submit');
      console.log(updatedData);
      try {
         const response = await axiosInstance.put(`/api/users/${userProfileId}`, {
            userName: updatedData.userName ? updatedData.userName : userProfile.userName || userName,
            userEmail: updatedData.userEmail ? updatedData.userEmail : userProfile.userEmail || userEmail,
            userDescription: updatedData.userDescription ? updatedData.userDescription : userProfile.userDescription || userDescription,
            // file: updatedData.file,
         }, {
            headers: {
               'Accept': 'application/json',
            }
         });
         const result = await response.data;
         toast.success(result.message ? result.message : null);
         setUserDescription
         toast.error(result.error ? result.error : null);
      } catch (err: any) {
         toast.info(err.message);
      }
   }

   return (
      <div className={`fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ${visibility ? '' : "hidden"} `}>
         <form onSubmit={handleSubmit(onSubmit)} className="relative p-6 bg-white border border-gray-300 rounded-lg shadow md:w-3/4">
            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="popup-modal" onClick={cancel}>
               <AiOutlineClose className="w-3 h-3" />
            </button>

            <div className="p-4 md:p-5 text-center">
               <FaUserEdit className='mx-auto mb-4 text-gray-400 w-12 h-12' />
               {/* <h3 className="mb-5 text-lg font-normal text-gray-500">Edit Profile</h3> */}

               <Input
                  type="text"
                  register={register}
                  refLabel="userName"
                  label="Name"
                  placeholder={userProfile.userName || userName}
               />
               <Input
                  type="email"
                  register={register}
                  refLabel="userEmail"
                  label="Email Address"
                  placeholder={userProfile.userEmail || userEmail}
               />
               <Input
                  type="text"
                  register={register}
                  refLabel="userDescription"
                  label="Description"
                  placeholder={userProfile.userDescription || userDescription || "I am a mysterious person who has yet to fill out my bio"}
               />

               {/* <div className="bg-gray-200 my-4 p-4 flex items-center justify-center rounded-md">
                  <FaFileImage size={24} color="white" />
                  <input
                     type="file"
                     {...register('file', { required: true })}
                     className="file:bg-gray-200 file:text-white file:border-none file:px-4 file:py-2 ml-4 cursor-pointer text-white"
                  />
               </div> */}
               <button
                  type="submit"
                  className="font-medium rounded-lg text-sm py-2.5 text-center bg-blue-400 hover:bg-blue-500 text-gray-50  focus:ring-4 focus:ring-blue-300 focus:outline-none border focus:z-10 flex items-center justify-center w-full mt-4"
               >
                  SAVE
               </button>
            </div>
         </form>

         <ToastContainer />
      </div>
   )
}

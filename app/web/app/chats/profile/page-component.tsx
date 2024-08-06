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
import { useState, useContext, useEffect } from "react";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import dynamic from "next/dynamic";
import { FaCalendarWeek, FaUserAltSlash } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa';
import { AuthContext } from "@/contexts/authContext";
import axiosInstance from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UpdateProfile = dynamic(() => import('@/components/ui/UpdateProfile'), { ssr: false });
export default function ProfilePage() {
   const router = useRouter();
   const { userName, userDescription, userAvatarURL, userEmail, created, userId } = useContext(AuthContext);
   const [loading, setLoading] = useState(true);
   const [userProfile, setUserProfile] = useState<any>([]);
   const [isVisible, setIsVisible] = useState(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);

   const showVisibility = () => {
      setIsVisible(!isVisible);
   }

   const showVisibilityUpdateProfile = () => {
      setIsEditModalOpen(!isEditModalOpen);
   }

   useEffect(() => {
      if (typeof window !== 'undefined') {
         const controller = new AbortController();
         const currentUserId = localStorage.getItem('currentUserId');
         const fetchData = async () => {
            try {
               const currentUserData = await axiosInstance.get(`/api/users/${userId || currentUserId}`);
               setUserProfile(currentUserData.data);
               setLoading(false);
            } catch (err) {
               setLoading(false);
            }
         }
         fetchData();
         return () => controller.abort();
      }
   }, [userId]);

   const deleteAccount = () => {
      if (typeof window !== 'undefined') {
         const fetchDeleteAccount = async () => {
            const currentUserId = localStorage.getItem('currentUserId');
            try {
               const resp = await axiosInstance.delete(`/api/users/${userId || currentUserId}`, {
                  headers: {
                     'Accept': 'application/json',
                  },
               });
               const result = await resp.data;
               toast.success(result.message ? result.message : null);
               toast.error(result.error ? result.error : null);
               localStorage.clear();
               sessionStorage.clear();
               router.push('/login');
            } catch (err: any) {
               toast.warn(err.message);
            }
         }
         fetchDeleteAccount();
      }
   };

   return (
      <div className="flex-1 p-32 items-center justify-center">
         <div className="max-w-sm mx-auto rounded-lg overflow-hidden bg-gray-50 border border-gray-300 shadow-lg flex items-center justify-center">
            <div className="px-4 pb-6">
               <div className="text-center my-4">
                  <div className="flex items-center justify-center">
                     <div className="bg-blue-500 p-5 rounded-full">
                        <FaUserCheck size={40} color="#fff" />
                     </div>
                  </div>
                  {loading ? (
                     <div className="animate-pulse flex flex-col items-center">
                        <div className="w-32 h-4 bg-gray-300 rounded mt-2"></div>
                        <div className="w-48 h-4 bg-gray-300 rounded mt-2"></div>
                        <div className="w-48 h-4 bg-gray-300 rounded mt-2"></div>
                        <div className="w-24 h-4 bg-gray-300 rounded mt-2"></div>
                     </div>
                  ) : (
                     <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800 mb-1">{userName || userProfile.userName}</h3>
                        <div className="text-gray-700 items-center flex flex-col">
                           <p className="text-slate-500 text-sm">{userEmail || userProfile.userEmail}</p>
                           <div className="text-slate-500 text-sm flex gap-3 items-center py-2">
                              <FaCalendarWeek size={18} />
                              <p>Joined {String(created).split('T')[0] || String(userProfile.created).split('T')[0]}</p>
                           </div>
                           <p>{userDescription || userProfile.userDescription || "I am a mysterious person who has yet to fill out my bio"}</p>
                        </div>
                     </div>
                  )}
               </div>
               <div className="flex p-1 gap-4 justify-center items-center">
                  <Button
                     className="bg-blue-400 hover:bg-blue-500 focus:ring-blue-300"
                     title="UPDATE"
                     handleClick={showVisibilityUpdateProfile}
                  />
                  <Button
                     title="DELETE"
                     className="text-gray-50 bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                     handleClick={showVisibility}
                  />
               </div>
            </div>
         </div>
         <Alert
            isVisible={isVisible}
            showVisibility={showVisibility}
            description="Are you sure to delete your account? All of your data will be lost."
            logout={deleteAccount}
         >
            <FaUserAltSlash className='mx-auto mb-4 text-gray-400 w-12 h-12' />
         </Alert>
         {
            localStorage && <UpdateProfile
               cancel={showVisibilityUpdateProfile}
               visibility={isEditModalOpen}
               userProfileId={localStorage.getItem('currentUserId') || userId}
            />
         }
         <ToastContainer />
      </div>
   );
}
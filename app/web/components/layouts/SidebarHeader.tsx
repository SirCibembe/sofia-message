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
import { AiFillWechat } from 'react-icons/ai';
import Image from "next/image";
import Button from '../ui/Button';
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from '../ui/Alert';
import { useState } from "react";
import { AiOutlineUserSwitch } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import axiosInstance from '@/config/axios.config';
import { toast, ToastContainer } from 'react-toastify';




export default function SidebarHeader({ avatarURL, }: { avatarURL?: string; }) {
   const router = useRouter();
   const [isVisible, setIsVisible] = useState(false);
   const cancel = () => {
      setIsVisible(!isVisible);
   }
   const signout = async () => {
      if (typeof window !== 'undefined') {
         const isSignout = await axiosInstance.get('/auth/signout');
         const result = await isSignout.data;
         toast.info(result.message ? result.message : null);
         console.log(result);
         localStorage.clear();
         sessionStorage.clear();
         router.push('/login');
      }
   }
   return (
      <header className="p-4 border-b border-gray-300 flex justify-between items-center">
         <div className="flex gap-3 items-center">
            <AiFillWechat size={40} className='fill-blue-500' />
            <h1 className="text-2xl font-semibold text-blue-400 hover:text-blue-500">CHATS</h1>
         </div>
         <div className="flex items-center gap-3">
            <Link href={'/chats/profile'} className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full text-gray-50 overflow-hidden hover:cursor-pointer`}>
                  {avatarURL ? (
                     <Image src={avatarURL} alt="Avatar" layout="fill" className={`w-10 h-10`} />
                  ) : (
                     <FaUserCircle
                        size={40}
                        className="fill-blue-500"
                     />
                  )}
               </div>
            </Link>
            <Button
               title="Signout"
               className="bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300"
               handleClick={cancel}
            />
         </div>

         <Alert
            showVisibility={cancel}
            isVisible={isVisible}
            logout={signout}
            description="Are you sure to log out?"
         >
            <AiOutlineUserSwitch
               className='mx-auto mb-4 text-gray-400 w-12 h-12'
            />
         </Alert>

         <ToastContainer />
      </header>
   );
}
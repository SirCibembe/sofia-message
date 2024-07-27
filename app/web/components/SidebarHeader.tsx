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
import Image from "next/image";
import Avatar from "./Avatar";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Alert from "./Alert";
import { useState } from "react";
import { AiOutlineUserSwitch } from 'react-icons/ai';
import axios from "axios";



export default function SidebarHeader({ avatarURL, }: { avatarURL?: string; }) {
   const router = useRouter();
   const [isVisible, setIsVisible] = useState(false);
   const cancel = () => {
      setIsVisible(!isVisible);
   }
   const signout = async () => {
      const isSignout = await axios.get('http://localhost:8000/auth/signout');
      const result = await isSignout.data;
      console.log(result);
      localStorage.clear();
      sessionStorage.clear();
      router.push('/');
   }
   return (
      <header className="p-4 border-b border-gray-300 flex justify-between items-center">
         <Link href={'/home'} className="flex gap-3 items-center">
            <div>
               <svg
                  className="w-8 h-8 fill:bg-blue-500"
                  width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="100" fill="#4A90E2" />
                  <path d="M70 80C70 72.268 76.268 66 84 66H116C123.732 66 130 72.268 130 80V120C130 127.732 123.732 134 116 134H84C76.268 134 70 127.732 70 120V80Z" fill="white" />
                  <circle cx="90" cy="95" r="10" fill="#4A90E2" />
                  <path d="M90 95C90 98.3137 87.3137 101 84 101C80.6863 101 78 98.3137 78 95C78 91.6863 80.6863 89 84 89C87.3137 89 90 91.6863 90 95Z" fill="white" />
                  <path d="M110 95C110 98.3137 107.314 101 104 101C100.686 101 98 98.3137 98 95C98 91.6863 100.686 89 104 89C107.314 89 110 91.6863 110 95Z" fill="white" />
                  <path d="M93 118L98 108L103 118H93Z" fill="#4A90E2" />
               </svg>
            </div>
            <h1 className="text-2xl font-semibold text-blue-400 hover:text-blue-500">IRIS</h1>
         </Link>
         <div className="flex items-center gap-3">
            <Link href={'/home/profile'} className="flex items-center gap-3">
               <div className={`w-10 h-10 rounded-full text-gray-50 overflow-hidden hover:cursor-pointer`}>
                  {avatarURL ? (
                     <Image src={avatarURL} alt="Avatar" layout="fill" className={`w-10 h-10`} />
                  ) : (
                     <Avatar
                        className="w-32 h-32"
                        userName={"Birusha"}
                        avatarURL={null}
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
      </header>
   );
}
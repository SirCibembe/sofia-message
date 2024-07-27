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
import { FaSearch } from 'react-icons/fa';
import UserCard from './UserCard';
import { useEffect, useState, useContext } from 'react';
import { list } from '@/utils/userAPI';
import Link from 'next/link';
import { AuthContext } from '@/contexts/authContext';

export default function ContactList() {
   const { userId } = useContext(AuthContext);
   let [contactList, setContactList] = useState<any>(null);
   useEffect(() => {
      const controller = new AbortController();
      const fetchData = async () => {
         try {
            const userList = await list(controller.signal);
            setContactList(await userList.users);
         } catch (err) {
            console.log('Failed to fetch users');
         }
      }
      fetchData()
   }, []);
   return (
      <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">

         <div className="w-full flex p-2 mb-3 rounded-md px-4 bg-blue-300 text-[#f5f5f5]">
            <input
               type="search"
               placeholder="search a friend"
               className='flex-1 bg-transparent outline-none placeholder:text-[#f5f5f5]'
            />
            <button>
               <FaSearch size={18} color='#f5f5f5' />
            </button>
         </div>

         {
            contactList?.length == 0 || !contactList || contactList == null ? (
               <p className="text-sm text-gray-400 text-center">No contacts registered yet</p>
            ) : (
               contactList
                  ?.filter((contact: any) => contact.userId != localStorage.getItem('currentUserId') || userId)
                  ?.map((user: any) => (
                     <Link
                        key={user.userId}
                        href={`/home/${user.userId}`}>
                        <UserCard
                           userName={user.userName}
                           userEmail={user.userDescription ? user.userDescription : "I am a mysterious who has yet to fill out my bio"}
                        />
                     </Link>
                  ))
            )
         }
      </div>
   )
};
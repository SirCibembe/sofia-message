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
import { FaSearch } from "react-icons/fa";
import UserCard from "./UserCard";
import { useEffect, useState, useContext } from "react";
import { list } from "@/utils/userAPI";
import Link from "next/link";
import UserCardSkeleton from "./UserCardSkeleton";
import { AuthContext } from "@/contexts/authContext";
import { toast } from "react-toastify";

export default function ContactList() {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const { userId } = useContext(AuthContext);
  let [contactList, setContactList] = useState<any>(null);
  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        const userList = await list(controller.signal);
        setContactList(await userList.users);
      } catch (err: any) {
        toast.info(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="overflow-y-auto h-screen py-3 pb-20">
      <div className="px-3 mb-2">
        <div className="w-full flex rounded-md p-3 bg-blue-300 text-[#f5f5f5]">
          <input
            type="search"
            placeholder="search a friend"
            className="flex-1 bg-transparent outline-none placeholder:text-[#f5f5f5]"
          />
          <button>
            <FaSearch size={18} color="#f5f5f5" />
          </button>
        </div>
      </div>

      {(contactList?.length == 0 || !contactList || contactList == null) && loading  ? (
        <div>
          {Array(20)
            .fill(0)
            .map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
        </div>
      ) : (
        contactList?.map((user: any) => (
          <Link
            key={user.userId}
            href={`/chats/${user.userId}`}
            onClick={() => setSelectedUserId(user.userId)}
          >
            <UserCard
              userName={
                user.userId == localStorage.getItem("currentUserId")
                  ? "Me"
                  : user.userName
              }
              userEmail={
                user.userDescription
                  ? user.userDescription
                  : "I am a mysterious who has yet to fill out my bio"
              }
              isSelected={user.userId === selectedUserId}
            />
          </Link>
        ))
      )}
    </div>
  );
}

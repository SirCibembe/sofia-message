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
import { useState } from "react";
// import formatDateToSwahiliEAT from '@/utils/dateFormatter';
import Avatar from "./Avatar";
import { FaEllipsisV } from "react-icons/fa"; // Importing an icon for the dropdown menu

export default function UserMessage({
   messageContent,
   avatarURL,
   currentId,
   currentUserId,
   senderName = 'Unknown user',
   time
}: {
   messageContent: string;
   avatarURL?: string;
   time: Date | any;
   currentId: string;
   currentUserId: string;
   senderName?: string | null;
}) {
   const sfIsCurrentUserMessage = currentId === currentUserId;
   const [isEditing, setIsEditing] = useState(false);
   const [editedMessage, setEditedMessage] = useState(messageContent);
   const [showDropdown, setShowDropdown] = useState(false);

   const handleEdit = () => {
      // Add your logic to save the edited message
      setIsEditing(false);
   };

   const handleDelete = () => {
      // Add your logic to delete the message
   };

   const handleCancel = () => {
      setIsEditing(false);
      setEditedMessage(messageContent);
   };

   const handleDropdownToggle = () => {
      setShowDropdown(!showDropdown);
   };

   const handleClickEdit = () => {
      setIsEditing(true);
      setShowDropdown(false);
   };

   const handleClickDelete = () => {
      handleDelete();
      setShowDropdown(false);
   };

   return (
      <>
         <div className={`flex mb-4 ${sfIsCurrentUserMessage ? "justify-end text-slate-800" : ""}`}>
            <div className="flex items-center mr-2">
               {!avatarURL ? (
                  <Avatar className="w-8 h-8" avatarURL={null}  />
               ) : (
                  <img src={avatarURL} alt={'user message'} className="w-8 h-8 rounded-full bg-blue-300" />
               )}
            </div>
            <div className={`flex max-w-96 rounded-lg p-3 gap-3 flex-col ${sfIsCurrentUserMessage ? "bg-blue-500 text-gray-50" : "bg-gray-50 border border-gray-300 text-gray-700"}`}>
               {sfIsCurrentUserMessage && (
                  <div className="relative">
                     <button className="absolute top-0 right-0" onClick={handleDropdownToggle}>
                        <FaEllipsisV />
                     </button>
                     {showDropdown && (
                        <div className="absolute top-6 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                           <button
                              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-200 w-full"
                              onClick={handleClickEdit}
                           >
                              Edit
                           </button>
                           <button
                              className="block px-4 py-2 text-left text-gray-700 hover:bg-gray-200 w-full"
                              onClick={handleClickDelete}
                           >
                              Delete
                           </button>
                        </div>
                     )}
                  </div>
               )}
               <p>{messageContent}</p>
               <p className="text-sm text-right">{time}</p>
            </div>
         </div>

         {isEditing && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
               <div className="bg-white rounded-lg p-6 w-96">
                  <h2 className="text-lg font-bold mb-4">Edit Message</h2>
                  <textarea
                     className="w-full border border-gray-300 rounded-lg p-2 mb-4"
                     value={editedMessage}
                     onChange={(e) => setEditedMessage(e.target.value)}
                  />
                  <div className="flex justify-end gap-2">
                     <button
                        className="px-4 py-2 bg-gray-200 rounded-lg"
                        onClick={handleCancel}
                     >
                        Cancel
                     </button>
                     <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                        onClick={handleEdit}
                     >
                        Save
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

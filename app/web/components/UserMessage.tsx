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

import Avatar from "./Avatar";

export default function UserMessage({
   messageContent,
   avatarURL,
   currentId,
   currentUserId,
   senderName,
   time
}: {
   messageContent: string;
   avatarURL?: string;
   time: string;
   currentId: string;
   currentUserId: string;
   senderName: string;
}) {
   if (currentId == currentUserId) {
      return (
         <div className="flex justify-end mb-4 cursor-pointer" >
            <div className="flex max-w-96 bg-blue-500 text-gray-50 rounded-lg p-3 gap-3 flex-col">
               {/* <p>{senderName}</p> */}
               <p>{messageContent}</p>
               <p className="text-sm text-gray-100 text-right">{time}</p>
            </div>
            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
               {!avatarURL || avatarURL == null ? (
                  <Avatar
                     className="w-32 h-32"
                     userName={senderName}
                     avatarURL={null}
                  />
               ) : (
                  <img src={`${avatarURL}`} alt="A" className="w-8 h-8 rounded-full bg-blue-300" />
               )}
            </div>
         </div>
      )
   }
   return (
      <div className="flex mb-4 cursor-pointer text-gray-700">
         <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
            {!avatarURL || avatarURL == null ? (
               <Avatar
                  className="w-32 h-32"
                  userName={senderName}
                  avatarURL={null}
               />
            ) : (
               <img src={`${avatarURL}`} alt="" className="w-8 h-8 rounded-full" />
            )}
         </div>
         <div className="flex flex-col max-w-96 bg-gray-50 rounded-lg p-3 gap-3  border border-gray-300">
            {/* <p className={`$${senderName == '' || !senderName || senderName == null ? 'hidden' : ''}`}>{senderName}</p> */}
            <p>{messageContent}</p>
            <p className="text-sm text-gray-500 text-right">{time}</p>
         </div>
      </div>
   );
}
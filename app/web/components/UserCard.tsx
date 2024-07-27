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

export default function UserCard({
   userName,
   userEmail,
}: {
   userName?: string;
   userEmail?: string;
}) {
   return (
      <div className="flex items-center mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
         <div className="w-12 h-12 rounded-full mr-3">
            {/* <Avatar className="w-12 h-12" /> */}
            <Avatar
               className="w-32 h-32"
               userName={"birusha"}
               avatarURL={null}
            />
         </div>
         <div className="flex-1">
            <h2 className="text-medium font-bold text-slate-800">{userName}</h2>
            <p className="text-gray-400 text-sm">{userEmail?.substring(0, 40 - 3) + "..."}</p>
         </div>
      </div>
   );
}
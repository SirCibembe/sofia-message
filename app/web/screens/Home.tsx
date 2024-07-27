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
import ChatHeader from "@/components/ChatHeader";
import ChatMessages from "@/components/ChatMessages";
import { useForm, SubmitHandler } from "react-hook-form";


type Inputs = {
   userContent: string;
}

export default function Home() {
   const { register, handleSubmit } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = (d) => {
      // alert(d.userContent);
   }
   return (
      <div className="flex-1">
         {/* <!-- Chat Header --> */}
         <ChatHeader />
         {/* <!-- Chat Messages --> */}
         <ChatMessages />
         {/* <!-- Chat Input --> */}
         {/* w-3/4 default width */}
         <div className="bg-white border-t border-gray-300 p-4 absolute bottom-0 md:w-2/4 lg:w-2/3">
            <form
               onSubmit={handleSubmit(onSubmit)} className="flex items-center"
            >
               <input
                  type="text"
                  placeholder="Type a message..."
                  {...register('userContent', { required: true, })}
                  className="w-full p-2 px-4 rounded-md border border-gray-400 focus:outline-none focus:border-[#8098F9]"
               />
               <button className="bg-blue-400 hover:bg-blue-500 text-gray-50 px-4 py-2 rounded-md ml-2">Send</button>
            </form>
         </div>
      </div>
   );
}
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
import { useContext } from "react";
import { AuthContext } from "@/contexts/authContext";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
export default function HomeScreen() {
   useAuth();
   console.log(useAuth());
   // const router = useRouter();
   // const { userId } = useContext(AuthContext);
   
   // if (typeof window !== "undefined") {
   //    const currentUserToken = localStorage.getItem('accessToken');
   //    const currentUserId = localStorage.getItem('currentUserId');
   //    if (!userId || (!currentUserId && currentUserToken)) {
   //       localStorage.clear();
   //       sessionStorage.clear();
   //       // router.push('/');
   //    }
   // }
   return (
      <div className="flex-1">
         <div className="flex-1 h-screen flex items-center justify-center text-slate-800 flex-col gap-6 w-full">
            <h1 className="text-2xl font-bold text-blue-500">{"Welcome to SOFIA-MESSAGE".toUpperCase()}</h1>
            <p className="my-4 italic text-xl">Your place to connect and share.</p>
            <Button
               title="Get Started"
               className="bg-blue-500 hover:bg-blue-600"
            />
         </div>
      </div>
   );
}
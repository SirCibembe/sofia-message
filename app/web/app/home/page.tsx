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
import { AuthContext } from "@/contexts/authContext";
import Home from "@/screens/Home";
import { useRouter } from "next/navigation";
import { useContext } from "react";
export default function HomeScreen() {
   const router = useRouter();
   const currentUserId = localStorage.getItem('currentUserId');
   const currentUserToken = localStorage.getItem('accessToken');
   const { userId } = useContext(AuthContext);
   if (!userId || (!currentUserId && currentUserToken))  {
      localStorage.clear();
      sessionStorage.clear();
      router.push('/');
   }
   // I will add another function to check if the user is authenticated with a good token
   return (
      <div>
         hello IRIS TALK
      </div>
   );
}
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
import { useForm, SubmitHandler } from 'react-hook-form';
import Button from "@/components/Button";
import Input from "@/components/Input";
import Link from "next/link";
import { signin } from '@/utils/userAPI';
import { useContext } from 'react';
import { AuthContext } from '@/contexts/authContext';
import { useRouter } from 'next/navigation';

type Inputs = {
   userName: string
   userPassword: string
}

export default function Login() {
   const { setCreated, setUserAvatarURL, setUserEmail, setUserId, setUserName, setUserDescription } = useContext(AuthContext);
   const router = useRouter();
   const {
      register,
      handleSubmit,
      reset
   } = useForm<Inputs>();
   const onSubmit: SubmitHandler<Inputs> = async (data: IUserLogin) => {
      try {
         localStorage.clear();
         sessionStorage.clear();
         const resp = await signin(data);
         const result = await resp;
         const connectedUser = await result.data;
         setUserName(await connectedUser.userName);
         setCreated(await connectedUser.created);
         setUserAvatarURL(await connectedUser.userAvatarURL);
         setUserEmail(await connectedUser.userEmail);
         setUserId(await connectedUser.userId);
         setUserDescription(await connectedUser.userDescription);
         localStorage.setItem('accessToken', await connectedUser.accessToken);
         sessionStorage.setItem('accessToken', await connectedUser.accessToken);
         router.push('/home');
         localStorage.setItem('currentUserId', await connectedUser.userId);
         reset();
      } catch (err) {
         console.warn(err);
      }
   }
   return (
      <section className="bg-gray-50 px-3 md:px-0 flex flex-col items-center justify-center mx-auto h-screen lg:py-0">
         <div className="w-full bg-white rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0">
            <div className="w-full">

               <div className="p-6 space-y-4 md:space-y-6">
                  <h2 className="text-xl font-bold leading-tight text-center tracking-tight md:text-2xl text-slate-800">
                     Sign in to your account
                  </h2>

                  <form onSubmit={handleSubmit(onSubmit)}>
                     <Input
                        register={register}
                        label="Email Address"
                        type="email"
                        refLabel="userEmail"
                        placeholder="birushandegeya@gmail.com"
                     />

                     <Input
                        register={register}
                        label="Password"
                        type="password"
                        refLabel="userPassword"
                        placeholder="••••••••"
                     />

                     <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center">
                           <input id="remember_me" name="remember" type="checkbox" value="1" className="form-checkbox h-4 w-4 text-[#8098F9] transition duration-150 ease-in-out" />
                           <label htmlFor="remember_me" className="ml-2 block text-sm leading-5 text-gray-900">Remember me</label>
                        </div>

                        {/* FORGOT PASSWORD LOGIN -> UPCOMING */}
                        {/* <div className="text-sm leading-5">
                        <a href="#"
                           className="font-medium text-[#8098F9] hover:underline focus:outline-none focus:underline transition ease-in-out duration-150">
                           Forgot your password?
                        </a>
                     </div> */}
                     </div>

                     <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                           <Button
                              title="SIGN IN"
                              className="bg-blue-400 hover:bg-blue-500 w-full"
                           />
                        </span>
                     </div>


                     {/* are you new?  */}

                     <p className="text-sm font-light text-slate-800 mt-6">
                        Are you new? <Link href="/register" className="font-medium text-[#8098F9] hover:underline">Create a new acccount</Link>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
}
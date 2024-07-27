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
import Link from "next/link";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useForm, SubmitHandler } from 'react-hook-form';
import { create } from '@/utils/userAPI';
import { useState } from "react";

type InputType = {
   userEmail: string;
   userPassword: string;
   userName: string;
}

export default function Register() {
   const [message, setMessage] = useState('');
   const { register, handleSubmit, reset } = useForm<InputType>();

   const onSubmit: SubmitHandler<InputType> = async (data) => {
      const resp = await create(data);
      const result = await resp;
      setMessage(result.message);
      if (result.status == 'created') {
         console.log("do something on creation of an account");
      }
      reset();
   }
   return (
      <section className="bg-gray-50">
         <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
               <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight text-center tracking-tight md:text-2xl text-slate-800">
                     Create an account
                  </h1>
                  <form
                     onSubmit={handleSubmit(onSubmit)}
                     className="space-y-4 md:space-y-6"
                  >

                     <Input
                        register={register}
                        label="Email Address"
                        type="email"
                        refLabel="userEmail"
                        placeholder="birushandegeya@gmail.com"
                     />

                     <Input
                        register={register}
                        label="User Name"
                        type="text"
                        refLabel="userName"
                        placeholder="Birusha Ndegeya"
                     />

                     <Input
                        register={register}
                        label="Your Password"
                        type="password"
                        refLabel="userPassword"
                        placeholder="••••••••"
                     />

                     <div className="flex items-start">
                        <div className="flex items-center h-5">
                           <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required={true} />
                        </div>
                        <div className="ml-3 text-sm">
                           <label htmlFor="terms" className="font-light text-slate-800">I accept the <a className="font-medium text-[#8098F9] hover:underline" href="#">Terms and Conditions</a></label>
                        </div>
                     </div>

                     <div className="mt-6">
                        <span className="block w-full rounded-md shadow-sm">
                           <Button
                              title="Create an account"
                              className="bg-blue-400 hover:bg-blue-500 w-full focus:ring-blue-300"
                           />
                        </span>
                     </div>

                     <p className="text-sm font-light text-slate-800">
                        Already have an account? <Link href="/" className="font-medium text-[#8098F9] hover:underline">Login here</Link>
                     </p>
                  </form>
               </div>
            </div>
         </div>
      </section>
   );
}
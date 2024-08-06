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
import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

export default function Input(
   {
      register,
      label,
      type,
      refLabel,
      placeholder,
      className = '',
   }: IInputProps
) {
   const [showPassword, setShowPassword] = useState(false);

   const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
   }
   return (
      <div className={`mt-6 ${className}`}>
         <label htmlFor={refLabel} className="block text-sm font-medium leading-5 text-gray-700">{label}</label>
         <div className="mt-1 rounded-md shadow-sm flex items-center justify-between appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5">
            <input
               type={showPassword ? "text" : type}
               {...register(refLabel)}
               className="appearance-none block w-full py-1 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
               placeholder={placeholder}
            />
            {
               type === "password" && (
                  <span
                     onClick={togglePasswordVisibility}
                     className='hover:cursor-pointer'
                  >
                     {showPassword ? <AiFillEye className='fill-gray-700' size={24} /> : <AiFillEyeInvisible size={24} className='fill-gray-700' />}
                  </span>
               )
            }
         </div>
      </div>
   )
}
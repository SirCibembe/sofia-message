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
import { SubmitHandler } from "react-hook-form";
export default function Button({
   title,
   type,
   className,
   handleClick
}: {
   title?: string;
   type?: "reset" | "button" | undefined;
   className?: string;
   handleClick?: () => void | null | SubmitHandler<InputProps>;
}
) {
   return (
      <button
         type={type}
         onClick={handleClick}
         className={`text-gray-50 focus:ring-4 focus:outline-none font-medium rounded-lg flex text-medium items-center px-5 py-2.5 text-center justify-center  ${className}`}
      >
         {title?.toUpperCase()}
      </button>
   );
}
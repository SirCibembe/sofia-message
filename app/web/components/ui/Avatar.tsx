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
import { FaUserCircle } from 'react-icons/fa';


export default function Avatar({ avatarURL }: { className?: string; avatarURL: string | null; }) {
    return (
        <div className={`relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full`}>
            {avatarURL ? (
                <img
                    src={avatarURL}
                    alt="profile-avatar"
                    className={`w-12 h-12`}
                />
            ) : (
                <FaUserCircle
                    className='absolute w-12 h-12 text-gray-400 -left-1'
                    fill="currentColor"
                />
            )}
        </div>
    );
}
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
import images from "@/constants/images"
console.log(images.user1);
export const data: {
    name: string; avatar: string | any;
    messages: string[];
    description?: string
}[] = [
        {
            name: "Tutka",
            avatar: null,
            messages: ['Hey there', 'I love python is awesome'],
            description: "Full stack developer and computer programmer"
        },
        {
            name: "Birusha",
            avatar: '',
            messages: ['Typescript is tomorrow', 'So do not be later'],
            description: "Full stack developer and computer programmer"
        },
        {
            name: "Michael",
            avatar: '',
            messages: ['Chemistry class start tomorrow', 'We are going to talk about atomic operations'],
            description: "Full stack developer and computer programmer"
        },
        {
            name: "Tutka",
            avatar: '',
            messages: ['Hey there', 'I love python is awesome'],
            description: "Full stack developer and computer programmer"
        },
        {
            name: "Tutka",
            avatar: '',
            messages: ['Hey there', 'I love python is awesome'],
            description: "Full stack developer and computer programmer"
        }
    ]
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
'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { FaCalendarWeek, FaUserCheck } from 'react-icons/fa';


export default function ProfileId({ params }: {
    params: {
        profileId: string;
    }
}) {
    const [loading, setLoading] = useState(true);
    const [userProfile, setUserProfile] = useState<any>([]);
    const router = useRouter();
    const goBack = (path: string) => {
        if (!path) return;
        router.push(path);
    }
    useEffect(() => {
        const controller = new AbortController();
        const fetchData = async () => {
            try {
                const currentUserData = await axios.get(`http://localhost:8000/api/users/${params.profileId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}`
                    }
                });
                const result = await currentUserData;
                setUserProfile(result.data);
                console.log(result.data);
                setLoading(!loading);
            } catch (err) {
                console.log('Failed to fetch users');
                setLoading(!loading);
            }
        }
        fetchData()
    }, []);
    return (
        <div className="flex-1 p-32 items-center justify-center">
            <div className="max-w-sm mx-auto rounded-lg overflow-hidden bg-gray-50 border border-gray-300 shadow-lg flex items-center justify-center">
                {/* Card start */}
                <div className="px-4 pb-6">
                    <div className="text-center my-4">
                        <div className="flex items-center justify-center">
                            <div className="bg-blue-500 p-5 rounded-full">
                                <FaUserCheck
                                    size={40}
                                    color="#fff"
                                />
                            </div>
                        </div>
                        {loading ? (
                            <div className="animate-pulse flex flex-col items-center">
                                <div className="w-32 h-4 bg-gray-300 rounded mt-2"></div>
                                <div className="w-48 h-4 bg-gray-300 rounded mt-2"></div>
                                <div className="w-24 h-4 bg-gray-300 rounded mt-2"></div>
                                <div className="w-24 h-4 bg-gray-300 rounded mt-2"></div>
                            </div>
                        ) : (
                            <div className="py-2">
                                <h3 className="font-bold text-2xl text-gray-800 mb-1">{userProfile.userName}</h3>
                                <div className="text-gray-700 items-center flex flex-col">
                                    <p className="text-slate-500 text-sm">{userProfile.userEmail}</p>
                                    <div className="text-slate-500 text-sm flex gap-3 items-center py-2">
                                        <FaCalendarWeek size={18} />
                                        <p>Joined {userProfile.created}</p>
                                    </div>
                                    <p>
                                        {userProfile.userDescription ? userProfile.userDescription : "I am a mysterious who has yet to fill out my bio"}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                    <Button
                        className="bg-blue-400 hover:bg-blue-500 w-full focus:ring-blue-300 justify-center items-center"
                        title="GO BACK"
                        handleClick={() => goBack(`/home/${params.profileId}`)}
                    />
                </div>
                {/* Card end */}
            </div>
        </div >
    );
}
"use client";
import { useState, useContext, useEffect } from "react";
import Button from "@/components/Button";
import Alert from "@/components/Alert";
import UpdateProfile from "@/components/UpdateProfile";
import { FaCalendarWeek, FaUserAltSlash } from 'react-icons/fa';
import { FaUserCheck } from 'react-icons/fa';
import { AuthContext } from "@/contexts/authContext";
import axios from "axios";
import axiosInstance from "@/utils/axios.config";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
   const router = useRouter();
   const { userName, userDescription, userAvatarURL, userEmail, created, userId } = useContext(AuthContext);
   const [loading, setLoading] = useState(true);
   const [userProfile, setUserProfile] = useState<any>([]);
   const [isVisible, setIsVisible] = useState(false);
   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
   const showVisibility = () => {
      setIsVisible(!isVisible);
   }
   const showVisibilityUpdateProfile = () => {
      setIsEditModalOpen(!isEditModalOpen);
   }

   useEffect(() => {
      const controller = new AbortController();
      const fetchData = async () => {
         try {
            const currentUserData = await axiosInstance.get(`http://localhost:8000/api/users/${localStorage.getItem('currentUserId') || userId}`, {
               // headers: {
               //    // 'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
               // }
            });
            const result = await currentUserData;
            setUserProfile(result.data);
            setLoading(!loading);
         } catch (err) {
            console.log('Failed to fetch users');
            setLoading(!loading);
         }
      }
      fetchData()
   }, []);

   // delete account 
   const deleteAccount: () => void = () => {

      const fetchDeleteAccount: () => Promise<void> = async () => {
         try {
            const resp = await axios.delete(`http://localhost:8000/api/users/${localStorage.getItem('currentUserId') || userId}`, {
               headers: {
                  'Accept': 'application/json',
               },
               // data: JSON.stringify(updatedData)
            });
            const result = await resp.data;
            console.log(result);
            localStorage.clear();
            sessionStorage.clear();
            console.log('Deleting account');
            router.push('/');
         } catch (err) {
            console.warn(err);
         }
      }
      fetchDeleteAccount();
   };

   return (
      <div className="flex-1 p-32 items-center justify-center">

         {/* <!-- Card start --> */}
         <div className="max-w-sm mx-auto rounded-lg overflow-hidden bg-gray-50 border border-gray-300 shadow-lg flex items-center justify-center">
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
                        <div className="w-48 h-4 bg-gray-300 rounded mt-2"></div>
                        <div className="w-24 h-4 bg-gray-300 rounded mt-2"></div>
                     </div>
                  ) : (
                     <div className="py-2">
                        <h3 className="font-bold text-2xl text-gray-800 mb-1">{userName ? userName : userProfile.userName}</h3>
                        <div className="text-gray-700 items-center flex flex-col">
                           <p className="text-slate-500 text-sm">{userEmail ? userEmail : userProfile.userEmail}</p>
                           <div className="text-slate-500 text-sm flex gap-3 items-center py-2">
                              <FaCalendarWeek size={18} />
                              <p>Joined {created ? created : userProfile.created}</p>
                           </div>

                           <p>
                              {userDescription ? userDescription : userProfile.userDescription ? userProfile.userDescription : "I am a mysterious who has yet to fill out my bio"}
                           </p>
                        </div>
                     </div>
                  )}
               </div>
               <div className=" flex p-1 gap-4 justify-center items-center">
                  <Button
                     className="bg-blue-400 hover:bg-blue-500 focus:ring-blue-300"
                     title="UPDATE"
                     handleClick={showVisibilityUpdateProfile}
                  />
                  <Button
                     title="DELETE"
                     className="text-gray-50 bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                     handleClick={showVisibility}
                  />
               </div>
            </div>
         </div>
         {/* <!-- Card end --> */}



         {/* pop up delete */}

         <Alert
            isVisible={isVisible}
            showVisibility={showVisibility}
            description="Are you sure to delete your account? all of your data will be lost"
            logout={deleteAccount}
         >
            <FaUserAltSlash
               className='mx-auto mb-4 text-gray-400 w-12 h-12'
            />
         </Alert>

         {/* update profile */}

         <UpdateProfile
            cancel={showVisibilityUpdateProfile}
            visibility={isEditModalOpen}
            userProfileId={localStorage.getItem('currentUserId') || userId}
         />
      </div>
   );
}
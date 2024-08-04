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
import axiosInstance from './axios.config';
import appConfig from '@/config/app.config';

// fetch all users available in the database

export async function list(signal?: AbortSignal) {
   try {
      const response = await axiosInstance.get('/api/users/', {
         signal: signal,
         headers: {
            'Accept': 'application/json',
         },
      });
      const result = await response.data;
      return result;
   } catch (err: any) {
      return err.message;
   }
}

// create a user

export async function create(data: IUserRegister) {
   try {
      let response = await axiosInstance.post(`${appConfig.BACKEND_URL}/api/users/`, data, {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
         }
      });
      return response.data;
   } catch (err: any) {
      return err.message;
   }
}

// read a specific user by id
export async function read(
   userId: string,
   currentUserToken?: string | null,
   signal?: AbortSignal
) {
   try {
      const response = await axiosInstance.get(`/api/users/${userId}`, {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentUserToken}`
         },
         signal: signal
      });
      return response.data;
   } catch (err) {
      console.log(err);
   }
};

// signin | LOGIN INTERFACE

export async function signin(user: IUserLogin) {
   try {
      let response = await axiosInstance.post('/auth/signin/', user, {
         headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*",
         },
      });
      return response.data;
   } catch (err: any) {
      // If Axios response contains an error, it will be under 'response.data'
      return err.response ? err.response.data : err.message;
   }
}
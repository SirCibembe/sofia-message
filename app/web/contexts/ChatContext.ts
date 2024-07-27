// /**
//  * @license
//  * Copyright 2024 Birusha Ndegeya, sofia and Contributors
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *   http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */
// import {
//   createContext,
//   useContext,
//   useReducer,
// } from "react";
// // import { AuthContext } from "./AuthContext";

// // export const ChatContext = createContext();

// export const ChatContextProvider = ({ children }) => {
//   const { currentUser } = useContext(AuthContext);
//   const INITIAL_STATE = {
//     chatId: "null",
//     user: {},
//   };

//   const chatReducer = (state, action) => {
//     switch (action.type) {
//       case "CHANGE_USER":
//         return {
//           user: action.payload,
//           chatId:
//             currentUser.uid > action.payload.uid
//               ? currentUser.uid + action.payload.uid
//               : action.payload.uid + currentUser.uid,
//         };

//       default:
//         return state;
//     }
//   };

//   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

//   return (
//     <ChatContext.Provider value={{ data: 'data' }}>
//       {children}
//     </ChatContext.Provider>
//   );
// };

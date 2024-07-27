
interface IUser {
   userId: string;
   userName: string;
   userEmail: string;
   created: string;
   userAvatarURL: null | string;
   userDescription: null | string;
   setUserId: Dispatch<SetStateAction<string>>,
   setUserName: Dispatch<SetStateAction<string>>,
   setUserEmail: Dispatch<SetStateAction<string>>,
   setCreated: Dispatch<SetStateAction<string>>,
   setUserAvatarURL: Dispatch<SetStateAction<string>>,
   setUserDescription: Dispatch<SetStateAction<string>>
}

interface InputProps {
   userName?: string;
   userEmail?: string;
   userAvatar?: string;
   userDescription?: string;
}

interface IInputProps {
   type?: string;
   label: string;
   placeholder?: string;
   register: any
   refLabel?: string;
   message?: string;
   className?: string;
}



interface IUserRegister {
   userName: string;
   userEmail: string;
   userPassword: string;
}

interface IUserLogin {
   userName: string;
   userPassword: string;
}

interface IAuthContext {
   users: IUser[] | null;
   currentUserToken: string;
   setCurrentUserToken: Dispatch<SetStateAction<string>>;
   currentUser: any;
   setCurrentUser: Dispatch<SetStateAction<never[]>>;
}
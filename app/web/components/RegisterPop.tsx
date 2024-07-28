import { FaCheckCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

const RegistrationSuccessPopup = ({ isVisible }: {
   isVisible: boolean;
}) => {
   const router = useRouter();
   const redirectToLogin = () => {
      router.push('/');
   };
   return (
      <div className={`overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 md:inset-0 h-screen w-screen fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center ${isVisible ? "" : 'hidden'}`}>
         <div className="relative p-4 w-full max-w-md max-h-full flex items-center justify-center">
            <div className="relative bg-gray-50 border border-gray-300 rounded-lg shadow">
               <div className="p-4 md:p-5 text-center">
                  <FaCheckCircle className='mx-auto mb-4 text-green-500 w-12 h-12' />
                  <h3 className="mb-5 text-lg font-normal text-gray-500">User registered successfully! Please login.</h3>
                  <button type="button" className="text-gray-50 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center" onClick={redirectToLogin}>
                     Go to Login
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default RegistrationSuccessPopup;
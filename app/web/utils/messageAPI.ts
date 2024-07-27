import axiosInstance from "./axios.config";


// send a message

export async function sendMessage(
   senderId: string | null,
   receiverId: string,
   messageContent: string
): Promise<void> {
   const smsToSend = await axiosInstance.post('/api/messages', {
      senderId, receiverId, messageContent
   });
   const resp = await smsToSend.data;
   return resp;
}

export async function getTalk(
   URL: string,
   senderId: string,
   receiverId: string | null,
): Promise<any> { // Change void to any or specify a more specific type for result
   try {
      // Assuming 'url' is the endpoint you want to fetch data from
      const response = await axiosInstance.get(URL, {
         params: {
            sendId: senderId,
            receiverId: receiverId
         }
      });

      // Extracting the data from the response
      const result = response.data;

      // Returning the result
      return result;
   } catch (error) {
      // Handle errors gracefully
      console.error('Error fetching talks:', error);
      throw error; // Optionally rethrow the error for the caller to handle
   }
}
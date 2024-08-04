// utils/formatDate.js

export function formatDateToSwahiliEAT(dateString: any) {
   const date = new Date(dateString);
   // const options = {
   //    year: 'numeric',
   //    month: 'long',
   //    day: 'numeric',
   //    hour: 'numeric',
   //    minute: 'numeric',
   //    second: 'numeric',
   //    hour12: false, // 24-hour format
   //    timeZone: 'Africa/Nairobi'
   // };

   return new Intl.DateTimeFormat('sw-KE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false, // 24-hour format
      timeZone: 'Africa/Nairobi'
   }).format(date);
}

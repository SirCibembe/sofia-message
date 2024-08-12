'use client';

import SidebarHeader from "./SidebarHeader"
import ContactList from "../ui/ContactList";

export default function Sidebar() {
   return (
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white border-r border-gray-300">
      {/* <!-- Sidebar Header --> */}
      <SidebarHeader  />
      {/* <!-- Contact List --> */}
      <ContactList />
   </div>
   )
}
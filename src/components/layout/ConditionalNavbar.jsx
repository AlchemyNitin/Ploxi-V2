'use client'

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';

export default function ConditionalNavbar() {
  const pathname = usePathname();
  
  // Hide navbar on main landing page, cleantech, and climate-finance
  const hideNavbarRoutes = ['/', '/cleantech', '/climate-finance','/cleantech/registration','/cleantech/add-listing','/cleantech/dashboard','/climate-finance/dashboard','/climate-finance/registration','/climate-finance/investor-registration','/climate-finance/consultation'];
  
  if (hideNavbarRoutes.includes(pathname)) {
    return null;
  }
  
  return <Navbar />;
}

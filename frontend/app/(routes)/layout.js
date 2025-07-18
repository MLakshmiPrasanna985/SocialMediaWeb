"use client"
import React, { useState, useEffect } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import GlobalApi from '../_utils/GlobalApi'
import { useUser } from '@clerk/nextjs'
import { useContext } from 'react/cjs/react.development'
import { UserDetailContext } from '../_context/UserDetailContext'

function Layout({ children }) {
  const [toggleSideBar, setToggleSideBar] = useState(true)
  const { user } = useUser();
  const {userDetail,setUserDetail}=useContext(UserDetailContext);
  const getUserDetails = () => {
    GlobalApi.getUserByEmail(user.primaryEmailAddress.emailAddress).then(resp => {
      setUserDetail(resp.data);
    });
  };

  useEffect(() => {
    user && getUserDetails();
  }, [user]);

  return (
    <div>
      {/* This side bar used when screen size is medium or larger  */}
      <div className='hidden md:w-64 md:block h-screen fixed'>
        <SideNav />
      </div>

      {/* This side bar used when screen size is smaller/mobile  */}
      {toggleSideBar &&
        <div className='bg-white absolute md:w-64 md:block h-screen animate-in duration-700'>
          <SideNav toggleSideBar={() => setToggleSideBar(false)} />
        </div>}

      <div className='md:ml-64'>
        {/* Header  */}
        <Header toggleSideBar={() => setToggleSideBar(true)} />
        <div className='grid grid-cols-1 md:grid-cols-3'>
          {/* user used render page route  */}
          <div className='md:col-span-2'>
            {children}
          </div>
          {/* Right Most Section of page */}
          <div className='p-5'>Side Section</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
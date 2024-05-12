import React, { useEffect, useState } from 'react'
import UserDetailsPanel from '../components/admin/UserDetailsPanel'
import ViewEnrolledCourses from '../components/ViewEnrolledCourses'
import ViewCompletedCourses from '../components/ViewCompletedCourses'

export default function UserProfile() {


    return (
        <div className=' flex flex-row bg-slate-100 w-full h-full'>
            <div className=' w-[33vw] ml-10 mb-10'>
                <UserDetailsPanel />
            </div>
            <div className='h-[68vh] w-[60vw] mt-16 ml-10 flex flex-col justify-between '>

                <ViewEnrolledCourses />
                <ViewCompletedCourses/>
                
            </div>
        </div>
    )
}
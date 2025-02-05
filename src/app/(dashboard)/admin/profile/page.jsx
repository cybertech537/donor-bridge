'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FiFacebook, FiInstagram, FiLinkedin, FiTwitter, FiUser } from 'react-icons/fi'
import { GiHeartDrop } from 'react-icons/gi'
import { FaDisease } from 'react-icons/fa6'
import { IoCalendarClearSharp } from 'react-icons/io5'
import { LuMapPin } from 'react-icons/lu'
import { useAuth } from '@/services/AuthProvider'
import DonateModal from '@/components/Donors/DonatModal'
import axios from 'axios'
import { HiOutlineUserCircle } from "react-icons/hi2";
import moment from 'moment'
import Loader from '@/components/loader/Loader'

export default function DonorDetail() {

   const { user } = useAuth();

   if (!user) {
      return <Loader />;
   }

   console.log(user)

   return (
      <div className="">
         <div className="">
            <div className="flex flex-wrap gap-8 border-2 border-gray-200 bg-white p-10">
               <div className="">
                  {/* <Image src={user?.image} alt='profile' height={200} width={200} className='border-4 border-white shadow-lg rounded-full object-cover' /> */}
                  <HiOutlineUserCircle className='text-primary h-48 w-48' />
               </div>
               <div className="md:flex-1">
                  <div className="flex justify-between items-start">
                     <div className="">
                        <h2 className='text-2xl lg:text-3xl'>{user?.name}</h2>
                        <div className="inline-flex gap-2 text-lg items-center text-gray-500">
                           <GiHeartDrop className='text-primary mt-1' />
                           Blood Donation Fighter
                        </div>
                        <div className="flex flex-wrap gap-4 text-2xl mt-4 text-primary">
                           {
                              user?.socialMedia?.facebook &&
                              <Link href={user?.socialMedia?.facebook} target='_blank'><FiFacebook /></Link>
                           }
                           {
                              user?.socialMedia?.instagram &&
                              <Link href={user?.socialMedia?.instagram} target='_blank'><FiInstagram /></Link>
                           }
                           {
                              user?.socialMedia?.twitter &&
                              <Link href={user?.socialMedia?.twitter} target='_blank'><FiTwitter /></Link>
                           }
                        </div>
                     </div>
                     <Link href={'/admin/profile/edit/'} className='btn btn-primary'>Edit / Update</Link>
                  </div>
                  <div className="text-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                     <div className="">
                        <div className="uppercase text-gray-600 mb-2 text-base">
                           Contact
                        </div>
                        <div className="font-bold">
                           <Link href={`tel:${user?.phone}`}>{user?.phone}</Link>
                        </div>
                     </div>
                     {user?.bloodGroup &&
                        <div className="">
                           <div className="uppercase text-gray-600 mb-2 text-base">
                              Blood Group
                           </div>
                           <div className="font-bold">{user?.bloodGroup}</div>
                        </div>
                     }

                     {user?.address?.upazila &&
                        <div className="">
                           <div className="uppercase text-gray-600 mb-2 text-base">
                              Address
                           </div>
                           <div className="font-bold">
                              {user?.address?.upazila}, {user?.address?.district}
                           </div>
                        </div>
                     }
                     {user?.occupation &&
                        <div className="">
                           <div className="uppercase text-gray-600 mb-2 text-base">
                              Occupation
                           </div>
                           <div className="font-bold">{user?.occupation}</div>
                        </div>
                     }

                     <div className="">
                        <div className="uppercase text-gray-600 mb-2 text-base">
                           Total Donation
                        </div>
                        <div className="font-bold">
                           {user?.donationHistory?.length} times
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="overflow-x-auto mt-10 border-2 border-gray-200 bg-white p-10">
            <div className='flex justify-between items-center'>

               <div className="mb-4">
                  <h2 className="text-2xl mb-2">
                     Donation History
                  </h2>
                  <p>Below data shows how many times you donated blood.</p>
               </div>
               <DonateModal />
            </div>
            <table className='table'>
               <thead>
                  <tr>
                     <th className='border-b'>
                        <div className="flex gap-1 items-center text-sm">
                           <FiUser className='text-primary text-lg' />
                           Recipant Name
                        </div>
                     </th>
                     <th className='border-b'>
                        <div className="flex gap-1 items-center text-sm">
                           <FaDisease className='text-primary text-lg' />
                           Disease
                        </div>
                     </th>
                     <th className='border-b'>
                        <div className="flex gap-1 items-center text-sm">
                           <LuMapPin className='text-primary text-lg' />
                           Area
                        </div>
                     </th>
                     <th className='border-b'>
                        <div className="flex gap-1 items-center text-sm">
                           <IoCalendarClearSharp className='text-primary text-lg' />
                           Donation Date
                        </div>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {
                     user?.donationHistory?.length > 0 ?
                        <>
                           {
                              user?.donationHistory?.map((history) =>
                                 <tr key={history?._id}>
                                    <td className='border-b'>{history?.recipientId?.name}</td>
                                    <td className='border-b'>{history?.disease}</td>
                                    <td className='border-b'>{history?.area}</td>
                                    {/* <td className='border-b'>{user?.address?.upazila}, {user?.address?.district}</td> */}
                                    <td className='border-b'>{moment(history?.donationDate).format('MMMM Do YYYY')}</td>
                                 </tr>
                              )
                           }
                        </> :

                        <tr>
                           <td colSpan={4} className='text-center border-b'>Donation history is empty</td>
                        </tr>
                  }
               </tbody>
            </table>
         </div>
         <div className="overflow-x-auto mt-10 border-2 border-gray-200 bg-white p-10">
            <div className="mb-4">
               <h2 className="text-2xl mb-2">
                  Recipient History
               </h2>
               <p>Below data shows how many times you received blood.</p>
            </div>
            <table className='table'>
               <thead>
                  <tr>
                     <th className='border-b'>
                        <div className="flex gap-1 items-center text-sm">
                           <FiUser className='text-primary text-lg' />
                           Donor Name
                        </div>
                     </th>
                     <th className='border-b'>
                        <div className="flex gap-1 items-center text-sm">
                           <FaDisease className='text-primary text-lg' />
                           Disease
                        </div>
                     </th>
                     <th className='border-b'>
                        <div className="flex gap-1 items-center text-sm">
                           <LuMapPin className='text-primary text-lg' />
                           Area
                        </div>
                     </th>
                     <th className='border-b'>
                        <div className="flex gap-1 items-center text-sm">
                           <IoCalendarClearSharp className='text-primary text-lg' />
                           Donation Date
                        </div>
                     </th>
                  </tr>
               </thead>
               <tbody>
                  {
                     user?.receivedHistory?.length > 0 ?
                        <>
                           {
                              user?.receivedHistory?.map((history) =>
                                 <tr key={history?._id}>
                                    <td className='border-b'>{history?.donorId?.name}</td>
                                    <td className='border-b'>{history?.disease}</td>
                                    <td className='border-b'>{history?.area}</td>
                                    {/* <td className='border-b'>{user?.address?.upazila}, {user?.address?.district}</td> */}
                                    <td className='border-b'>{moment(history?.donationDate).format('MMMM Do YYYY')}</td>
                                 </tr>
                              )
                           }
                        </> :

                        <tr>
                           <td colSpan={4} className='text-center border-b'>Recipient history is empty</td>
                        </tr>
                  }
               </tbody>
            </table>
         </div>
      </div>
   )
}

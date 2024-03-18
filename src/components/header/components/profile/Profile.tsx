'use client'
import {
  BookCheck,
  CircleUser,
  Coins,
  Loader,
  Mail,
  MapPin,
  PackageOpen,
  X,
} from 'lucide-react'
import React, {useEffect, useState} from 'react'
import axios from 'axios'

import './profile.scss'
import {UseTg} from '@/hooks/useTg'

type ModalProps = {
  closeModal: () => void
}

const iconMap: Record<string, React.ReactElement> = {
  locale: <MapPin size={32} strokeWidth={1} />,
  email: <Mail size={32} strokeWidth={1} />,
  fio: <BookCheck size={32} strokeWidth={1} />,
  bonus: <Coins size={32} strokeWidth={1} />,
  orders: <PackageOpen size={32} strokeWidth={1} />,
}

const Profile = ({closeModal}: ModalProps) => {
  const {tg, user} = UseTg()
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const userReq = async (chat_id: string) => {
      console.log(process.env.URL)
      if (chat_id) {
        try {
          const userFetch = await axios.post(
            `https://stockhub12.ru:4200/api/user/get`,
            {chat_id},
            {
              headers: {'Content-Type': 'application/json'},
            },
          )
          console.log('userFetch data:', userFetch.data)
          setUserData(userFetch.data)
        } catch (err) {
          return null
        }
      } else {
        console.log('skip')
      }
    }
    userReq(user?.id.toString())
  }, [tg, user])

  return (
    <>
      <button type='button' onClick={closeModal}>
        <X className='absolute top-0 right-0 mt-5 mr-5' size={30} />
      </button>

      <div className='mt-16 ml-3 profile'>
        {userData ? (
          <div className='mt-2'>
            <div className='flex items-center '>
              <CircleUser size={35} strokeWidth={1} />
              <h2 className='text-lg font-medium'>
                {user?.first_name ? user.first_name : 'Anton'}
              </h2>
            </div>

            {Object.entries(userData).map(([key, value], index) => (
              <div className='flex items-center mt-2' key={index}>
                <div className='flex items-center font-medium'>
                  <div className='me-2 profile__icon'>{iconMap[key]}</div>
                  <span className='capitalize'>{key}:</span>
                </div>
                <span className='ms-2 italic'>
                  {value === 'none' ? '🚫' : (value as React.ReactNode)}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex justify-center items-center relative'>
            <Loader
              className='animate-spin-slow spinner absolute top-60'
              size={40}
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Profile

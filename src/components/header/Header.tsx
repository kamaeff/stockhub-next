'use client'
import {CircleUser, Home, Loader, PackageOpen} from 'lucide-react'
import Link from 'next/link'
import {AnimatePresence, motion} from 'framer-motion'
import React, {useEffect, useState} from 'react'

import Modal from './components/Basket'
import {UseTg} from '../hooks/useTg'
import Profile from './components/profile/Profile'

type SearchParamProps = {
  searchParams: Record<string, string> | null | undefined
}

export default function Header({searchParams}: SearchParamProps) {
  const {user} = UseTg()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const basket = searchParams?.basket
  const profile = searchParams?.profile

  return (
    <div className='flex justify-between items-center mt-3 mx-2'>
      <div className=''>
        {user ? (
          <Link
            href='/?profile=true'
            onClick={openModal}
            className='pl-2 flex items-center gap-1'
          >
            <CircleUser strokeWidth={1} size={32} />
            <span>{user.first_name}</span>
          </Link>
        ) : (
          <div className='flex items-center'>
            <Loader className='animate-spin-slow spinner' size={34} />
            <span className='font-medium text-2xl'>💀</span>
          </div>
        )}
      </div>

      <Link
        href='/?basket=true'
        onClick={openModal}
        className='flex items-center pr-2'
      >
        <PackageOpen size={32} strokeWidth={1} />
        <span className='italic text-xl pt-6'>2</span>
        {/* TODO: Выводит из бд колличество товаров в корзине */}
      </Link>

      <AnimatePresence>
        {basket && isModalOpen && (
          <motion.div
            initial={{opacity: 0, y: 1000}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 1000}}
            transition={{duration: 0.5}}
            className='fixed inset-0 modal'
          >
            <Modal closeModal={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {profile && isModalOpen && (
          <motion.div
            initial={{opacity: 0, y: 1000}}
            animate={{opacity: 1, y: 0}}
            exit={{opacity: 0, y: 1000}}
            transition={{duration: 0.5}}
            className='fixed inset-0 modal'
          >
            <Profile closeModal={closeModal} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

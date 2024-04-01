'use client'
import {ChevronLeft, ChevronRight, X} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

import item from '../../../../public/ProductItem.png'

type ModalProps = {
  closeModal: () => void
}

export default function Card({closeModal}: ModalProps) {
  return (
    <div className='flex relative flex-col'>
      <Link href='/'>
        <X
          onClick={closeModal}
          className='absolute top-0 right-0 mt-5 mr-5'
          size={36}
        />
      </Link>

      {/* <div className='mt-20 text-3xl text-center'>Тут будет карточка товара</div> */}
      <div className='flex flex-col mt-14 items-center italic '>
        <Image src={item} priority={true} width={350} alt='item' />

        <div className='text-center'>
          <h3 className='text-2xl'>Jordan 4 Retro SE Craft Photon Dust</h3>
          <p>
            Кроссовки Air Jordan 4 Retro SE "Craft Photon Dust" Основа пары
            выполнена из премиальной гладкой кожи пыльно-серого цвета, а также
            натуральной замши в том же оттенке.
          </p>
        </div>

        <select className='mt-5' name='size'>
          <option hidden>Выбери размер</option>
          <option value='8'>8 us</option>
          <option value='8.5'>8.5 us</option>
          <option value='9'>9 us</option>
        </select>

        <div className='flex mt-7 gap'>
          <Link className='basket py-2 px-8 rounded-lg' href='/'>
            <ChevronLeft />В корзину
          </Link>
          <Link className='order py-2 px-8 rounded-lg' href='/'>
            Заказать <ChevronRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

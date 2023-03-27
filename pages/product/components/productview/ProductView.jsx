import { useRef, useState } from 'react'
import Image from 'next/image'

import { url } from 'data';

import { ProductViewEffect } from './productvieweffect';

import style from './productview.module.scss'

const ProductView = ({ ProductViewEffect }) => {


    return (
        <div className={style.productViewWrapper}>
            {ProductViewEffect}
        </div>
    )
}
export default ProductView

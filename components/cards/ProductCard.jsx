import Image from 'next/image'
import React from 'react'

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import FirstImage from "@assets/images/categories/laptop.png";
import { Button } from 'react-bootstrap';

import { calcPriceDiscount } from 'utils';

import style from './productcard.module.scss'

const ProductCard = ({ product }) => {

    const renderPrice = () => {
        if (product?.price_discount) {
            return (
                <div className='d-flex align-items-center justify-content-center'>
                    <span className={style.productPrice}>{product?.price_discount} جنية</span>
                    <span className={`${style.productPrice} ${style.oldPrice}`}>{product?.price} جنية</span>
                </div>
            )
        } else {
            return <span className={style.productPrice}>{product?.price} جنية</span>
        }

    }

    const renderDicountPrecentage = () => {
        if (product?.price_discount) {
            return (
                <div
                    className={style.productDiscount}>
                    {calcPriceDiscount(product.price, product.price_discount)}%
                </div>)
        }

    }
    return (
        <div className={`${style.productCard} text-center`}>
            {renderDicountPrecentage()}
            <div className={style.productAction}>
                {/* <div className={style.favourite}>
                    <FavoriteBorderIcon fontSize="small" />
                </div> */}
            </div>
            <div className={style.productCardImageWrapper}>
                <Image width="300" height="200" src={product?.image || FirstImage} className={style.productCardImage} alt="product-image" />
            </div>
            <div className={style.productCardDescription}>
                <div className={`${style.productRatingWrapper}`}>
                    <StarIcon className={style.productRating} />
                    <StarIcon className={style.productRating} />
                    <StarIcon className={style.productRating} />
                    <StarOutlineIcon className={style.productRating} />
                    <StarOutlineIcon className={style.productRating} />
                </div>
                <p className={style.productName}>{product?.product_name}</p>
                <p className={style.productDescription}>{product?.short_description}</p>
                <div className='d-flex align-items-center justify-content-center'>
                    {renderPrice()}
                </div>
                <Button className={style.addProduct}>
                    <span className={style.text}>اضافة الي سلة التسوق</span>
                    <ShoppingBagOutlinedIcon className={style.icon} fontSize="small" />
                </Button>
            </div>
        </div>
    )
}

export default ProductCard

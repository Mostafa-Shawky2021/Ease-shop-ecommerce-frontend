import Image from 'next/image'
import Link from 'next/link';
import React, { useContext } from 'react'

import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';

import FirstImage from "@assets/images/categories/laptop.png";
import { Button } from 'react-bootstrap';

import { calcPriceDiscount, generateRandomId } from 'utils';
import { CartContext } from 'context';

import style from './productcard.module.scss'
import { useAddCartData, useIncrementProductData } from 'hooks';

const ProductCard = ({ product }) => {

    const { carts } = useContext(CartContext);

    const { mutate: addCartMutation } = useAddCartData();
    const { mutate: incrementProductMutation } = useIncrementProductData()
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

    const handleAddProduct = () => {
        const randomId = generateRandomId();

        const cartData = {
            user_id: randomId,
            product_id: product.id,
            size: product?.size?.split(',')[0] || null,
            color: product?.color?.split(',')[0] || null,
            quantity: 1,
            unit_price: product.price_discount || product.price,
            total_price: product.price_discount || product.price
        }

        // check if product contain color or size
        if (product.color || product.size) {
            // check if cart has already been added
            const cartExistWithSamedata = carts.find(product => {
                if (cartData.size == product.size && cartData.color == product.color) {
                    return product;
                }
            });
            if (cartExistWithSamedata) {
                incrementProductMutation({ cartId: cartExistWithSamedata.id })
            } else {
                addCartMutation(cartData)
            }
        } else {
            // check if cart has already been added
            const cartExist = carts.find(cart => cart.product_id === cartData.product_id)
            if (cartExist) {
                incrementProductMutation({ cartId: cartExist.id });
            } else {
                addCartMutation(cartData)
            }
        }

    }
    return (
        <div className={`${style.productCard} text-center`}>
            {renderDicountPrecentage()}
            <div className={style.productAction}>
                <div className={style.favourite}>
                    <FavoriteBorderIcon fontSize="small" />
                </div>
            </div>
            <div className={style.productCardImageWrapper}>
                <Link href={`product/${product?.product_slug}`}>
                    <Image
                        fill
                        src={product?.image}
                        className={style.productCardImage}
                        alt="product-image" />
                </Link>
            </div>
            <div style={{ paddingLeft: '5px', paddingRight: '5px' }}>
                <div className={`${style.productRatingWrapper}`}>
                    <StarIcon className={style.productRating} />
                    <StarIcon className={style.productRating} />
                    <StarIcon className={style.productRating} />
                    <StarOutlineIcon className={style.productRating} />
                    <StarOutlineIcon className={style.productRating} />
                </div>
                <Link href={`product/${product?.product_slug}`}>
                    <p className={style.productName}>{product?.product_name}</p>
                </Link>

                <p className={style.productDescription}>{product?.short_description}</p>
                <div className='d-flex align-items-center justify-content-center'>
                    {renderPrice()}
                </div>
                <Button className={style.addProduct} onClick={handleAddProduct}>
                    <div className={style.contentWrapper}>
                        <span className={style.text}>اضافة الي سلة التسوق</span>
                        <ShoppingBagOutlinedIcon className={style.icon} fontSize="small" />
                    </div>
                </Button>
            </div>
        </div>
    )
}

export default ProductCard

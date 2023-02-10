import React, { useState, useEffect } from 'react';

import Link from 'next/link';
import Image from 'next/image';

import {
    useDecrementProductData,
    useIncrementProductData,
    useDeleteProductData,
    useGuest,
    useCartsData
} from 'hooks';

import { calcTotalPrice } from '@root/utils';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import { Button } from 'react-bootstrap';
import { ProductQuantity } from '@root/components/productquantity';
import { ListItem } from '@root/components/listitem';

import style from './sidebarcartlist.module.scss';


const SidebarCartList = ({ isOpenCartList, setIsOpenCartList }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentCart, setCurrentCart] = useState(0);

    const { guestId } = useGuest();

    const { mutate: incrementProductMutation } = useIncrementProductData(setIsLoading);
    const { mutate: decrementProductMutation } = useDecrementProductData(setIsLoading);
    const { mutate: deleteProductMutation } = useDeleteProductData();

    const { data: carts } = useCartsData(guestId)

    useEffect(() => {
        const closeCartList = (event) => {
            if (event.key === "Escape") setIsOpenCartList(false);
        }
        document.body.addEventListener('keydown', closeCartList)
        return () => document.body.removeEventListener('keydown', closeCartList)
    }, [])

    const handleProductIncrement = (event) => {
        const cartId = Number(event.currentTarget.getAttribute('data-cart-id'));
        setCurrentCart(cartId);
        incrementProductMutation({ cartId })
    }

    const handleProductDecrement = (event) => {
        const cartId = Number(event.currentTarget.getAttribute('data-cart-id'));
        setCurrentCart(cartId)
        decrementProductMutation({ cartId });

    }

    const handleProductDelete = (event) => {
        const cartId = Number(event.currentTarget.getAttribute('data-cart-id'));
        deleteProductMutation(cartId);
    }

    return (
        <div className={`${style.listWrapper} ${isOpenCartList ? style.openCartList : ''}`}>
            <header className={style.header}>
                <h4 className={style.title}>سلة التسوق</h4>
                <CloseIcon
                    onClick={() => setIsOpenCartList(false)}
                    fontSize="small"
                    className={style.closeIcon} />
            </header>
            <div className={`${style.cartList}`}>
                <ListItem
                    data={carts}
                    renderItem={(cart) => (
                        <div className={`${style.item} d-flex flex-wrap`} key={cart?.id}>
                            <div className={style.productImage}>
                                <Image
                                    src={cart?.product?.image}
                                    alt={cart?.product?.image}
                                    fill
                                />
                            </div>
                            <div className={style.productDetails}>
                                <div className={style.productName}>
                                    {cart?.product?.product_name} |
                                    <span className={style.unitPrice}>
                                        {cart?.unit_price} جنية
                                    </span>
                                </div>
                                <div className={style.productMeta}>
                                    {cart.color &&
                                        (<span className={style.meta}>{cart?.color}</span>)}
                                    {cart.size &&
                                        (<span className={style.meta}>- {cart?.size}</span>)}
                                </div>
                                <div className={style.productPrice}>
                                    {cart?.total_price}
                                    <span className={style.currency}>جنية</span>
                                    <span className={style.quantity}> x{cart.quantity}</span>
                                </div>
                                <div className="d-flex align-items-center">
                                    <div className={style.productQuantity}>
                                        <ProductQuantity
                                            handleProductIncrement={handleProductIncrement}
                                            handleProductDecrement={handleProductDecrement}
                                            quantity={cart?.quantity}
                                            isLoading={isLoading}
                                            cartId={cart?.id}
                                            currentCart={currentCart}
                                        />
                                    </div>
                                    <Button
                                        className={style.btnDelete}
                                        onClick={handleProductDelete}
                                        data-cart-id={cart.id}
                                    >
                                        <DeleteOutlineIcon fontSize="small" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )} />
            </div>
            <div className={style.footer}>
                <div className={`${style.cost} d-flex align-items-center justify-content-between`}>
                    <span className={style.titleCost}>الاجمالي</span>
                    <span className={style.totalPrice}>
                        {calcTotalPrice(carts)}
                        <span className={style.currency}>جنية</span>
                    </span>
                </div>
                <div className={`${style.checkoutWrapper} d-flex`}>
                    <Link href="/checkout" className={style.btn}>الطلب</Link>
                    <Link href="/carts" className={style.btn}>سلة التسوق</Link>
                </div>
            </div>
        </div>
    )

}
export default SidebarCartList;
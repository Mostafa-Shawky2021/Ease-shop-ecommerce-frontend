import { useState } from 'react';
import Image from 'next/image';

import {
    useCartsData,
    useDecrementProductData,
    useDeleteProductData,
    useGuest,
    useIncrementProductData
} from '@root/hooks';

import { calcCartsCount } from '@root/utils';


import { ProductQuantity } from '@root/components/productquantity';

import { ListItem } from '@root/components/listitem';
import { CartListLoading } from '@root/components/loading';
import DeleteIcon from '@mui/icons-material/Delete';

import style from './cartlist.module.scss';


const CartList = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [currentCart, setCurrentCart] = useState(0);

    const { guestId } = useGuest();

    const { data: carts, isLoading: isCartsLoading } = useCartsData(guestId);

    const { mutate: incrementProductMutation } = useIncrementProductData(setIsLoading);
    const { mutate: decrementProductMutation } = useDecrementProductData(setIsLoading);
    const { mutate: deleteProductMutation } = useDeleteProductData();


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
        const deleteStatus = confirm('هل انت متاكد من انك تريد حذف المنتج؟');
        if (deleteStatus) {
            const cartId = Number(event.currentTarget.getAttribute('data-cart-id'));
            deleteProductMutation(cartId);
        }

    }

    return (
        <div className={style.cartListWrapper}>
            <header className={`${style.header} d-flex align-items-center justify-content-between`}>
                <h4 className={style.title}>سلة المشتريات</h4>
                <span className={style.itemCount}>{calcCartsCount(carts)} عناصر</span>
            </header>
            {isCartsLoading
                ? <CartListLoading />
                : <ListItem
                    data={carts}
                    renderItem={(cart) => (
                        <div className={`${style.cartListBody} d-flex flex-wrap justify-content-between`} key={cart.id}>
                            <div className={`${style.productDetails}`}>
                                <ul className={`${style.list} list-unstyled`}>
                                    <li className={style.listItem}>
                                        <span>اسم المنتج: </span>
                                        <span>{cart.product.product_name}</span>
                                    </li>
                                    {cart.size && (
                                        <li className={style.listItem}>
                                            <span>المقاس</span>
                                            <span>{cart.size}</span>
                                        </li>)}
                                    {cart.color && (
                                        <li className={style.listItem}>
                                            <span>اللون</span>
                                            <span>{cart.color}</span>
                                        </li>)}
                                    <li className={style.listItem}>
                                        <span>سعر الوحدة:  </span>
                                        <span>{cart.unit_price}</span>
                                    </li>
                                    <li className={style.listItem}>
                                        <span>سعر الكلي :  </span>
                                        <span>{cart.total_price}</span>
                                    </li>
                                </ul>
                            </div>
                            <div className={style.productImageWraper}>
                                <Image
                                    src={cart.product.image}
                                    alt={cart.product.product_slug}
                                    style={{ objectFit: 'cover' }}
                                    width={140}
                                    height={120}
                                    className={style.image} />
                            </div>
                            <div className={`${style.productControl} d-flex align-items-center`}>
                                <ProductQuantity
                                    quantity={cart.quantity}
                                    handleProductIncrement={handleProductIncrement}
                                    handleProductDecrement={handleProductDecrement}
                                    isLoading={isLoading}
                                    cartId={cart?.id}
                                    currentCart={currentCart}
                                />
                                <div
                                    className={style.deleteProduct}
                                    data-cart-id={cart.id}
                                    onClick={handleProductDelete}>
                                    <DeleteIcon fontSize="small" />
                                </div>
                            </div>

                        </div>
                    )} />
            }




        </div>
    )
}

export default CartList;    
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
    useCartsData,
    useDecrementProductData,
    useDeleteProductData,
    useGuest,
    useIncrementProductData
} from '@root/hooks';

import { calcCartsCount } from '@root/utils';

import { Table, Button } from 'react-bootstrap';
import { ProductQuantity } from '@root/components/productquantity';
import { ListItem } from '@root/components/listitem';
import { CartListLoading } from '@root/components/loading';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';

import DefaultImage from '@assets/images/default/image.jpg';

import style from './cartlisttable.module.scss';

const CartListTable = () => {

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
            <div className={style.countinueShopping}>
                <Link href="/store">  العودة الي التسوق <ArrowBackIcon fontSize="small" /></Link>
            </div>
            {isCartsLoading
                ? <CartListLoading />
                : (
                    <div style={{ overflowX: 'auto' }}>
                        <Table className={style.cartTable}>
                            <thead>
                                <tr>
                                    <th>الصورة</th>
                                    <th>اسم المنتج</th>
                                    <th>اللون</th>
                                    <th>الحجم</th>
                                    <th>السعر</th>
                                    <th>الكمية</th>
                                    <th>المجموع الكلي</th>
                                    <th>التحكم</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!!carts.length
                                    ? carts?.map(cart =>
                                        <tr>
                                            <td style={{ width: '120px' }}>
                                                <Image
                                                    src={cart?.product?.image || DefaultImage}
                                                    alt={cart?.product?.product_name}
                                                    width={100}
                                                    height={80}
                                                />
                                            </td>
                                            <td>{cart?.product?.product_name}</td>
                                            <td>{cart?.color || '--'}</td>
                                            <td>{cart?.size || '--'}</td>
                                            <td>{Number(cart?.unit_price).toLocaleString()}</td>
                                            <td>
                                                <ProductQuantity
                                                    quantity={cart.quantity}
                                                    handleProductIncrement={handleProductIncrement}
                                                    handleProductDecrement={handleProductDecrement}
                                                    isLoading={isLoading}
                                                    cartId={cart?.id}
                                                    currentCart={currentCart}
                                                    style={{ justifyContent: 'center' }}
                                                />
                                            </td>
                                            <td>{Number(cart?.total_price).toLocaleString()}</td>
                                            <td>
                                                <Button
                                                    className={style.deleteProduct}
                                                    data-cart-id={cart.id}
                                                    onClick={handleProductDelete}>
                                                    <DeleteIcon fontSize="small" />
                                                </Button></td>
                                        </tr>
                                    ) : <tr><td>لا توجد منتجات في سلة المشتريات</td></tr>
                                }
                            </tbody>
                        </Table>
                    </div>
                )}
        </div>
    )
}

export default CartListTable;    
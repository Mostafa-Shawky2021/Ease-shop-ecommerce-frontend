import Image from 'next/image';
import { ProductQuantity } from '@root/components/productquantity';
import Myimage from '@assets/images/default/image.jpg';

import { useCartsData, useGuest } from '@root/hooks';

import DeleteIcon from '@mui/icons-material/Delete';

import { ListItem } from '@root/components/listitem';

import { calcCartsCount } from '@root/utils';
import style from './cartlist.module.scss';


const CartList = () => {

    const { guestId } = useGuest();

    const { data: carts } = useCartsData(guestId);


    return (
        <div className={style.cartListWrapper}>
            <header className={`${style.header} d-flex align-items-center justify-content-between`}>
                <h4 className={style.title}>سلة المشتريات</h4>
                <span className={style.itemCount}>{calcCartsCount(carts)} عناصر</span>
            </header>
            {!!carts?.length ? (
                <ListItem
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
                                            <span>{cart.ؤخمخق}</span>
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
                                />
                                <div className={style.deleteProduct} onClick={() => confirm("هل انت متاكد من حذف المنتج؟")}>
                                    <DeleteIcon fontSize="small" />
                                </div>
                            </div>
                        </div>
                    )} />



            ) : (<p>لا توجد منتجات لعرضها</p>)}
        </div>
    )
}

export default CartList;    
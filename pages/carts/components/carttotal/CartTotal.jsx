
import Link from 'next/link';
import { useCartsData, useGuest } from '@root/hooks';

import { calcTotalPrice } from '@root/utils';

import style from './carttotal.module.scss';

const CartTotal = () => {

    const { guestId } = useGuest();
    const { data: carts } = useCartsData(guestId)
    return (
        <>
            <div className={style.cartTotalWrapper}>
                <h4 className={style.title}>
                    اجمالي السعر من سلة المشتريات
                </h4>
                <div className={style.cartTotalBody}>
                    <div className='d-flex align-item-center justify-spacebetween'>
                        <span>الجموع الكلي:</span>
                        <span className={style.price}>{calcTotalPrice(carts)} جنية</span>
                    </div>
                    <Link href="/checkout" className={style.checkoutButton}>
                        <span className={style.text}>اتمام الاوردر</span>
                    </Link>
                </div>

            </div>
        </>
    )
}

export default CartTotal;
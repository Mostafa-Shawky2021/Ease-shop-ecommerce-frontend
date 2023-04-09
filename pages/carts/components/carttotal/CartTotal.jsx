
import Link from 'next/link';

import { calcTotalPrice } from '@root/utils';

import style from './carttotal.module.scss';

const CartTotal = ({ cartsData }) => {

    return (
        <>
            <div className={style.cartTotalWrapper}>
                <h4 className={style.title}>
                    اجمالي السعر من سلة المشتريات
                </h4>
                <div className={style.cartTotalBody}>
                    <div className='d-flex align-item-center justify-spacebetween'>
                        <div className={style.total}>الجموع الكلي:</div>
                        <div className={style.priceWrapper}>
                            <span className={style.price}>
                                {calcTotalPrice(cartsData)}
                            </span>
                            <span className={style.currency}>
                                جنية
                            </span>
                        </div>

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
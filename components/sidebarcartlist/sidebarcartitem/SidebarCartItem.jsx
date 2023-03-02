
import Image from 'next/image';

import DefaultImage from '@assets/images/default/image.jpg';

import style from './sidebarcartitem.module.scss';

const SidebarCartItem = ({ cart, productQuantity, deleteButton }) => {

    return (
        <div className={`${style.item} d-flex flex-wrap`}>
            <div className={style.productImage}>
                <Image
                    src={cart?.product?.image || DefaultImage}
                    alt={cart?.product?.image}
                    fill
                />
            </div>
            <div className={style.productDetails}>
                <div className={style.productName}>
                    {cart?.product?.product_name}
                </div>
                <div className={style.productPrice}>
                    {Number(cart?.total_price).toLocaleString()}
                    <span className={style.currency}>جنية</span>
                    <span className={style.quantity}> x{cart.quantity}</span>
                </div>
                <div className="d-flex align-items-center">
                    <div className={style.productQuantity}>
                        {productQuantity}
                    </div>
                    {deleteButton}
                </div>
            </div>
        </div>
    )
}

export default SidebarCartItem
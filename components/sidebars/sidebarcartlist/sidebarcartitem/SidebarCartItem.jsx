
import Image from 'next/image';

import { url } from 'data';

import DefaultImage from '@assets/images/default/image.jpg';

import style from './sidebarcartitem.module.scss';

const SidebarCartItem = ({ cart, productQuantity, deleteButton }) => {

    return (
        <div className={`${style.item} d-flex flex-wrap`}>
            <div className={style.productImage}>
                <Image
                    src={cart?.product?.image ? `${url}/${cart?.product.image}` : DefaultImage}
                    alt={cart?.product?.product_name}
                    width={50}
                    height={50}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className={style.productDetails}>
                <div className={style.productName}>
                    {cart?.product?.product_name}
                </div>
                <div className={style.productPriceWraper}>
                    <span className={style.price}>{Number(cart?.total_price).toLocaleString()}</span>
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
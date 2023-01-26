import Link from 'next/link';
import Image from 'next/image';
import { Button } from 'react-bootstrap';
import MyImage from '@assets/images/categories/laptop.png';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloseIcon from '@mui/icons-material/Close';

import style from './cartlist.module.scss';
import { ProductQuantity } from '../productquantity';

const CartList = () => {

    return (
        <div className={style.listWrapper}>
            <header className={style.header}>
                <h4 className={style.title}>سلة التسوق</h4>
                <CloseIcon fontSize="small" className={style.closeIcon} />
            </header>
            <div className={`${style.list} list-unstyled `}>
                <div className={`${style.item} d-flex flex-wrap`}>
                    <Link href="" className={style.productImage}>
                        <Image
                            src={MyImage}
                            alt="product"
                            fill
                        />
                    </Link>
                    <div className={style.productDetails}>
                        <div className={style.productName}> لابتوب لينوفو رامات لابتوب لينوفو رامات لابتوب لينوفو رامات 4 جيجا</div>
                        <div className={style.productPrice}>60 <span className={style.currency}>جنية</span></div>
                        <div className="d-flex align-items-center">
                            <div className={style.productQuantity}>
                                <ProductQuantity quantity={3} />
                            </div>
                            <Button className={style.btnDelete}>
                                <DeleteOutlineIcon fontSize="small" />
                            </Button>
                        </div>

                    </div>

                </div>
            </div>
            <div className={style.footer}>
                <div className={`${style.cost} d-flex align-items-center justify-content-between`}>
                    <span className={style.titleCost}>الاجمالي</span>
                    <span className={style.totalPrice}>
                        50
                        <span className={style.currency}>جنية</span>
                    </span>
                </div>
                <div className={`${style.checkoutWrapper} d-flex`}>
                    <Link href="#" className={style.btn}>الطلب</Link>
                    <Link href="#" className={style.btn}>سلة التسوق</Link>
                </div>
            </div>
        </div>
    )

}
export default CartList;
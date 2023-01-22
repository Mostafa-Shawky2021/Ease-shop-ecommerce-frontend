import React, { useContext, useEffect, useState } from 'react';
import style from "./productdetails.module.scss";

import SelectedBox from '@root/components/selectbox/SelectedBox';
import { ProductQuantity } from '@root/components/productquantity';
import { Button } from 'react-bootstrap';

import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { CartContext } from 'context';
import { actionsType } from 'data';

import { generateRandomId } from 'utils'
import { useAddCart } from 'pages/product/hooks';

const ProductDetails = ({ productDetails }) => {

    const [color, setColor] = useState('')
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    const { mutate } = useAddCart()

    useEffect(() => {
        const sizes = productDetails?.size?.split(',');
        const colors = productDetails?.color?.split(',');
        sizes && setSize(sizes[0]);
        colors && setColor(colors[0]);

    }, [productDetails])


    const renderProductColor = () => {
        const colorsArr = productDetails?.color?.split(',');
        const colorElements = colorsArr?.map((color, index) => (
            <div key={index} value={color} className={style.option}>{color}</div>
        ))
        return colorElements;
    }
    const renderProductSize = () => {
        const sizeArr = productDetails?.size?.split(',');
        const sizeElements = sizeArr?.map((size, index) => (
            <div key={index} value={size} className={style.option}>{size}</div>
        ))
        return sizeElements;
    }

    const handleAddtoCart = () => {
        const randomId = generateRandomId()

        const cartData = {
            userId: randomId,
            productId: productDetails.id,
            size,
            color,
            quantity,

        }
        mutate(cartData);
    }
    return (
        <div className={style.productDetailsWrapper}>

            <div className={style.productName}>{productDetails?.product_name}</div>
            <div className={`${style.priceWrapper} d-flex align-items-center`}>
                <div className={style.price}>{productDetails?.price_discount}جنية</div>
                <div className={style.oldPrice}>{productDetails?.price} جنية</div>
                <div className={style.discountPercentage}>خصم 50%</div>
            </div>
            <div className={style.shortDescription}>
                {productDetails?.short_description}
            </div>
            <ul className={`${style.listDetails} list-unstyled`}>
                <li className={style.item}>
                    <VerifiedUserOutlinedIcon className={style.icon} />
                    <label className={style.text}>{productDetails?.brand}</label>
                </li>

                <li className={style.item}>
                    <AttachMoneyIcon className={style.icon} />
                    <label className={style.text}>الدفع عن الاستلام</label>
                </li>
            </ul>
            {productDetails?.color && (
                <div className={`${style.productColor} d-flex align-items-center mb-3`}>
                    <label className={style.labelText}>اختر لون المنتج</label>
                    <div style={{ width: '200px' }}>
                        <SelectedBox onChange={(color) => setColor(color)}>
                            {renderProductColor()}
                        </SelectedBox>
                    </div>
                </div>
            )}

            {productDetails?.size && (<div className={`${style.productSize} d-flex align-items-center mb-3`} style={{ paddingBottom: '20px', borderBottom: '1px solid #e3e3e3' }}>
                <label className={style.labelText}>اختر المقاس</label>
                <div style={{ width: '200px' }}>
                    <SelectedBox onChange={(size) => setSize(size)}>
                        {renderProductSize()}
                    </SelectedBox>
                </div>
            </div>)}
            <div className={`${style.addCartDetails} d-flex`} style={{ borderBottom: '1px solid #eee', paddingBottom: "20px" }}>
                <div className={style.quantity}>
                    <ProductQuantity setQuantity={setQuantity} quantity={quantity} />
                </div>
                <Button className={style.addCartbtn} onClick={handleAddtoCart}>
                    اضافة الي السلة
                    <ShoppingCartOutlinedIcon fontSize="small" />
                </Button>
                <Button className={style.addFavouritebtn}>
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                </Button>
            </div>
            <ul className={`${style.listProductDetails} list-unstyled`}>
                <li className={style.item}>
                    <label className={style.text}>القسم: {productDetails?.category?.cat_name} </label>
                </li>
            </ul>
        </div>
    )
}
export default ProductDetails

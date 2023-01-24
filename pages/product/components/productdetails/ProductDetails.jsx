import React, { useContext, useEffect, useState } from 'react';


import SelectedBox from '@root/components/selectbox/SelectedBox';
import { ProductQuantity } from '@root/components/productquantity';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import { CartContext } from 'context';
import {
    useAddCartData,
    useIncrementProductData,
    useDecremenetProductData,
} from 'hooks';
import { generateRandomId } from 'utils'
import style from "./productdetails.module.scss";

const ProductDetails = ({ productDetails }) => {

    const [color, setColor] = useState('')
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [productAdded, setProductAdded] = useState(false)
    const [isLoading, setIsLoading] = useState(false);

    const { mutate: addCartMutation } = useAddCartData(
        setIsLoading,
        setProductAdded);

    const { mutate: incrementProductMutation } = useIncrementProductData(
        setIsLoading,
        setQuantity,
        setProductAdded);

    const { mutate: decrementProductMutation } = useDecremenetProductData(
        setIsLoading,
        setQuantity,
        quantity,
        setProductAdded);

    const { carts } = useContext(CartContext)


    useEffect(() => {

        const sizes = productDetails?.size?.split(',');
        const colors = productDetails?.color?.split(',');
        sizes && setSize(sizes[0]);
        colors && setColor(colors[0]);

    }, [productDetails])

    useEffect(() => {

        const product = carts?.find(product => product.product_id === productDetails.id);
        if (product) {
            setProductAdded(true);
        } else {
            setProductAdded(false);
        }
    }, [carts])

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

    const handleProductIncrement = () => {
        const userId = JSON.parse(window.localStorage.getItem('guest'))
        incrementProductMutation({ userId, productId: productDetails.id });

    }
    const handleProductDecrement = () => {
        const userId = JSON.parse(window.localStorage.getItem('guest'))
        decrementProductMutation({ userId, productId: productDetails.id });

    }
    const handleAddtoCart = () => {

        const randomId = generateRandomId();
        const cartData = {
            user_id: randomId,
            product_id: productDetails.id,
            size,
            color,
            quantity,
            unit_price: productDetails.price_discount && productDetails.price,
            total_price: 2500
        }
        addCartMutation(cartData)
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
                {productAdded ? (
                    <div className={style.quantity}>
                        <ProductQuantity
                            isLoading={isLoading}
                            quantity={quantity}
                            handleProductIncrement={handleProductIncrement}
                            handleProductDecrement={handleProductDecrement}
                        />
                    </div>
                ) : (
                    <div className={style.addCartBtnWrapper} style={{ width: '100%' }}>
                        {isLoading ? (<CircularProgress className={style.iconLoading} size={25} />) : (
                            <Button className={style.addCartbtn} onClick={handleAddtoCart}>
                                اضافة الي السلة
                                <ShoppingCartOutlinedIcon fontSize="small" />
                            </Button>
                        )}
                    </div>
                )}

                {/* <Button className={style.addFavouritebtn}>
                    <FavoriteBorderOutlinedIcon fontSize="small" />
                </Button> */}
            </div>
            <ul className={`${style.listProductDetails} list-unstyled`}>
                <li className={style.item}>
                    <label className={style.text}>
                        القسم: {productDetails?.category?.cat_name}
                    </label>
                </li>
            </ul>
            <ToastContainer />
        </div>
    )
}
export default ProductDetails

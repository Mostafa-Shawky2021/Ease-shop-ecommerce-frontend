import { useEffect, useState } from 'react';

import {
    useAddCartData,
    useIncrementProductData,
    useGuest,
    useCartsData,
} from '@root/hooks';

import { SelectedBox } from '@root/components/selectedbox';
import { ProductQuantity } from '@root/components/productquantity';
import { Button } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';

import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import CircularProgress from '@mui/material/CircularProgress';

import style from "./productdetails.module.scss";

const ProductDetails = ({ productDetails }) => {

    const [color, setColor] = useState('')
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const { guestId } = useGuest();

    const { data: carts } = useCartsData(guestId);
    const { mutate: addCartMutation } = useAddCartData(setIsLoading);
    const { mutate: incrementProductMutation } = useIncrementProductData(setIsLoading, setQuantity);

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

        let calcTotalPrice = 0;
        if (productDetails.price_discount) {
            calcTotalPrice = (productDetails.price_discount * quantity);
        } else {
            calcTotalPrice = (productDetails.price * quantity);
        }

        const cartData = {
            user_id: guestId,
            product_id: productDetails.id,
            size,
            color,
            quantity,
            unit_price: productDetails.price_discount || productDetails.price,
            total_price: calcTotalPrice
        }
        // check if product contain color or size
        if (productDetails.color || productDetails.size) {
            // check if cart has already been added
            const cartExistWithSamedata = carts.find(product => {
                if (cartData.size == product.size && cartData.color == product.color) {
                    return product;
                }
            });
            if (cartExistWithSamedata) {
                incrementProductMutation({ cartId: cartExistWithSamedata.id, quantity })
            } else {
                addCartMutation(cartData)
            }
        } else {
            // check if cart has already been added
            const cartExist = carts.find(cart => cart.product_id === cartData.product_id)
            if (cartExist) {
                incrementProductMutation({ cartId: cartExist.id, quantity });
            } else {
                addCartMutation(cartData)
            }
        }
    }
    const handleProductIncrement = () => setQuantity(quantity + 1)
    const handleProductDecrement = () => quantity > 1 && setQuantity(quantity - 1)

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
            {productDetails?.size &&
                (<div className={`${style.productSize} d-flex align-items-center mb-3`}>
                    <label className={style.labelText}>اختر المقاس</label>
                    <div style={{ width: '200px' }}>
                        <SelectedBox onChange={(size) => setSize(size)}>
                            {renderProductSize()}
                        </SelectedBox>
                    </div>
                </div>)}

            <div className={`${style.addCartDetails} d-flex`}>
                <div className={style.quantity}>
                    <ProductQuantity
                        quantity={quantity}
                        handleProductIncrement={handleProductIncrement}
                        handleProductDecrement={handleProductDecrement}
                    />
                </div>
                <div style={{ position: 'relative', width: '100%' }}>
                    {isLoading ?
                        (<CircularProgress className={style.iconLoading} size={25} />) :
                        (<Button className={style.addCartbtn} onClick={handleAddtoCart}>
                            اضافة الي السلة
                            <ShoppingCartOutlinedIcon fontSize="small" />
                        </Button>
                        )}
                </div>

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

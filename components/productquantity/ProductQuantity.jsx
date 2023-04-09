import React, { useState } from 'react';

import { Button } from 'react-bootstrap';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CircularProgress from '@mui/material/CircularProgress';

import style from './productquantity.module.scss';

const ProductQuantity = ({
    quantity,
    handleProductIncrement,
    handleProductDecrement,
    cartId,
    isLoading,
    currentCart,
    ...props

}) => {

    return (
        <div className={`${style.productQuantity} d-flex align-items-center`} {...props}>
            <Button
                className={style.quantityAction}
                onClick={handleProductIncrement}
                data-cart-id={cartId}
                disabled={isLoading && currentCart === cartId}>

                <AddIcon className={style.icon} fontSize="small" />
            </Button>
            <div className={style.content}>
                <span className={style.quantityContent}>
                    {(isLoading && currentCart == cartId)
                        ? <CircularProgress className={style.iconLoading} size={18} />
                        : quantity}
                </span>
            </div>
            <Button
                className={style.quantityAction}
                onClick={handleProductDecrement}
                data-cart-id={cartId}
                disabled={isLoading && currentCart === cartId}>
                <RemoveIcon className={style.icon} fontSize="small" />
            </Button>
        </div>
    )
}
export default ProductQuantity
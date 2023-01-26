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
    isLoading

}) => {

    return (
        <div className={`${style.productQuantity} d-flex align-items-center`}>
            <Button
                className={style.quantity}
                onClick={handleProductIncrement}
                data-cart-id={cartId}
            >
                <AddIcon className={style.icon} fontSize="small" />
            </Button>
            <div className={style.content}>
                <span className={style.quantityContent}>
                    {isLoading ?
                        <CircularProgress
                            className={style.iconLoading}
                            size={18} /> :
                        quantity}

                </span>
            </div>
            <Button
                className={style.quantity}
                onClick={handleProductDecrement}
                data-cart-id={cartId}
            >
                <RemoveIcon className={style.icon} fontSize="small" />
            </Button>
        </div>
    )
}
export default ProductQuantity
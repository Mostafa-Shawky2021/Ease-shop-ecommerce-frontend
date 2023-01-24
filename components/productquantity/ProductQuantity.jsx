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
    isLoading,
    productExist
}) => {

    return (
        <div className={`${style.productQuantity} d-flex align-items-center`}>
            <Button
                className={style.quantity}
                onClick={handleProductIncrement}
                disabled={isLoading}>
                <AddIcon className={style.icon} fontSize="small" />
            </Button>
            <div className={style.content}>
                {isLoading ? <CircularProgress className={style.iconLoading} size={25} /> : quantity}
            </div>
            <Button
                className={style.quantity}
                onClick={handleProductDecrement}
                disabled={isLoading}
            >
                <RemoveIcon className={style.icon} fontSize="small" />
            </Button>
        </div>
    )
}
export default ProductQuantity
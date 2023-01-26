import React, { useState } from 'react';

import { Button } from 'react-bootstrap';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CircularProgress from '@mui/material/CircularProgress';

import style from './productquantity.module.scss';

const ProductQuantity = ({
    quantity,
    handleProductIncrement,
    handleProductDecrement

}) => {

    return (
        <div className={`${style.productQuantity} d-flex align-items-center`}>
            <Button
                className={style.quantity}
                onClick={handleProductIncrement}
            >
                <AddIcon className={style.icon} fontSize="small" />
            </Button>
            <div className={style.content}>
                <span className={style.quantityContent}>{quantity}</span>
            </div>
            <Button
                className={style.quantity}
                onClick={handleProductDecrement}
            >
                <RemoveIcon className={style.icon} fontSize="small" />
            </Button>
        </div>
    )
}
export default ProductQuantity
import React, { useState } from 'react';

import { Button } from 'react-bootstrap';

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import style from './productquantity.module.scss';

const ProductQuantity = ({ quantity, setQuantity }) => {

    return (
        <div className={`${style.productQuantity} d-flex align-items-center`}>
            <Button className={style.quantity} onClick={() => setQuantity(quantity + 1)}>
                <AddIcon className={style.icon} fontSize="small" />
            </Button>
            <div className={style.content}>{quantity}</div>
            <Button
                className={style.quantity}
                onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
                <RemoveIcon className={style.icon} fontSize="small" />
            </Button>
        </div>
    )
}
export default ProductQuantity
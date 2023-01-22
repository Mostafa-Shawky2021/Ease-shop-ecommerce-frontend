import React from 'react';

import style from './productdescription.module.scss';
const ProductDescription = ({ productDescription }) => {

    return (
        <div className={style.productDescriptionWrapper}>
            <p className={style.productDescription}>
                {productDescription}
            </p>
        </div>
    )
}

export default ProductDescription

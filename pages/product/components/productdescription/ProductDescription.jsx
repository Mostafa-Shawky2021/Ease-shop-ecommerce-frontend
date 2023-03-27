import { SectionLayout } from '@root/components/layout';

import style from './productdescription.module.scss';

const ProductDescription = ({ productDescription }) => {

    return (
        productDescription &&
        <SectionLayout title="وصف المنتج">
            <div className={style.productDescriptionWrapper}>
                <p className={style.productDescription}>
                    <dangerouslySetInnerHTML dangerouslySetInnerHTML={{ __html: productDescription }} />
                    {/* {productDescription} */}
                </p>
            </div>
        </SectionLayout>

    )
}

export default ProductDescription

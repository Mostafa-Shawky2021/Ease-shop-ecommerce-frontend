import { Button } from 'react-bootstrap';

import style from './sizesvariant.module.scss';

const SizesVariant = ({
    sizes,
    handleChooseSize,
    choosenSize,
    className,
    ...props }) => {
    console.log(choosenSize)
    return (
        <div className={`${style.sizesWrapper} ${className}`} {...props}>
            {sizes?.map(size =>
                <Button
                    key={size.id}
                    onClick={handleChooseSize}
                    className={`${choosenSize === size.size_name ? style.activeChoose : ''} ${style.btnSize}`}
                    value={size.size_name}>
                    {size.size_name}
                </Button>
            )}

        </div>
    )
}

export default SizesVariant;
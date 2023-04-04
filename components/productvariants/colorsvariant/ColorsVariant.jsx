import { Button } from 'react-bootstrap';

import style from './colorsvariant.module.scss';

const ColorsVariant = ({
    colors,
    handleChooseColor,
    choosenColor,
    className,
    ...props }) => {

    return (

        <div className={`${style.colorsWrapper} ${className}`} {...props}>

            {colors?.map(color =>
                <Button
                    key={color.id}
                    onClick={handleChooseColor}
                    style={{ background: color.color_name }}
                    className={`${choosenColor === color.color_name ? style.activeChoose : ''} ${style.btnColor}`}
                    value={color.color_name}>
                </Button>
            )}

        </div>
    )
}

export default ColorsVariant;
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

            {colors?.map(color => {

                const activeChossenColor = choosenColor === color.color_name
                    ? style.activeChoose
                    : '';

                return <Button
                    key={color.id}
                    onClick={handleChooseColor}
                    style={{ background: color.color_value }}
                    className={`${activeChossenColor} ${style.btnColor}`}
                    value={color.color_name}>
                </Button>
            })
            }

        </div>
    )
}

export default ColorsVariant;
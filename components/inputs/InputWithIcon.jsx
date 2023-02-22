import { forwardRef } from 'react';

import style from './input.module.scss';

const InputWithIcon = forwardRef(({ children, className, ...props }, ref) => {

    return (
        <div className={style.inputWrapper}>
            <input
                ref={ref}
                className={`${style.inputBase} ${className}`}
                {...props}
            />
            {children}
        </div>)
})




export default InputWithIcon
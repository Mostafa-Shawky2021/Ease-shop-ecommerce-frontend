import style from './input.module.scss';

const InputWithIcon = ({ children, className, ...props }) => {

    return (
        <div className={style.inputWrapper}>
            <input
                className={`${style.inputBase} ${className}`}
                {...props}
            />
            {children}
        </div>)
}


export default InputWithIcon
import style from './loading.module.scss';

const Loading = ({ children, isOpacity = true }) => {
    return (
        <div className={style.loading} style={{ opacity: isOpacity ? '0.5' : '1' }}>
            {children && children}
        </div>
    )
}
export default Loading;
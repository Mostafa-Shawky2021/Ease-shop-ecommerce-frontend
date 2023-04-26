import { useEffect } from 'react';

import style from './loading.module.scss';

const Loading = ({ children, isOpacity = true, scrollBar = true }) => {


    useEffect(() => {
        if (scrollBar) {
            document.body.style.overflow = 'hidden';
            return () => document.body.style.overflow = 'visible';
        }

    }, [scrollBar]);

    return (
        <div className={`${style.loading} ${isOpacity ? style.opacity : ''}`}>
            <div className={style.contentLoadingIndicator}>
                {children}
            </div>
        </div>
    )
}
export default Loading;
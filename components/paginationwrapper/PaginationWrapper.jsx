import React from 'react';
import Pagination from 'react-js-pagination';

import style from './paginationwrapper.module.scss';

const PaginationWrapper = (props) => {
    return <Pagination
        innerClass={style.paginationWrapper}
        linkClass={style.pageItem}
        activeLinkClass={style.activePage}
        itemClassFirst={style.firstItem}
        itemClassLast={style.lastItem}
        {...props}
    />
}


export default PaginationWrapper;
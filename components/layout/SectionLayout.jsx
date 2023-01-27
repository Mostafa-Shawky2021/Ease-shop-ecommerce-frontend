import React, { useRef } from 'react'
import { Container } from 'react-bootstrap'
import style from './sectionlayout.module.scss'

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const SectionLayout = ({ title, children, isSwiper }) => {

    const nextElementRef = useRef(null)
    const prevElementRef = useRef(null)

    return (
        <div className={style.sectionLayout}>
            <Container fluid="xl" style={{ position: 'relative' }}>
                <header className={style.header}>
                    <h4 className={style.title}>{title}</h4>
                    {!!isSwiper && (
                        <div className={`${style.arrowWrapper} d-flex`}>
                            <div className={style.arrow} ref={nextElementRef}>
                                <ChevronRightIcon fontSize="small" className={style.arrowIcon} />
                            </div>
                            <div className={style.arrow} ref={prevElementRef}>
                                <ChevronLeftIcon fontSize="small" className={style.arrowIcon} />
                            </div>
                        </div>
                    )}
                </header>
                {typeof (children) === 'function'
                    ? children(nextElementRef, prevElementRef)
                    : children}
            </Container>
        </div>


    )
}


export default SectionLayout



import React, { useRef } from 'react'
import { Container } from 'react-bootstrap'
import style from './sectionlayout.module.scss'

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const SectionLayout = ({ title, children }) => {

    const nextElementRef = useRef(null)
    const prevElementRef = useRef(null)

    return (
        <div className={style.sectionLayout}>
            <Container fluid="xl" style={{ position: 'relative' }}>
                <header className={style.header}>
                    <h4 className={style.title}>{title}</h4>
                    <div className={`${style.arrowWrapper} d-flex`}>
                        <div className={style.arrow} ref={nextElementRef}>
                            <ChevronRightIcon fontSize="medium" className={style.arrowIcon} />
                        </div>
                        <div className={style.arrow} ref={prevElementRef}>
                            <ChevronLeftIcon fontSize="medium" className={style.arrowIcon} />
                        </div>
                    </div>
                </header>
                {children(nextElementRef, prevElementRef)}
            </Container>
        </div>


    )
}


export default SectionLayout



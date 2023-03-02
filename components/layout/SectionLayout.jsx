import { useRef } from 'react'
import Link from 'next/link';

import { Container } from 'react-bootstrap';

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import style from './sectionlayout.module.scss';


const SectionLayout = ({ title, children, link }) => {

    const nextElementRef = useRef(null)
    const prevElementRef = useRef(null)

    return (
        <div className={style.sectionLayout}>
            <Container fluid="xl" style={{ position: 'relative' }}>
                <header className={style.header}>
                    <h4 className={style.title}>
                        {link ? <Link href={link}>{title}</Link> : title}
                    </h4>
                    <div className={`${style.arrowWrapper} d-flex`}>
                        <div className={style.arrow} ref={nextElementRef}>
                            <ChevronRightIcon fontSize="small" className={style.arrowIcon} />
                        </div>
                        <div className={style.arrow} ref={prevElementRef}>
                            <ChevronLeftIcon fontSize="small" className={style.arrowIcon} />
                        </div>
                    </div>
                </header>
                {children(nextElementRef, prevElementRef)}
            </Container>
        </div>


    )
}


export default SectionLayout



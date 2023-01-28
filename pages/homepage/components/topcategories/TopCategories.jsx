import React from 'react'
import Image from 'next/image'
import { Container, Row, Col, Button } from 'react-bootstrap'
import FirstImage from "@assets/images/topcategories/cat1.jpg"
import SecondImage from "@assets/images/topcategories/cat2.jpg"
import ThirdImage from "@assets/images/topcategories/cat3.jpg"

import style from './topcategories.module.scss'

const TopCategories = () => {
    return (
        <div className={style.topcategories}>
            <Container>
                <Row>
                    <Col xs={12} md={4} >
                        <div className={style.imageWrapper}>
                            <Image src={FirstImage} className="img-fluid" alt="category-image" />
                            <Button className={style.viewMore}>رؤية المزيد</Button>
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className={style.imageWrapper}>
                            <Image src={SecondImage} className="img-fluid" alt="category-image" />
                            <Button className={style.viewMore}>رؤية المزيد</Button>
                        </div>
                    </Col>
                    <Col xs={12} md={4}>
                        <div className={style.imageWrapper}>
                            <Image src={ThirdImage} className="img-fluid" alt="category-image" />
                            <Button className={style.viewMore}>رؤية المزيد</Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}
export default TopCategories
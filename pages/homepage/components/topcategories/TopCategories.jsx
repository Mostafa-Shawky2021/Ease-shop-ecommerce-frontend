import React from 'react'
import Image from 'next/image'
import { Row, Col, Button } from 'react-bootstrap'
import { SectionLayout } from '@root/components/layout'

import FirstImage from "@assets/images/topcategories/cat1.jpg"
import SecondImage from "@assets/images/topcategories/cat2.jpg"
import ThirdImage from "@assets/images/topcategories/cat3.jpg"

import style from './topcategories.module.scss'

const TopCategories = () => {
    return (
        <div className={style.topcategories}>
            <SectionLayout title="الاقسام المميزة">
                <Row className='mt-3'>
                    <Col xs={6} sm={6} md={4}>
                        <div className={style.imageWrapper}>
                            <Image src={FirstImage} className="img-fluid" alt="category-image" />
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={4}>
                        <div className={style.imageWrapper}>
                            <Image src={SecondImage} className="img-fluid" alt="category-image" />
                        </div>
                    </Col>
                    <Col xs={6} sm={6} md={4}>
                        <div className={style.imageWrapper}>
                            <Image src={ThirdImage} className="img-fluid" alt="category-image" />
                        </div>
                    </Col>

                </Row>
            </SectionLayout>

        </div>

    )
}
export default TopCategories
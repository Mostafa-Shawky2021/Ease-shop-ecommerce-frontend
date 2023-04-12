import { useState } from 'react';
import Link from 'next/link';

import { useSendOrderData } from '../../hooks';
import { useGuest, useFormOrderValidation, useCartsData } from '@root/hooks';

import { Button, Form } from "react-bootstrap";
import { Loading } from '@root/components/loading';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CircularProgress from '@mui/material/CircularProgress';

import governorateData from 'data/governorate.json';

import style from './checkoutform.module.scss';

const CheckOutForm = () => {

    const [isLoading, setIsLoading] = useState(false);

    const { validateForm, formErrorMsg } = useFormOrderValidation();
    const { mutate: sendOrder } = useSendOrderData(setIsLoading);
    const { guestId } = useGuest();

    const handleSubmit = (event) => {

        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        const orderDetails = {
            guest_id: guestId,
            username: formData.get('username'),
            phone: formData.get('phone'),
            governorate: formData.get('governorate'),
            street: formData.get('street'),
            email: formData.get('email'),
            order_notes: formData.get('order_notes'),
        };

        if (validateForm(orderDetails)) sendOrder(orderDetails);

    }

    return (

        <div className={style.checkoutWrapper}>
            {isLoading &&
                <Loading>
                    <CircularProgress
                        size={35}
                        style={{
                            position: 'absolute',
                            top: '40vh',
                            left: '50%'
                        }} />
                </Loading>
            }
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{ position: 'relative' }} className="mb-3 mt-3" controlId="username">
                    <div className='d-flex align-items-center'>
                        <Form.Label className={style.formLabel}>
                            اسم المستخدم
                        </Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                        <span className={style.errMsg}>{formErrorMsg.username}</span>
                    </div>
                    <Form.Control
                        name="username"
                        className={`${style.formControl} ${formErrorMsg.username ? style.errorField : ''}`}
                        autoComplete="off" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <div className='d-flex align-items-center'>
                        <Form.Label className={style.formLabel}>
                            رقم التلفون
                        </Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                        <span className={style.errMsg}>{formErrorMsg.phone}</span>
                    </div>
                    <Form.Control
                        name="phone"
                        className={`${style.formControl} ${formErrorMsg.phone ? style.errorField : ''}`} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="governorate">
                    <div className='d-flex align-items-center'>
                        <Form.Label className={style.formLabel}>
                            المحافظة
                        </Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                        <span className={style.errMsg}>{formErrorMsg.governorate}</span>
                    </div>
                    <Form.Select
                        name="governorate"
                        className={`${style.formControl} ${formErrorMsg.governorate ? style.errorField : ''}}`}>
                        <option value="">...</option>
                        {governorateData.governorates.map(governorate => (
                            <option
                                key={governorate.id}
                                className={style.option}
                                value={governorate.governorate_name_ar}>
                                {governorate.governorate_name_ar}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="street">
                    <div className='d-flex align-items-center'>
                        <Form.Label className={style.formLabel}>
                            عنوان الشارع
                        </Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                        <span className={style.errMsg}>{formErrorMsg.street}</span>
                    </div>
                    <Form.Control
                        name="street"
                        type="text"
                        className={`${style.formControl} ${formErrorMsg.street ? style.errorField : ''}`} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className={style.formLabel}>
                        البريد الالكتروني
                    </Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        className={style.formControl} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label className={style.formLabel}>
                        ملاحظات بخصوص الاوردر
                    </Form.Label>
                    <Form.Control as="textarea" rows={3} name="order_notes" />
                </Form.Group>
                <Form.Group className="mt-4 d-flex align-items-center justify-content-between">
                    <Button className={style.checkOutbtn} type='submit'>
                        اتمام الاوردر
                    </Button>
                    <Link className={style.returnToCart} href='/carts'>
                        العوده الي سلة التسوق
                        <ChevronLeftIcon fontSize="small" />
                    </Link>
                </Form.Group>
            </Form>
        </div >
    )
}
export default CheckOutForm
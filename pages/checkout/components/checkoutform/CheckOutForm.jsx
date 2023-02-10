import { useState } from 'react';
import Link from 'next/link';


import { Button, Form } from "react-bootstrap";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import governorateData from '../../data/governorate.json';

import { useGuest } from '@root/hooks';

import style from './checkoutform.module.scss';
import { useSendOrderData } from '../../hooks';

const CheckOutForm = () => {

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [governorate, setGovernorate] = useState('');
    const [street, setStreet] = useState('');
    const [email, setEmail] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    const [errMsg, setErrMsg] = useState({})

    const { guestId } = useGuest();

    const { mutate: sendOrder } = useSendOrderData()

    const handleSubmit = (event) => {

        event.preventDefault();
        let validationStatus = true;
        const errMsg = {};
        if (!username.trim() || username.length < 3) {
            validationStatus = false;
            errMsg.username = 'لا  يجب حقل الاسم فارغاً ويجب ان يكون اكثر من 3حروف';
        } else {
            errMsg.username = '';
        }

        if (! /^\d{11}$/.test(phone)) {
            validationStatus = false;
            errMsg.phone = 'يجب ان يحتوي الحقل علي رقم تلفون صالح ';
        } else {
            errMsg.phone = '';
        }

        if (!governorate.trim()) {
            validationStatus = false;
            errMsg.governorate = 'يجب اختيار محافظة';
        } else {
            errMsg.governorate = '';
        }

        if ((!street.trim()) || street.length < 5) {
            validationStatus = false;
            errMsg.street = 'يجب كتابة العنوان وان تكون عدد الحروف اكبر من 5حروف';
        } else {
            errMsg.street = '';
        }

        if (!validationStatus) {
            setErrMsg(errMsg);
        }
        else {
            setErrMsg({});

            const orderDetails = {
                guest_id: guestId,
                username,
                phone,
                governorate,
                street,
                email,
                order_notes: orderNotes
            }
            sendOrder(orderDetails);
        }
    }

    return (
        <div className={style.checkoutWrapper}>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{ position: 'relative' }} className="mb-3 mt-3" controlId="username">
                    <div className='d-flex align-items-center'>
                        <Form.Label>اسم المستخدم</Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                        <span className={style.errMsg}>{errMsg.username}</span>
                    </div>
                    <Form.Control
                        onChange={(event) => setUsername(event.target.value)}
                        className={`${style.formControl} ${errMsg.username ? style.errorField : ''}`}
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <div className='d-flex align-items-center'>
                        <Form.Label>رقم التلفون</Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                        <span className={style.errMsg}>{errMsg.phone}</span>
                    </div>
                    <Form.Control
                        type="number"
                        onChange={(event) => setPhone(event.target.value)}
                        className={`${style.formControl} ${errMsg.phone ? style.errorField : ''}`}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="governorate">
                    <div className='d-flex align-items-center'>
                        <Form.Label>المحافظة</Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                        <span className={style.errMsg}>{errMsg.governorate}</span>
                    </div>
                    <Form.Select className={`${style.formControl} ${errMsg.governorate ? style.errorField : ''}}`} onChange={(event) => setGovernorate(event.target.value)}>
                        <option value="">...</option>
                        {governorateData.governorates.map(governorate => (
                            <option
                                key={governorate.id}
                                className={style.option}
                                value={governorate.governorate_name_ar}
                            >
                                {governorate.governorate_name_ar}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" controlId="street">
                    <div className='d-flex align-items-center'>
                        <Form.Label>عنوان الشارع</Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                        <span className={style.errMsg}>{errMsg.street}</span>
                    </div>
                    <Form.Control type="text" className={`${style.formControl} ${errMsg.street ? style.errorField : ''}`} onChange={(event) => setStreet(event.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>البريد الالكتروني</Form.Label>
                    <Form.Control type="email" className={style.formControl} onChange={(event) => setEmail(event.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" onChange={(event) => setOrderNotes(event.target.value)} controlId="exampleForm.ControlTextarea1">
                    <Form.Label>ملاحظات بخصوص الاوردر</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
                <Form.Group className="mt-4 d-flex align-items-center justify-content-between">
                    <Button className={style.checkOutbtn} type="submit" onClick={handleSubmit}>
                        اتمام الاوردر
                    </Button>
                    <Link className={style.returnToCart} href='/carts'>
                        العوده الي سلة التسوق
                        <ChevronLeftIcon fontSize="small" />
                    </Link>
                </Form.Group>

            </Form>
        </div>
    )
}
export default CheckOutForm
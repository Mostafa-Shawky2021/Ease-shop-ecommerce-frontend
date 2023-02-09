import { useState } from 'react';
import Link from 'next/link';


import { Button, Form } from "react-bootstrap";

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import governorateData from '../../data/governorate.json';

import style from './checkoutform.module.scss';

const CheckOutForm = () => {

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [governorate, setGovernorate] = useState('');
    const [street, setStreet] = useState('');
    const [email, setEmail] = useState('');
    const [orderNotes, setOrderNotes] = useState('');

    const [errMsg, setErrMsg] = useState({
        username: '',
        phone: '',
        governorate: '',
        street: '',

    });

    const handleSubmit = (event) => {
        let validationStatus = true;

        if (!username.trim()) {
            validationStatus = false;
            setErrMsg({ ...errMsg, username: 'لا  يجب حقل الاسم فارغاً ويجب ان يكون اكثر من 3حروف' })
        }

    }

    return (
        <div className={style.checkoutWrapper}>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{ position: 'relative' }} className="mb-3 mt-3" controlId="username">
                    <div className='d-flex align-items-center'>
                        <Form.Label>اسم المستخدم</Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                    </div>
                    <Form.Control
                        onChange={(event) => setUsername(event.target.value)}
                        className={style.formControl}
                        autoComplete="off"
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phone">
                    <div className='d-flex align-items-center'>
                        <Form.Label>رقم التلفون</Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                    </div>
                    <Form.Control
                        type="number"
                        onChange={(event) => setPhone(event.target.value)}
                        className={style.formControl}
                        required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="governorate">
                    <div className='d-flex align-items-center'>
                        <Form.Label>المحافظة</Form.Label>
                        <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                    </div>
                    <Form.Select className={style.formControl} onChange={(event) => setGovernorate(event.target.value)}>
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
                    </div>
                    <Form.Control type="text" className={style.formControl} onChange={(event) => setStreet(event.target.value)} required />
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
import { useEffect, useState } from 'react';

import { useFormOrderValidation, useGuest } from '@root/hooks';
import { useFastOrderData } from '../../../hooks';

import { Form, Button } from 'react-bootstrap';
import { Loading } from '@root/components/loading';

import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';

import governorateData from 'data/governorate.json';

import style from './modalformorder.module.scss';


const ModalformOrder = ({ setShowModalOrder, quantity, product }) => {

    const [isLoading, setIsLoading] = useState(false);

    const { validateForm, formErrorMsg } = useFormOrderValidation();
    const { guestId } = useGuest();

    const { mutate: sendFastOrder } = useFastOrderData(setIsLoading, setShowModalOrder)


    useEffect(() => {

        const closeModalOrderForm = (event) => {
            if (event.key === "Escape") setShowModalOrder(false);
        }
        document.body.addEventListener('keydown', closeModalOrderForm);
        return () => document.body.removeEventListener('keydown', closeModalOrderForm);
    }, []);


    const handleSubmit = (event) => {

        event.preventDefault();
        const price = product.price_discount || product.price;
        const total_price = price * quantity;
        const formData = new FormData(event.currentTarget);

        const orderDetails = {
            guest_id: guestId,
            quantity,
            total_price,
            product_id: product.id,
            username: formData.get('username'),
            phone: formData.get('phone'),
            governorate: formData.get('governorate'),
            street: formData.get('street'),
        };

        if (validateForm(orderDetails)) {
            sendFastOrder(orderDetails)
        }

    }
    return (
        <div className={style.formModel}>
            <div className={style.formModalContent}>
                <header className={style.formModelHeader}>
                    <h3 className={style.title}>
                        طلب اوردر
                    </h3>
                    <div className={style.closeIcon} onClick={() => setShowModalOrder(false)}>
                        <CloseIcon fontSize="small" />
                    </div>
                </header>
                <div className={style.formModelBody}>

                    {isLoading && (
                        <Loading >
                            <CircularProgress size={33} className={style.loadingIcon} />
                        </Loading>

                    )}
                    <div className={style.formOrderWrapper}>
                        <Form onSubmit={handleSubmit} >
                            <Form.Group style={{ position: 'relative' }} className="mb-3 mt-3" controlId="username">
                                <div className='d-flex align-items-center'>
                                    <Form.Label>اسم المستخدم</Form.Label>
                                    <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                                    <span className={style.errMsg}>{formErrorMsg.username}</span>
                                </div>
                                <Form.Control
                                    name="username"
                                    className={`${style.formControl} ${formErrorMsg.username ? style.errorField : ''}`}
                                    autoComplete="off"
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="phone">
                                <div className='d-flex align-items-center'>
                                    <Form.Label>رقم التلفون</Form.Label>
                                    <span className={style.required} style={{ marginRight: '5px' }}>*</span>
                                    <span className={style.errMsg}>{formErrorMsg.phone}</span>
                                </div>
                                <Form.Control
                                    name="phone"
                                    type="number"
                                    className={`${style.formControl} ${formErrorMsg.phone ? style.errorField : ''}`}
                                />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="governorate">
                                <div className='d-flex align-items-center'>
                                    <Form.Label>المحافظة</Form.Label>
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
                                    <span className={style.errMsg}>{formErrorMsg.street}</span>
                                </div>
                                <Form.Control
                                    name="street"
                                    type="text"
                                    className={`${style.formControl} ${formErrorMsg.street ? style.errorField : ''}`}
                                />
                            </Form.Group>
                            <Form.Group className="mt-4 d-flex align-items-center justify-content-between">
                                <Button className={style.checkOutbtn} type='submit'>
                                    اتمام الاوردر
                                </Button>
                            </Form.Group>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalformOrder;

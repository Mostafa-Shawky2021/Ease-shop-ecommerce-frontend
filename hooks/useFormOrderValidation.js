import { useState } from 'react';
const useFormOrderValidation = () => {

    const [formErrorMsg, setFormErrorMsg] = useState({});

    const validateForm = (orderData) => {

        let isValid = true;
        const errMsg = {};

        if (!orderData.username.trim() || orderData.username.length < 3) {
            isValid = false;
            errMsg.username = 'لا  يجب حقل الاسم فارغاً ويجب ان يكون اكثر من 3حروف';
        } else {
            errMsg.username = '';
        }

        if (! /^\d{11}$/.test(orderData.phone)) {
            isValid = false;
            errMsg.phone = 'يجب ان يحتوي الحقل علي رقم تلفون صالح ';
        } else {
            errMsg.phone = '';
        }

        if (!orderData.governorate.trim()) {
            isValid = false;
            errMsg.governorate = 'يجب اختيار محافظة';
        } else {
            errMsg.governorate = '';
        }

        if ((!orderData.street.trim()) || orderData.street.length < 5) {
            isValid = false;
            errMsg.street = 'يجب كتابة العنوان وان تكون عدد الحروف اكبر من 5حروف';
        } else {
            errMsg.street = '';
        }

        if (isValid) {
            setFormErrorMsg({});
            return true;

        }
        setFormErrorMsg(errMsg)
        return false;

    }

    return {
        validateForm,
        formErrorMsg,
    }

}
export default useFormOrderValidation;
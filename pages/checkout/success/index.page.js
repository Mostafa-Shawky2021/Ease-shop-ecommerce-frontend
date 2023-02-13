import Link from 'next/link';

import { Container } from "react-bootstrap";

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const CheckoutSuccess = () => {

    return (
        <Container style={{ marginTop: '2rem' }}>
            <Link as='/dashboard' href="/homepage">teest</Link>
            <p style={{ fontSize: '1.5rem' }}>!!تم ارسال طلبك بنجاح  </p>
            <p>سوف يقوم احد موظفينا بالتواصل معكم في اقرب وقت</p>
            <p>في حالة وجود استفسار يمكنك ارسال رسالة <Link href="#" style={{ color: 'var(--bs-primary)' }}>الي فريق عمل الموقع</Link></p>
            <Link href="/homepage" style={{ color: 'var(--bs-primary)' }}>العودة الي الصفحة الرئيسية <KeyboardArrowLeftIcon size="small" /></Link>
        </Container>
    )
}
export default CheckoutSuccess;
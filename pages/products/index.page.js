import { useRouter } from "next/router";

import { BreadCrumbLayout } from "@root/components/layout";

import { Breadcrumb, Container } from "react-bootstrap";

const ProductsPageSearch = ({ query }) => {
    console.log(query);
    const router = useRouter();
    console.log(router.query);
    return (

        <BreadCrumbLayout>
            <Container fluid="xl">
                <Breadcrumb.Item href="/homepage">الصفحة الرئيسية</Breadcrumb.Item>
                <Breadcrumb.Item active style={{ color: 'var(--bs-primary)', fontWeight: 'bold' }}>

                </Breadcrumb.Item>
            </Container>
        </BreadCrumbLayout>
    )
}


export default ProductsPageSearch;
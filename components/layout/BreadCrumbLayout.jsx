import { Breadcrumb, Container } from "react-bootstrap";

const BreadCrumbLayout = ({ children }) => {
    return (
        <Breadcrumb
            listProps={{ style: { marginBottom: '0px' } }}
            style={{ marginBottom: '0px', background: '#fff', padding: '2rem 0px' }}>
            <Container fluid="xl" className="d-flex">
                {children}
            </Container>
        </Breadcrumb>
    )
}
export default BreadCrumbLayout;
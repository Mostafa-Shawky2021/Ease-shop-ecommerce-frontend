import { useProductsData } from "../../hooks"
import { Col, Container } from "react-bootstrap";
import { GridList } from "@root/components/gridlist";
import { ProductCard } from "@root/components/cards";

const Products = () => {
    const { data: products } = useProductsData();
    return (

        <GridList
            data={products}
            renderItem={(product) => (
                <Col xs={12} sm={6} md={3} key={product.id}>
                    <ProductCard
                        product={product}
                        style={{ marginTop: '1rem' }} />
                </Col>
            )}
        />



    )
}
export default Products
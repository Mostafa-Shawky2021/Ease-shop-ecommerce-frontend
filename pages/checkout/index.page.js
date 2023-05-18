import { useGuest, useCartsData } from "@root/hooks";

import { Container, Row, Col } from "react-bootstrap";
import { Seek } from "react-loading-indicators";
import { Loading } from "@root/components/loading";
import { CheckOutForm } from "./components/checkoutform";
import { ProductsOrder } from "./components/productsorder";
import { BreadCrumbLayout } from "@root/components/layout";

const CheckOutPage = () => {
	const { guestId } = useGuest();
	const { data: carts, isLoading } = useCartsData(guestId);

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/" },
		{ label: "طلب اوردر", active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="lg" style={{ marginTop: "2rem", position: "relative", background: "#fff" }}>
				{isLoading ? (
					<div style={{ height: "700px", position: "relative" }}>
						<Loading isOpacity={false}>
							<Seek color="#0d6efd" size="small" style={{ marginTop: "3rem" }} />
						</Loading>
					</div>
				) : !!carts.length ? (
					<Row>
						<Col xs={12} md={6}>
							<CheckOutForm />
						</Col>
						<Col xs={12} md={6}>
							<ProductsOrder />
						</Col>
					</Row>
				) : (
					<p> لا يوجد طلبات لعرضها</p>
				)}
			</Container>
		</>
	);
};

export default CheckOutPage;

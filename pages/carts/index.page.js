import { useCartsData, useGuest } from "@root/hooks";

import { Row, Col, Container, Breadcrumb } from "react-bootstrap";
import { CartListTable } from "./components/cartlisttable";
import { CartTotal } from "./components/carttotal";
import { BreadCrumbLayout } from "@root/components/layout";

const CartsPage = () => {
	const { guestId } = useGuest();

	const { data: carts, isLoading: isCartsLoading } = useCartsData(guestId);

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/homepage" },
		{ label: "سلة المشتريات", active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="xl" style={{ marginTop: "2.5rem" }}>
				<Row>
					<Col xs={12}>
						<CartListTable cartsData={carts} isCartsLoading={isCartsLoading} />
					</Col>
					<Col xs={12} sm={4}>
						{!!carts?.length && <CartTotal cartsData={carts} />}
					</Col>
				</Row>
			</Container>
		</>
	);
};
export default CartsPage;

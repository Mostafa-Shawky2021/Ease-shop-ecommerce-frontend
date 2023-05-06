import { Container, Row, Col } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";
import { MapAddress } from "./components/mapaddress";
import { ContactForm } from "./components/contactform";

const ContactPage = () => {
	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/homepage" },
		{ label: "التواصل معنا", active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container fluid="xl" style={{ marginTop: "2rem" }}>
				<Row>
					<Col xs={12} md={6}>
						<ContactForm />
					</Col>
					<Col xs={12} md={6}>
						<MapAddress />
					</Col>{" "}
				</Row>
			</Container>
		</>
	);
};

export default ContactPage;

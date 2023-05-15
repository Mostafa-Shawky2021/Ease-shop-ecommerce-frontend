import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { Container } from "react-bootstrap";
import { BreadCrumbLayout } from "@root/components/layout";

import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

const CheckoutSuccessPage = () => {
	const {
		query: { order_id },
		push,
	} = useRouter();

	useEffect(() => {
		if (!order_id) push("/store");
	}, [order_id, push]);

	const breadCrumbData = [
		{ label: "الصفحة الرئيسية", link: "/" },
		{ label: "نجاح الطلب", active: true },
	];

	return (
		<>
			<BreadCrumbLayout data={breadCrumbData} />
			<Container style={{ marginTop: "2rem", minHeight: "200px" }}>
				<p style={{ fontSize: "1.2rem", color: "#222" }}>تم ارسال طلبك بنجاح رقم الاوردر: {order_id}</p>
				<p style={{ fontSize: "0.85rem" }}>سوف يقوم احد موظفينا بالتواصل معكم في اقرب وقت</p>
				<p>
					في حالة وجود استفسار يمكنك ارسال رسالة
					<Link href="/" style={{ color: "var(--bs-primary)" }}>
						الي فريق عمل الموقع
					</Link>
				</p>
				<Link href="/" style={{ color: "var(--bs-primary)" }}>
					العودة الي الصفحة الرئيسية <KeyboardArrowLeftIcon size="small" />
				</Link>
			</Container>
		</>
	);
};
export default CheckoutSuccessPage;

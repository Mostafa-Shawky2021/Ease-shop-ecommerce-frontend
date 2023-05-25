import { Container, Row, Col } from "react-bootstrap";

import DeliveryDiningOutlinedIcon from "@mui/icons-material/DeliveryDiningOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";

import style from "./services.module.scss";

function Services() {
	return (
		<div className={style.services}>
			<Container className={style.container} fluid="xxl">
				<Row>
					<Col xs={12} sm={4} className={`${style.serviceBox} my-3 my-lg-0`}>
						<div>
							<DeliveryDiningOutlinedIcon className={style.serviceIcon} />
							<div className={style.serviceWrapper}>
								<p className={style.title}>اسرع خدمة توصيل</p>
								<p className={`${style.description} `}>احصل علي شحن سريع وأمن من خلال افضل شركات الشحن</p>
							</div>
						</div>
					</Col>
					<Col xs={12} sm={4} className={`${style.serviceBox} my-3 my-lg-0`}>
						<div>
							<SupportAgentOutlinedIcon className={style.serviceIcon} />
							<div className={style.serviceWrapper}>
								<p className={style.title}>خدمة عملاء مميزة</p>
								<p className={`${style.description}`}>نوفر خدمة عملاء علي أعلي مستوي وهدفنا الأول رضاء العملاء</p>
							</div>
						</div>
					</Col>
					<Col xs={12} sm={4} className={`${style.serviceBox} my-3 my-lg-0`}>
						<div>
							<PublishedWithChangesOutlinedIcon className={style.serviceIcon} />
							<div className={style.serviceWrapper}>
								<p className={style.title}>استبدال واسترجاع المنتج</p>
								<p className={style.description}>نوفر لك استبدال واسترجاع مجاني لعيوب الصناعة والغير مطابق للعروض</p>
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
}

export default Services;

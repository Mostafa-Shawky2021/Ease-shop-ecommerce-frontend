import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

import style from "./footer.module.scss";

const Footer = () => {
	return (
		<div className={style.footerWrapper}>
			<Container fluid="md">
				<Row>
					<Col xs={12} sm={6} md={6} lg={4} className={style.colWrapper}>
						<div className={style.intro}>
							<h3 className={style.logo}>
								Shop<span className={style.special}>Notify</span>
							</h3>
							<p className={style.description}>نحن مجموعة من الشباب الذي نهدف الي انشاء منصات الكترونيه</p>
							<div className={style.social}>
								<Link href="#" className={style.link}>
									<FacebookIcon fontSize="xs" />
								</Link>
								<Link href="#" className={style.link}>
									<WhatsAppIcon fontSize="xs" />
								</Link>
								<Link href="#" className={style.link}>
									<GoogleIcon fontSize="xs" />
								</Link>
							</div>
						</div>
					</Col>
					<Col xs={12} sm={6} md={3} lg={2} className={style.colWrapper}>
						<div className={style.usefullink}>
							<h4 className={style.subtitle}>روابط مفيدة</h4>
							<ul className={`${style.linkslist} list-unstyled px-0`}>
								<li className={style.item}>
									<Link href="#">خريطة الموقع</Link>
								</li>
								<li className={style.item}>
									<Link href="#">من نحن</Link>
								</li>
								<li className={style.item}>
									<Link href="#">التواصل معنا</Link>
								</li>
							</ul>
						</div>
					</Col>
					<Col xs={12} sm={6} md={3} lg={2} className={style.colWrapper}>
						<div className={style.usefullink}>
							<h4 className={style.subtitle}>منتجات متنوعة</h4>
							<ul className={`${style.linkslist} list-unstyled px-0`}>
								<li className={style.item}>
									<Link href="">الاكثر مبيعاً</Link>
								</li>
								<li className={style.item}>
									<Link href="/latestproducts">احدث المنتجات</Link>
								</li>
								<li className={style.item}>
									<Link href="/store">المنتجات المميزة</Link>
								</li>
								<li className={style.item}>
									<Link href="/productsoffers">عروض المنتجات</Link>
								</li>
							</ul>
						</div>
					</Col>
					<Col xs={12} sm={6} md={12} lg={4} className={style.colWrapper}>
						<div className={style.usefullink}>
							<h4 className={style.subtitle}>معلومات المتجر</h4>
							<ul className={`${style.linkslist} ${style.contactList} list-unstyled px-0`}>
								<li className={style.item}>
									<LocationOnIcon fontSize="small" />
									<Link href="" className={style.link}>
										القاهرة القديدة
									</Link>
								</li>
								<li className={style.item}>
									<WhatsAppIcon fontSize="small" />
									<Link href="" className={style.link}>
										+201552508982
									</Link>
								</li>
								<li className={style.item}>
									<EmailIcon fontSize="small" />
									<Link href="" className={style.link}>
										mostafashawky20177@gmail.com
									</Link>
								</li>
							</ul>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Footer;

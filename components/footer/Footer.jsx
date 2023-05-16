import Link from "next/link";
import { Container, Row, Col } from "react-bootstrap";
import { useLayoutData } from "@root/hooks";

import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import CircularProgress from "@mui/material/CircularProgress";

import style from "./footer.module.scss";

const Footer = () => {
	const { data: footer, isLoading } = useLayoutData();
	const footerData = footer?.data?.footer_data;

	const renderAboutus = () => {
		const renderTextApi = footerData?.aboutus || "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi ex culpa deleniti sapiente nisi voluptatem nemo reiciendis quibusdam sequi eveniet. Labore soluta dolore quae quidem, beatae nostrum autem esse veritatis.";
		if (isLoading) return <CircularProgress size={18} style={{ color: "#fff", marginTop: "5px" }} />;
		return renderTextApi;
	};
	const renderFacebookLink = () => footerData?.facebook_link || "#";
	const renderWhatsappLink = () => {
		const link = footerData?.whatsapp_number ? `https://wa.me/${footerData?.whatsapp_number}` : "#";
		return link;
	};
	const renderTwitterLink = () => footerData?.twitter_link || "#";

	const renderAddress = () => {
		if (isLoading) return <CircularProgress size={11} style={{ color: "#fff", marginTop: "5px" }} />;

		return footerData?.address || "القاهرة الجديدة";
	};

	const renderPhone = () => {
		if (isLoading) return <CircularProgress size={11} style={{ color: "#fff", marginTop: "5px" }} />;

		return footerData?.phone || "+20101511235";
	};

	const renderEmail = () => {
		if (isLoading) return <CircularProgress size={11} style={{ color: "#fff", marginTop: "5px" }} />;

		return footerData?.gmail_link || "example@gmail.com";
	};

	return (
		<div className={style.footerWrapper}>
			<Container fluid="md">
				<Row>
					<Col xs={12} sm={6} md={6} lg={4} className={style.colWrapper}>
						<div className={style.intro}>
							<h3 className={style.logo}>
								<Link href="/">
									Shop
									<span className={style.special}>Ease</span>
								</Link>
							</h3>
							<p className={style.description}>{renderAboutus()}</p>
							<div className={style.social}>
								<Link target="_blank" href={renderFacebookLink()} className={style.link}>
									<FacebookIcon fontSize="xs" />
								</Link>
								<Link target="_blank" href={renderWhatsappLink()} className={style.link}>
									<WhatsAppIcon fontSize="xs" />
								</Link>
								<Link href={renderTwitterLink()} target="_blank" className={style.link}>
									<TwitterIcon fontSize="xs" />
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
									<Link href="/contact">التواصل معنا</Link>
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
									<Link href="#" className={style.link}>
										{renderAddress()}
									</Link>
								</li>
								<li className={style.item}>
									<WhatsAppIcon fontSize="small" />
									<Link href="" className={style.link}>
										{renderPhone()}
									</Link>
								</li>
								<li className={style.item}>
									<EmailIcon fontSize="small" />
									<Link href={`mailto:${renderEmail}`} className={style.link}>
										{renderEmail()}
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

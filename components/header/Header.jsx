import { useState } from "react";
import Link from "next/link";

import { useRouter } from "next/router";
import { useCartsData, useGuest, useSearch } from "@root/hooks";

import { calcCartsCount } from "@root/utils";

import { Row, Col, Container, Button } from "react-bootstrap";
import { InputWithIcon } from "@root/components/inputs";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";

import style from "./header.module.scss";

const Header = ({ setIsOpenCartList }) => {
	const { guestId } = useGuest();

	const { data: carts } = useCartsData(guestId);

	const { handleOnInputChange, handleOnSubmitSearch } = useSearch();

	const handleOpenCartList = (event) => {
		event.stopPropagation();
		setIsOpenCartList((prevIsOpenCartList) => !prevIsOpenCartList);
	};

	return (
		<div className={`${style.header} align-items-center`}>
			<Container fluid="xl" className={style.container}>
				<Row className="align-items-center">
					<Col xs={12} md={3} lg={2}>
						<div className={`${style.logo} text-center text-md-start`}>
							<Link href="/">
								Shop
								<span className={style.special}>Ease</span>
							</Link>
						</div>
					</Col>
					<Col xs={12} md={5} lg={6}>
						<div>
							<InputWithIcon onChange={handleOnInputChange} placeholder="عن ماذا تبحث؟" className={style.searchInput} onKeyPress={handleOnSubmitSearch}>
								<button className={style.btnSearch} onClick={handleOnSubmitSearch}>
									<SearchOutlinedIcon fontSize="small" />
								</button>
							</InputWithIcon>
						</div>
					</Col>
					<Col xs={12} md={4} lg={4}>
						<div className="d-flex flex-wrap align-items-center my-3 my-lg-0">
							<Link href="/store" className={`${style.actionWrapper} d-flex align-items-center `}>
								<FavoriteBorderIcon fontSize="large" />
								<div className={style.actionName}>
									<span className={style.title}>القائمة البيضاء</span>
									<span className={style.subTitle}>منتجاتي المفضلة</span>
								</div>
								{/* <span className={style.count}>5</span> */}
							</Link>
							<Button className={style.actionWrapper} onClick={handleOpenCartList}>
								<LocalMallOutlinedIcon fontSize="large" />
								<div className={style.actionName}>
									<span className={style.title}>عربة التسوق</span>
									<span className={style.subTitle}>مشترياتي</span>
								</div>
								{!!carts?.length && <span className={style.count}>{calcCartsCount(carts)}</span>}
							</Button>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	);
};

export default Header;

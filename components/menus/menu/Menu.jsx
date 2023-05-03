import { useState, useEffect } from "react";
import Link from "next/link";

import { useCartsData, useGuest } from "@root/hooks";

import { calcCartsCount } from "@root/utils";

import { Container } from "react-bootstrap";
import { CategoriesMenu } from "./categoriesmenu";
import { SideBarMenuMobile } from "@root/components/sidebars/sidebarmenus/sidebarmenumobile";
import { SearchModal } from "@root/components/modals";

import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import style from "./menu.module.scss";

const Menu = ({ setIsOpenCartList }) => {
	const [fixedMenu, setFixedMenu] = useState(false);

	const { guestId } = useGuest();
	const { data: carts } = useCartsData(guestId);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			let scrollValue = document.documentElement.scrollTop;
			scrollValue > 500 ? setFixedMenu(true) : setFixedMenu(false);
		});
	}, [setFixedMenu]);

	const handleOpenCartList = () => setIsOpenCartList((prevIsOpenCartList) => !prevIsOpenCartList);

	return (
		<div className={`${style.menuWrapper} ${fixedMenu ? style.fixed : ""}`}>
			<Container fluid="xl" className="d-flex align-items-center px-1">
				<div className={style.categoryWrapper}>
					<CategoriesMenu />
				</div>
				<ul className={`${style.listMenu} list-unstyled`}>
					<li className={style.item}>
						<Link href="/homepage">الصفحة الرئيسية</Link>
					</li>
					<li className={style.item}>
						<Link href="/productsoffers">العروض المميزة</Link>
					</li>
					<li className={style.item}>
						<Link href="/categories">الاقسام</Link>
					</li>
					<li className={style.item}>
						<Link href="#">الطلبات</Link>
					</li>
					<li className={style.item}>
						<Link href="/store">المتجر</Link>
					</li>
					<li className={style.item}>
						<Link href="#">التواصل معنا</Link>
					</li>
				</ul>
				<div className={style.leftContent} style={{ display: fixedMenu ? "flex" : "none" }}>
					<button className={style.cartListBtn} onClick={handleOpenCartList}>
						<LocalMallOutlinedIcon fontSize="medium" />
						{!!carts?.length && <span className={style.count}>{calcCartsCount(carts)}</span>}
					</button>
					<SearchModal
						renderBtn={(handleOpenModalSearch) => (
							<button onClick={handleOpenModalSearch} className={style.searchBtn}>
								<SearchOutlinedIcon fontSize="medium" />
							</button>
						)}
					/>
				</div>
				{/* display in mobile screen  */}
				<div className={style.mobileWrapper}>
					<div className={`${style.logoMobileScreen}`}>
						<Link href="/homepage" className={style.logo}>
							Notify
							<span className={style.special}>Shop</span>
						</Link>
					</div>
					<div className={style.barWrapper}>
						<SideBarMenuMobile />
					</div>
				</div>
			</Container>
		</div>
	);
};
export default Menu;

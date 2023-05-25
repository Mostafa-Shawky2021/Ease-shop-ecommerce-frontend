import { useState, useRef, useEffect } from "react";
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

	const menuRef = useRef(null);

	useEffect(() => {
		window.addEventListener("scroll", () => {
			const elementOffsetTop = menuRef?.current?.offsetTop;
			const bodyScrollTop = document.documentElement.scrollTop;
			bodyScrollTop >= elementOffsetTop ? setFixedMenu(true) : setFixedMenu(false);
		});
	}, [setFixedMenu]);

	const handleOpenCartList = (event) => {
		event.stopPropagation();
		setIsOpenCartList((prevIsOpenCartList) => !prevIsOpenCartList);
	};

	return (
		<div className={`${style.menuWrapper} ${fixedMenu ? style.fixed : ""}`} ref={menuRef}>
			<Container fluid="xl" className="d-flex align-items-center ">
				<div className={style.categoryWrapper}>
					<CategoriesMenu />
				</div>
				<ul className={`${style.listMenu} list-unstyled`}>
					<li className={style.item}>
						<Link href="/">الصفحة الرئيسية</Link>
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
						<Link href="/contact">التواصل معنا</Link>
					</li>
				</ul>
				<div className={`${style.leftContent} ${fixedMenu ? style.show : ""}`}>
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
						<Link href="/" className={style.logo}>
							Shop<span className={style.special}>Ease</span>
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

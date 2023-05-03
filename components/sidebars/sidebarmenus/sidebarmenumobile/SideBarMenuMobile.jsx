import { useState, useEffect } from "react";
import Link from "next/link";

import { CategoriesMenuMobile } from "./categoriesmenumobile";
import { BarIcon } from "@root/components/baricon";

import CloseIcon from "@mui/icons-material/Close";

import style from "./sidebarmenumobile.module.scss";

const SideBarMenuMobile = () => {
	const [sidebarMenuMobileIsOpen, setSidebarMenuMobileIsOpen] = useState(false);
	const sideBarMenuMobileIsOpenClass = sidebarMenuMobileIsOpen ? style.openSidebarMenuMobile : "";

	useEffect(() => {
		const closeSideBarMobileMenuMobileonKeyDown = (event) => {
			if (event.key === "Escape") setSidebarMenuMobileIsOpen(false);
		};

		document.body.addEventListener("keydown", closeSideBarMobileMenuMobileonKeyDown);

		return () => document.removeEventListener("keydown", closeSideBarMobileMenuMobileonKeyDown);
	}, []);
	return (
		<div className={style.sidebarMenuMobileWrapper}>
			<BarIcon
				activeIcons={sidebarMenuMobileIsOpen ? true : false}
				style={{ width: "20px", color: "#000" }}
				onClick={() => setSidebarMenuMobileIsOpen(!sidebarMenuMobileIsOpen)}
				barIconStyle={style.barIcon}
			/>
			<div className={`${style.sidebarListMenu} ${sideBarMenuMobileIsOpenClass}`}>
				<div
					className={style.iconMenuMobileCloseWrapper}
					onClick={() => setSidebarMenuMobileIsOpen(false)}
				>
					<CloseIcon fontSize="small" className={style.icon} />
				</div>
				<div className={`${style.categoriesWrapper} ${style.item}`}>
					<CategoriesMenuMobile />
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
			</div>
		</div>
	);
};

export default SideBarMenuMobile;

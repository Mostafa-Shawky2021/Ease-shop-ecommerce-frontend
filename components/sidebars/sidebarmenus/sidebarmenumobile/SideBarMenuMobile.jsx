import { useState, useRef } from "react";
import Link from "next/link";

import { CategoriesMenuMobile } from "./categoriesmenumobile";
import { BarIcon } from "@root/components/baricon";

import CloseIcon from "@mui/icons-material/Close";

import style from "./sidebarmenumobile.module.scss";
import { useCloseMenuAction } from "@root/hooks";

const SideBarMenuMobile = () => {
	const [sidebarMenuMobileIsOpen, setSidebarMenuMobileIsOpen] = useState(false);

	const sidebarMenuMobileRef = useRef(null);

	useCloseMenuAction(setSidebarMenuMobileIsOpen, sidebarMenuMobileRef);

	const sideBarMenuMobileIsOpenClass = sidebarMenuMobileIsOpen ? style.openSidebarMenuMobile : "";

	return (
		<div className={style.sidebarMenuMobileWrapper} ref={sidebarMenuMobileRef}>
			<BarIcon
				activeIcons={sidebarMenuMobileIsOpen ? true : false}
				style={{ width: "20px", color: "#000" }}
				onClick={() => setSidebarMenuMobileIsOpen(!sidebarMenuMobileIsOpen)}
				barIconStyle={style.barIcon}
			/>
			<div className={`${style.sidebarListMenu} ${sideBarMenuMobileIsOpenClass}`}>
				<div className={style.iconMenuMobileCloseWrapper} onClick={() => setSidebarMenuMobileIsOpen(false)}>
					<CloseIcon fontSize="small" className={style.icon} />
				</div>
				<div className={`${style.categoriesWrapper} ${style.item}`} onClick={() => setSidebarMenuMobileIsOpen(false)}>
					<CategoriesMenuMobile />
				</div>

				<ul className={`${style.listMenu} list-unstyled`} onClick={() => setSidebarMenuMobileIsOpen(false)}>
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
						<Link href="#">التواصل معنا</Link>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default SideBarMenuMobile;

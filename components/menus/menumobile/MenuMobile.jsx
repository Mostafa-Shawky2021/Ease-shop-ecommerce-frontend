import Link from "next/link";

import { useGuest, useCartsData } from "@root/hooks";

import { calcCartsCount } from "@root/utils";

import { Container } from "react-bootstrap";
import { SearchModal } from "@root/components/modals";

import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import StoreIcon from "@mui/icons-material/Store";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import style from "./menumobile.module.scss";

const MenuMobile = () => {
	const { guestId } = useGuest();
	const { data: carts } = useCartsData(guestId);

	return (
		<div className={style.menuMobileWrapper}>
			<Container fluid>
				<ul className={`${style.menuList} list-unstyled`}>
					<li className={style.menuItem}>
						<Link href="/homepage">
							<span className={style.icon}>
								<HomeIcon fontSize="small" />
							</span>
							<span className={style.text}>الصفحة الرئيسية</span>
						</Link>
					</li>
					<li className={style.menuItem}>
						<Link href="/productsoffers">
							<span className={style.icon}>
								<LocalOfferIcon fontSize="small" />
							</span>
							<span className={style.text}>العروض المميزة</span>
						</Link>
					</li>
					<li className={style.menuItem}>
						<Link href="/store">
							<span className={style.icon}>
								<StoreIcon fontSize="small" />
							</span>
							<span className={style.text}>المتجر</span>
						</Link>
					</li>

					<li className={style.menuItem}>
						<Link href="/carts" style={{ position: "relative" }}>
							<span className={style.icon}>
								<ShoppingCartIcon fontSize="small" />
							</span>
							<span className={style.text}>
								المشتريات
								{!!carts?.length && <span className={style.count}>{calcCartsCount(carts)}</span>}
							</span>
						</Link>
					</li>
					<li className={style.menuItem}>
						<SearchModal
							renderBtn={(handleOpenModalSearch) => (
								<button onClick={handleOpenModalSearch} className={style.searchBtn}>
									<SearchOutlinedIcon fontSize="medium" />
								</button>
							)}
						/>
						<span className={style.text}>المتجر</span>
					</li>
				</ul>
			</Container>
		</div>
	);
};

export default MenuMobile;

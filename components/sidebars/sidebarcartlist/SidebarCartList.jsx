import { useState, useRef } from "react";

import Link from "next/link";

import { useCarts, useGuest, useCartsData, useCloseMenuAction } from "hooks";

import { calcTotalPrice } from "@root/utils";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

import { Button } from "react-bootstrap";
import { ProductQuantity } from "@root/components/productquantity";
import { SidebarCartItem } from "./sidebarcartitem";
import { Loading } from "@root/components/loading";

import style from "./sidebarcartlist.module.scss";

const SidebarCartList = ({ isOpenCartList, setIsOpenCartList }) => {
	const [currentCart, setCurrentCart] = useState(0);

	const { guestId } = useGuest();
	const { incrementCartData, decrementCartData, deleteCartData, isLoading } = useCarts();

	const { data: carts } = useCartsData(guestId);

	const sidebarCartListRef = useRef(null);

	// close mobile fitler menu on mouse click, and on esacpe key down
	useCloseMenuAction(setIsOpenCartList, sidebarCartListRef);

	const handleProductIncrement = (event) => {
		const cartId = Number(event.currentTarget.getAttribute("data-cart-id"));
		setCurrentCart(cartId);
		incrementCartData({ cartId });
	};

	const handleProductDecrement = (event) => {
		const cartId = Number(event.currentTarget.getAttribute("data-cart-id"));
		setCurrentCart(cartId);
		decrementCartData({ cartId });
	};

	const handleProductDelete = (event) => {
		const deleteStatus = confirm("هل انت متاكد من انك تريد حذف المنتج ؟");
		if (deleteStatus) {
			const cartId = Number(event.currentTarget.getAttribute("data-cart-id"));
			deleteCartData(cartId);
		}
	};

	const isOpenCartListClass = isOpenCartList ? style.openCartList : "";

	return (
		<div className={`${style.listWrapper} ${isOpenCartListClass} `} ref={sidebarCartListRef}>
			{isLoading && (
				<Loading scrollBar={false} isFixed={false}>
					<CircularProgress size={33} className={style.loadingIcon} />
				</Loading>
			)}
			<header className={style.header}>
				<h4 className={style.title}>سلة التسوق</h4>
				<CloseIcon onClick={() => setIsOpenCartList(false)} fontSize="small" className={style.closeIcon} />
			</header>

			<div className={`${style.cartList}`}>
				{carts?.map((cart) => (
					<SidebarCartItem key={cart.id} cart={cart} productQuantity={<ProductQuantity handleProductIncrement={handleProductIncrement} handleProductDecrement={handleProductDecrement} quantity={cart?.quantity} cartId={cart?.id} currentCart={currentCart} />}>
						<Button className={style.btnDelete} onClick={handleProductDelete} data-cart-id={cart.id}>
							<DeleteOutlineIcon fontSize="small" className={style.icon} />
						</Button>
					</SidebarCartItem>
				))}
			</div>
			<div className={style.footer}>
				<div className={`${style.cost} d-flex align-items-center justify-content-between`}>
					<span className={style.titleCost}>الاجمالي</span>
					<span className={style.totalPrice}>
						{calcTotalPrice(carts)}
						<span className={style.currency}>جنية</span>
					</span>
				</div>
				<div className={style.checkoutWrapper}>
					<Link href="/carts" className={style.btn} onClick={() => setIsOpenCartList(false)}>
						سلة التسوق
					</Link>
					{!!carts?.length ? (
						<Link href="/checkout" className={style.btn} onClick={() => setIsOpenCartList(false)}>
							اطلب الأن
						</Link>
					) : (
						<button className={style.btn} disabled>
							اطلب الأن
						</button>
					)}
				</div>
			</div>
		</div>
	);
};
export default SidebarCartList;

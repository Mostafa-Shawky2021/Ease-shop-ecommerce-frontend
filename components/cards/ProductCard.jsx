import Image from "next/image";
import Link from "next/link";

import { useCarts } from "@root/hooks";

import { calcPriceDiscount, truncateCharacter } from "@root/utils";

import { Button } from "react-bootstrap";
import { ColorsVariant } from "../productvariants/colorsvariant";
import { SizesVariant } from "../productvariants/sizesvariant";

import CircularProgress from "@mui/material/CircularProgress";

import DefaultImage from "@assets/images/default/default.jpg";

import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";

import style from "./productcard.module.scss";

const ProductCard = ({ product, ...props }) => {
	const { addCartData, productVariants, setProductVariants, isLoading } = useCarts(product);

	const renderPrice = () => {
		if (product?.price_discount) {
			return (
				<div className="d-flex align-items-center">
					<div className={style.productPrice}>
						<span>{Number(product?.price_discount).toLocaleString()}</span>
						<span className={style.currency}>جنية</span>
					</div>
					<div className={`${style.productPrice} ${style.oldPrice}`}>
						<span>{Number(product?.price).toLocaleString()}</span>
						<span className={style.currency}>جنية</span>
					</div>
				</div>
			);
		}
		return (
			<div className={style.productPrice}>
				<span>{Number(product?.price).toLocaleString()}</span>
				<span className={style.currency}>جنية</span>
			</div>
		);
	};

	const renderDicountPrecentage = () => {
		if (product?.price_discount) {
			return <div className={style.productDiscount}>{calcPriceDiscount(product?.price, product?.price_discount)}%</div>;
		}
	};

	const handleAddProduct = (event) => {
		event.stopPropagation();
		addCartData();
	};

	const handleChooseColor = (event) => {
		const chossenColorValue = event.target.getAttribute("value");
		setProductVariants({ ...productVariants, color: chossenColorValue });
	};

	const handleChooseSize = (event) => {
		const chossenSizeValue = event.target.getAttribute("value");
		setProductVariants({ ...productVariants, size: chossenSizeValue });
	};

	return (
		<div className={`${style.productCard} text-center`} {...props}>
			<header className={style.header}>
				{renderDicountPrecentage()}

				{!!product?.sizes?.length || !!product?.colors?.length ? (
					<div className={style.variantsWrapper}>
						{!!product?.colors?.length && (
							<ColorsVariant
								style={{ marginLeft: "5px" }}
								className={`${style.colorsBtn}`}
								colors={product?.colors}
								choosenColor={productVariants.color}
								handleChooseColor={handleChooseColor}
							/>
						)}

						{!!product?.sizes?.length && (
							<SizesVariant
								className={`${style.sizesBtn}`}
								sizes={product?.sizes}
								choosenSize={productVariants.size}
								handleChooseSize={handleChooseSize}
							/>
						)}
					</div>
				) : (
					""
				)}

				<div className={style.productCardImageWrapper}>
					<Link href={`/product/${product?.product_slug}`}>
						<Image
							fill
							src={product?.image ? product?.image : DefaultImage}
							style={{ objectFit: "contain" }}
							className={style.img}
							alt={product?.name || ""}
						/>
					</Link>
				</div>
			</header>
			<div style={{ padding: "0px 10px" }}>
				<Link className={style.productName} href={`/product/${product?.product_slug}`}>
					{truncateCharacter(product?.product_name, 20)}
				</Link>
				<p className={style.productDescription}>{truncateCharacter(product?.short_description, 28)}</p>
				{!!product?.sizes?.length || !!product?.colors?.length ? (
					<div className={`${style.productVariantMobile}`}>
						{!!product?.colors?.length && (
							<ColorsVariant
								style={{ marginLeft: "5px" }}
								className={`${style.colorsBtn}`}
								colors={product?.colors}
								choosenColor={productVariants.color}
								handleChooseColor={handleChooseColor}
							/>
						)}

						{!!product?.sizes?.length && (
							<SizesVariant
								className={`${style.sizesBtn}`}
								sizes={product?.sizes}
								choosenSize={productVariants.size}
								handleChooseSize={handleChooseSize}
							/>
						)}
					</div>
				) : (
					""
				)}
				<div className={style.priceWrapper}>{renderPrice()}</div>

				<Button className={style.addProduct} onClick={handleAddProduct}>
					<div className={style.contentWrapper}>
						<span className={style.text}>اضافة الي سلة التسوق</span>
						{isLoading ? (
							<CircularProgress className={style.iconLoading} size={13} />
						) : (
							<ShoppingBagOutlinedIcon className={style.icon} fontSize="small" />
						)}
					</div>
				</Button>
			</div>
		</div>
	);
};

export default ProductCard;

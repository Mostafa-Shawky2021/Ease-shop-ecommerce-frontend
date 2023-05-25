import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button } from "react-bootstrap";
import { SubMenuCategories } from "@root/components/submenucategories";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Icon from "@assets/images/categoriesmenu/icon.png";

import style from "./categoryitem.module.scss";

const CategoryItem = ({ categoryData, ...props }) => {
	const subCategoryRef = useRef(null);

	const handleClickMenuItem = (event) => {
		event.stopPropagation();
		const subCategory = subCategoryRef.current;
		const activeSubMenuId = Number(event.currentTarget.getAttribute("data-category-id"));
		const subMenuId = Number(subCategory.getAttribute("data-category-id"));
		const subMenuHeight = subCategory.scrollHeight;

		if (activeSubMenuId === subMenuId) {
			subCategory.classList.toggle("active-subcategory");

			if (subCategory.classList.contains("active-subcategory")) {
				event.currentTarget.querySelector("span").style.transform = "rotate(-90deg)";
				subCategory.style.height = `${subMenuHeight}px`;
			} else {
				subCategory.style.height = "0px";
				event.currentTarget.querySelector("span").style.transform = "rotate(0deg)";
			}
		}
	};

	return (
		<li className={`${style.itemCategory} d-flex`} {...props}>
			<Link
				href={`/categoryproducts/${categoryData.cat_slug}`}
				className={`${style.categoryLink} d-flex align-items-center`}
			>
				<Image width={17} height={17} src={Icon} alt="category-icon" />
				<span className="ms-2">{categoryData.cat_name}</span>
			</Link>
			{!!categoryData?.sub_categories?.length && (
				<>
					<Button
						className={`${style.openSubCategoryButton} ms-auto`}
						onClick={handleClickMenuItem}
						data-category-id={categoryData.id}
					>
						<span>
							<ChevronLeftIcon fontSize="small" />
						</span>
					</Button>

					<div className={style.subMenuCategoriesMobile} data-category-id={categoryData.id} ref={subCategoryRef}>
						<SubMenuCategories className={style.listSubCategories} subCateogiresData={categoryData.sub_categories} />
					</div>
				</>
			)}
		</li>
	);
};
export default CategoryItem;

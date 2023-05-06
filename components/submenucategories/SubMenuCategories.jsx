import Link from "next/link";
import Image from "next/image";

import DefaultImage from "@assets/images/default/default.jpg";

import style from "./submenucategories.module.scss";

const SubMenuCategories = ({ className, subCateogiresData }) => {
	return (
		<ul className={`${style.defaultListSubCategories} ${className} list-unstyled`}>
			{subCateogiresData?.map((subCategory) => {
				const imageIcon = subCateogiresData?.image_thumbnail ? categoryData?.image_thumbnail : DefaultImage;

				return (
					<li key={subCategory.id} className={style.itemCategory}>
						<Link className={style.link} href={`/categoryproducts/${subCategory.cat_slug}`}>
							<Image width={17} height={17} src={imageIcon} alt={subCategory.cat_name} />
							<span style={{ margin: "0px 5px" }}>{subCategory.cat_name}</span>
						</Link>
					</li>
				);
			})}
		</ul>
	);
};
export default SubMenuCategories;

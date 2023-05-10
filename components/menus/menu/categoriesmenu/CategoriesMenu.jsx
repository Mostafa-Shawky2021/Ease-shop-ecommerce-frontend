import { useState, useRef } from "react";

import { useCategoriesData, useCloseMenuAction } from "@root/hooks";

import { Button } from "react-bootstrap";

import { BarIcon } from "@root/components/baricon";
import { ListItem } from "@root/components/listitem";
import { CategoryItem } from "./categoryitem";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import style from "./categoriesmenu.module.scss";

const CategoriesMenu = () => {
	const [categoryListIsOpen, setCategoryListIsOpen] = useState(false);

	const refCategoryMenu = useRef(null);

	const { data: categoriesData } = useCategoriesData();

	// close mobile fitler menu on mouse click, and on esacpe key down
	useCloseMenuAction(setCategoryListIsOpen, refCategoryMenu);

	const mainCategories = categoriesData?.filter((category) => category.parent_id === null);

	const CategoryListOpenClass = categoryListIsOpen ? style.openCategoryList : "";

	return (
		<div className={style.categoryWrapperMenu} ref={refCategoryMenu}>
			<Button className={style.buttonCategories} onClick={() => setCategoryListIsOpen(!categoryListIsOpen)}>
				<BarIcon activeIcons={categoryListIsOpen ? true : false} style={{ marginLeft: "0.7rem", marginTop: "5px", width: "20px" }} barIconStyle={null} />
				<span className={style.text}>جميع الاقسام</span>
				<span className="ms-auto">
					<KeyboardArrowDownIcon fontSize="small" />
				</span>
			</Button>

			<ul className={`${style.listCategories} ${CategoryListOpenClass}  list-unstyled`}>
				{!!categoriesData?.length ? <ListItem data={mainCategories} renderItem={(category) => <CategoryItem key={category.id} categoryData={category?.parent_id === null && category} onClick={() => setCategoryListIsOpen(false)} />} /> : <li style={{ padding: " 0.5rem 0.2rem" }}>لا توجد اقسام</li>}
			</ul>
		</div>
	);
};

export default CategoriesMenu;

import React from "react";
import { useCategoriesData } from "pages/homepage/hooks";
import { Header } from "@root/components/header";
import { Menu } from "@root/components/menu";

const LayoutWrapper = ({ children }) => {
	const { data: categories } = useCategoriesData();
	return (
		<>
			<Header
				menu={<Menu categoriesData={categories} />}
			/>
			{children}
		</>
	);
};

export default LayoutWrapper;

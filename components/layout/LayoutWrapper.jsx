import React, { useState } from "react";
import { useCategoriesData } from "pages/homepage/hooks";
import { Header } from "@root/components/header";
import { Menu } from "@root/components/menu";
import { Footer } from "@root/components/footer";
import { CartList } from "@root/components/cartlist";

const LayoutWrapper = ({ children }) => {
	const [isOpenCartList, setIsOpenCartList] = useState(false);

	const { data: categories } = useCategoriesData();

	return (
		<>
			<Header setIsOpenCartList={setIsOpenCartList} />
			<Menu categoriesData={categories} setIsOpenCartList={setIsOpenCartList} />
			<CartList isOpenCartList={isOpenCartList} setIsOpenCartList={setIsOpenCartList} />
			{children}
			<Footer />
		</>
	);
};

export default LayoutWrapper;

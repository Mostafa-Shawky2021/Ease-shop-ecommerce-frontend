import { useState, useEffect } from "react";

import { useCategoriesData } from '@root/hooks';

import { Header } from "@root/components/header";
import { Menu } from "@root/components/menu";
import { Footer } from "@root/components/footer";
import { SidebarCartList } from "@root/components/sidebarcartlist";

const LayoutWrapper = ({ children }) => {

	const [isOpenCartList, setIsOpenCartList] = useState(false);

	const { data: categories } = useCategoriesData();

	return (
		<>
			<Header
				setIsOpenCartList={setIsOpenCartList} />
			<Menu
				categoriesData={categories}
				setIsOpenCartList={setIsOpenCartList} />
			<SidebarCartList
				isOpenCartList={isOpenCartList}
				setIsOpenCartList={setIsOpenCartList} />
			{children}
			<Footer />
		</>
	);
};

export default LayoutWrapper;

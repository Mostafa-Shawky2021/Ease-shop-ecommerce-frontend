import { useState } from "react";

import { Header } from "@root/components/header";
import { Menu } from "@root/components/menu";
import { MenuMobile } from "@root/components/menumobile";
import { Footer } from "@root/components/footer";
import { SidebarCartList } from "@root/components/sidebarcartlist";
import { ToastContainer } from "react-toastify";

const LayoutWrapper = ({ children }) => {

	const [isOpenCartList, setIsOpenCartList] = useState(false);


	return (
		<>
			<Header setIsOpenCartList={setIsOpenCartList} />
			<Menu setIsOpenCartList={setIsOpenCartList} />
			<MenuMobile />
			<SidebarCartList
				isOpenCartList={isOpenCartList}
				setIsOpenCartList={setIsOpenCartList} />
			{children}
			<ToastContainer
				position="top-center"
				autoClose={1000}
				limit={1}
				hideProgressBar
				newestOnTop={false}
				closeOnClick
				rtl
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover
				theme="colored"
			/>
			<Footer />
		</>
	);
};

export default LayoutWrapper;

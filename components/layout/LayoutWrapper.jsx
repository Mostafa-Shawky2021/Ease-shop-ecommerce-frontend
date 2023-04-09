import { useState } from "react";

import { ToastContainer } from "react-toastify";

import { Header } from "@root/components/header";
import { Menu } from "@root/components/menus/menu";
import { MenuMobile } from "@root/components/menus/menumobile";
import { SideBarMobileMenuCollapse } from "@root/components/sidebars/sidebarmenus/sidebarmenumobilecollapse";
import { SideBarMenuMobile } from "@root/components/sidebars/sidebarmenus/sidebarmenumobile";
import { Footer } from "@root/components/footer";
import { SidebarCartList } from "@root/components/sidebars/sidebarcartlist";

const LayoutWrapper = ({ children }) => {

	const [isOpenCartList, setIsOpenCartList] = useState(false);

	return (
		<>
			<Header setIsOpenCartList={setIsOpenCartList} />

			<SideBarMobileMenuCollapse>
				{(sidebarMenuIsOpen, setSidebarMenuIsOpen) =>
					<>
						<Menu
							setSidebarMenuIsOpen={setSidebarMenuIsOpen}
							sidebarMenuIsOpen={sidebarMenuIsOpen} />
						<SideBarMenuMobile
							sidebarMenuIsOpen={sidebarMenuIsOpen}
							setSidebarMenuIsOpen={setSidebarMenuIsOpen} />
					</>
				}

			</SideBarMobileMenuCollapse>

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

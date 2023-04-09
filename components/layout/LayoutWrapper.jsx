import { ToastContainer } from "react-toastify";

import { Header } from "@root/components/header";
import { Menu } from "@root/components/menus/menu";
import { MenuMobile } from "@root/components/menus/menumobile";
import { SideBarMobileMenuCollapse } from "@root/components/sidebars/sidebarmenus/sidebarmenumobilecollapse";
import { SideBarMenuMobile } from "@root/components/sidebars/sidebarmenus/sidebarmenumobile";
import { Footer } from "@root/components/footer";
import { SidebarCartList } from "@root/components/sidebars/sidebarcartlist";
import { SideBarCartListCollapse } from "@root/components/sidebars/sidebarcartlistcollapse";

const LayoutWrapper = ({ children }) => {

	return (
		<>
			<SideBarCartListCollapse
				renderCartListCollapse={
					(isOpenCartList, setIsOpenCartList) =>
						<>
							<Header setIsOpenCartList={setIsOpenCartList} />
							<SidebarCartList
								isOpenCartList={isOpenCartList}
								setIsOpenCartList={setIsOpenCartList} />
						</>
				} />
			<SideBarMobileMenuCollapse
				renderSideBarMenuMobile={
					(sidebarMenuMobileIsOpen, setSidebarMenuMobileIsOpen) =>
						<>
							<Menu
								sidebarMenuMobileIsOpen={sidebarMenuMobileIsOpen}
								setSidebarMenuMobileIsOpen={setSidebarMenuMobileIsOpen} />
							<SideBarMenuMobile
								sidebarMenuMobileIsOpen={sidebarMenuMobileIsOpen}
								setSidebarMenuMobileIsOpen={setSidebarMenuMobileIsOpen} />
						</>
				} />

			<MenuMobile />
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
				theme="colored" />
			<Footer />
		</>
	);
};

export default LayoutWrapper;

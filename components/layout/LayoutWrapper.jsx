import { ToastContainer } from "react-toastify";

import { Header } from "@root/components/header";
import { Menu } from "@root/components/menus/menu";
import { MenuMobile } from "@root/components/menus/menumobile";
import { Footer } from "@root/components/footer";
import { SidebarCartList } from "@root/components/sidebars/sidebarcartlist";
import { SideBarCartListCollapse } from "@root/components/sidebars/sidebarcartlistcollapse";

const LayoutWrapper = ({ children }) => {
	return (
		<>
			<SideBarCartListCollapse
				renderCartListCollapse={(isOpenCartList, setIsOpenCartList) => (
					<>
						<Header setIsOpenCartList={setIsOpenCartList} />
						<SidebarCartList
							isOpenCartList={isOpenCartList}
							setIsOpenCartList={setIsOpenCartList}
						/>
						<Menu setIsOpenCartList={setIsOpenCartList} />
					</>
				)}
			/>

			<MenuMobile />
			{children}
			<ToastContainer
				position="top-center"
				autoClose={500}
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

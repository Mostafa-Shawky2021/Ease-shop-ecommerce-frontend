import { useState } from "react";

const SideBarCartListCollapse = ({ renderCartListCollapse }) => {
	const [isOpenCartList, setIsOpenCartList] = useState(false);

	return renderCartListCollapse(isOpenCartList, setIsOpenCartList);
};
export default SideBarCartListCollapse;

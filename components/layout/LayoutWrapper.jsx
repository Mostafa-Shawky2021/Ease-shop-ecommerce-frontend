import React from "react";
import Header from "./Header";

const LayoutWrapper = ({ children }) => {
	return (
		<>
			<Header />
			{children}
		</>
	);
};

export default LayoutWrapper;

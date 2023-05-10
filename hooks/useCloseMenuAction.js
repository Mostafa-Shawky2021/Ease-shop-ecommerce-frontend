import { useEffect } from "react";

const useCloseMenuAction = (setCloseState, refElement) => {
	useEffect(() => {
		const closeMenuOnKeyDown = (event) => {
			if (event.key === "Escape") setCloseState(false);
		};
		const closeMenuOnMouseClick = (event) => {
			if (!refElement) {
				alert("please provide the ref element");
				return false;
			}
			if (refElement.current.contains(event.target)) return false;
			setCloseState(false);
		};
		document.body.addEventListener("keydown", closeMenuOnKeyDown);
		document.body.addEventListener("click", closeMenuOnMouseClick);
		return () => {
			document.body.removeEventListener("keydown", closeMenuOnKeyDown);
			document.body.removeEventListener("click", closeMenuOnMouseClick);
		};
	}, [setCloseState]);
};
export default useCloseMenuAction;

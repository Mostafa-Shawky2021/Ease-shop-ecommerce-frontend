import style from "./baricon.module.scss";

const BarIcon = ({ activeIcons, barIconStyle = null, ...props }) => {
	return (
		<div className={`${style.barIconWrapper} ${activeIcons ? style.activeButton : ""}`} {...props}>
			<span className={`${style.defaultBarIcon} ${barIconStyle ? barIconStyle : ""}`}></span>
			<span className={`${style.defaultBarIcon} ${barIconStyle ? barIconStyle : ""}`}></span>
			<span className={`${style.defaultBarIcon} ${barIconStyle ? barIconStyle : ""}`}></span>
		</div>
	);
};

export default BarIcon;

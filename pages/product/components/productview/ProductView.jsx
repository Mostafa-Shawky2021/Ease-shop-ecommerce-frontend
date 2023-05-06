import style from "./productview.module.scss";

const ProductView = ({ ProductViewEffect }) => {
	return <div className={style.productViewWrapper}>{ProductViewEffect}</div>;
};
export default ProductView;

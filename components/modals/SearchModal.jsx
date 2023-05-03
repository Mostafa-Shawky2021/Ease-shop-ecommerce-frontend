import { useEffect, useState } from "react";

import { Modal } from "react-bootstrap";

import { InputWithIcon } from "../inputs";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import style from "./searchmodal.module.scss";

const SearchModal = ({ renderBtn }) => {
	const [searchOpenModal, setSearchModal] = useState(false);

	const handleOpenModal = () => setSearchModal((prevState) => !prevState);

	return (
		<>
			{renderBtn(handleOpenModal)}

			<Modal
				show={searchOpenModal}
				className={style.searchModalWrapper}
				dialogClassName={style.modalContent}
				onEscapeKeyDown={() => setOpenModal(false)}
				onHide={() => setSearchModal(false)}
			>
				<Modal.Body>
					<div>
						<InputWithIcon style={{ padding: "0.5rem", border: "1px solid #0075ff" }}>
							<button className={style.searchBtn}>
								<SearchOutlinedIcon fontSize="small" />
							</button>
						</InputWithIcon>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default SearchModal;

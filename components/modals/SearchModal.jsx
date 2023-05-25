import { useState } from "react";

import { useSearch } from "@root/hooks";

import { Modal } from "react-bootstrap";

import { InputWithIcon } from "../inputs";

import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import style from "./searchmodal.module.scss";

const SearchModal = ({ renderBtn }) => {
	const [searchOpenModal, setSearchModal] = useState(false);
	const { handleOnInputChange, handleOnSubmitSearch } = useSearch(setSearchModal);

	const handleOpenModal = () => setSearchModal(true);

	return (
		<>
			{renderBtn(handleOpenModal)}

			<Modal show={searchOpenModal} className={style.searchModalWrapper} dialogClassName={style.modalContent} onEscapeKeyDown={() => setSearchModal(false)} onHide={() => setSearchModal(false)}>
				<Modal.Body>
					<div>
						<InputWithIcon style={{ padding: "0.5rem", border: "1px solid #0075ff" }} onChange={handleOnInputChange} onKeyPress={handleOnSubmitSearch} placeholder="عن ماذا تبحث">
							<button className={style.searchBtn} onClick={handleOnSubmitSearch}>
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

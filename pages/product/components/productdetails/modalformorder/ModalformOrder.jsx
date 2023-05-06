import { useState } from "react";

import { useFormOrderValidation, useGuest } from "@root/hooks";
import { useFastOrderData } from "../../../hooks";

import { Form, Button, Modal } from "react-bootstrap";
import { Loading } from "@root/components/loading";

import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

import governorateData from "data/governorate.json";

import style from "./modalformorder.module.scss";

const ModalformOrder = ({ quantity, product, renderButton }) => {
	const [openModalOrder, setOpenModalOrder] = useState(false);

	const [isLoading, setIsLoading] = useState(false);

	const { validateForm, formErrorMsg } = useFormOrderValidation();
	const { guestId } = useGuest();

	const { mutate: sendFastOrder } = useFastOrderData(setIsLoading, setOpenModalOrder);

	const handleSubmit = (event) => {
		event.preventDefault();
		const price = product.price_discount || product.price;
		const total_price = price * quantity;
		const formData = new FormData(event.currentTarget);

		const orderDetails = {
			guest_id: guestId,
			quantity,
			total_price,
			product_id: product.id,
			username: formData.get("username"),
			phone: formData.get("phone"),
			governorate: formData.get("governorate"),
			street: formData.get("street"),
		};

		if (validateForm(orderDetails)) {
			sendFastOrder(orderDetails);
		}
	};

	return (
		<>
			{renderButton(setOpenModalOrder)}

			<Modal className={style.formModal} show={openModalOrder} onHide={() => setOpenModalOrder(false)}>
				<Modal.Header className={style.formModalHeader}>
					<Modal.Title className={style.title}>طلب اوردر</Modal.Title>
					<Button className={style.closeModal}>
						<CloseIcon className={style.icon} fontSize="small" />
					</Button>
				</Modal.Header>
				<Modal.Body>
					{isLoading && (
						<Loading>
							<CircularProgress size={33} className={style.loadingIcon} />
						</Loading>
					)}
					<div className={style.formOrderWrapper}>
						<Form onSubmit={handleSubmit}>
							<Form.Group style={{ position: "relative", flexGrow: "1" }} className="mb-3 mt-3" controlId="username">
								<div className="d-flex align-items-center">
									<Form.Label className={style.labelControl}>اسم المستخدم</Form.Label>
									<span className={style.required} style={{ marginRight: "5px" }}>
										*
									</span>
									<span className={style.errMsg}>{formErrorMsg.username}</span>
								</div>
								<Form.Control name="username" className={`${style.formControl} ${formErrorMsg.username ? style.errorField : ""}`} autoComplete="off" />
							</Form.Group>
							<Form.Group className="mb-3" controlId="phone">
								<div className="d-flex align-items-center">
									<Form.Label className={style.labelControl}>رقم التلفون</Form.Label>
									<span className={style.required} style={{ marginRight: "5px" }}>
										*
									</span>
									<span className={style.errMsg}>{formErrorMsg.phone}</span>
								</div>
								<Form.Control name="phone" type="number" className={`${style.formControl} ${formErrorMsg.phone ? style.errorField : ""}`} />
							</Form.Group>
							<Form.Group className="mb-3" controlId="governorate">
								<div className="d-flex align-items-center">
									<Form.Label className={style.labelControl}>المحافظة</Form.Label>
									<span className={style.required} style={{ marginRight: "5px" }}>
										*
									</span>
									<span className={style.errMsg}>{formErrorMsg.governorate}</span>
								</div>
								<Form.Select name="governorate" className={`${style.formControl} ${formErrorMsg.governorate ? style.errorField : ""}}`}>
									<option value="">...</option>
									{governorateData.governorates.map((governorate) => (
										<option key={governorate.id} className={style.option} value={governorate.governorate_name_ar}>
											{governorate.governorate_name_ar}
										</option>
									))}
								</Form.Select>
							</Form.Group>
							<Form.Group className="mb-3" controlId="street">
								<div className="d-flex align-items-center">
									<Form.Label className={style.labelControl}>عنوان الشارع</Form.Label>
									<span className={style.required} style={{ marginRight: "5px" }}>
										*
									</span>
									<span className={style.errMsg}>{formErrorMsg.street}</span>
								</div>
								<Form.Control name="street" type="text" className={`${style.formControl} ${formErrorMsg.street ? style.errorField : ""}`} />
							</Form.Group>
							<Form.Group className="mt-4 d-flex align-items-center justify-content-between">
								<Button className={style.checkOutbtn} type="submit">
									اتمام الاوردر
								</Button>
							</Form.Group>
						</Form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ModalformOrder;

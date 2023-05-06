import { useState } from "react";

import { Form, Button } from "react-bootstrap";

import style from "./contactform.module.scss";

const ContactForm = () => {
	const [errorMsg, setErrMsg] = useState({
		usernameErr: "",
		phoneErr: "",
		messageErr: "",
	});
	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const username = formData.get("username");
		const phone = formData.get("phone");
		const message = formData.get("message");

		const errMsg = {};

		// reset error form
		for (const errKey in errorMsg) {
			errMsg[errKey] = "";
		}

		let formIsValid = true;

		if (username.trim().length < 3) {
			errMsg.usernameErr = "اسم المستخدم يجب ان يكون اكبر من 3 حروف ";
			formIsValid = false;
		}

		if (!/^\d{11}$/.test(phone)) {
			errMsg.phoneErr = "رقم التلفون يجب ان يكون صالحاً";
			formIsValid = false;
		}
		if (message.trim().length < 4) {
			errMsg.messageErr = "محتوي الرسالة لا يجب ان يكون فارغاً وان يكتوي علي اكثر من 4 حروف";
			formIsValid = false;
		}

		setErrMsg({ ...errorMsg, ...errMsg });
		if (!formIsValid) console.log(errorMsg);
	};
	return (
		<div className={style.contactFormWrapper}>
			<Form onSubmit={handleSubmit}>
				<Form.Group style={{ position: "relative" }} className="mb-3 mt-3" controlId="username">
					<div className="d-flex align-items-center">
						<Form.Label className={style.formLabel}>الاسم</Form.Label>
						<span className={style.required} style={{ marginRight: "5px" }}>
							*
						</span>
						<span className={`${style.errMsg} ms-auto`}> {errorMsg.usernameErr}</span>
					</div>
					<Form.Control name="username" className={`${style.formControl} ${errorMsg.usernameErr ? style.errorField : ""}`} autoComplete="off" />
				</Form.Group>
				<Form.Group style={{ position: "relative" }} className="mb-3 mt-3" controlId="phone">
					<div className="d-flex align-items-center">
						<Form.Label className={style.formLabel}>رقم التلفون</Form.Label>
						<span className={style.required} style={{ marginRight: "5px" }}>
							*
						</span>
						<span className={`${style.errMsg} ms-auto`}>{errorMsg.phoneErr}</span>
					</div>
					<Form.Control name="phone" className={`${style.formControl} ${errorMsg.phoneErr ? style.errorField : ""}`} autoComplete="off" />
				</Form.Group>
				<Form.Group style={{ position: "relative" }} className="mb-3 mt-3" controlId="email">
					<div className="d-flex align-items-center">
						<Form.Label className={style.formLabel}>البريد الالكتروني</Form.Label>
						<span className={style.required} style={{ marginRight: "5px" }}>
							*
						</span>
						<span className={`${style.errMsg} ms-auto`}></span>
					</div>
					<Form.Control name="email" className={style.formControl} autoComplete="off" />
				</Form.Group>
				<Form.Group style={{ position: "relative" }} className="mb-3 mt-3" controlId="message">
					<div className="d-flex align-items-center">
						<Form.Label className={style.formLabel}>الرسالة</Form.Label>
						<span className={style.required} style={{ marginRight: "5px" }}>
							*
						</span>
						<span className={`${style.errMsg} ms-auto`}>{errorMsg.messageErr}</span>
					</div>
					<Form.Control style={{ minHeight: "160px" }} as="textarea" className={`${style.formControl} ${errorMsg.messageErr ? style.errorField : ""}`} rows={3} name="message" />
				</Form.Group>
				<Button type="submit">Send</Button>
			</Form>
		</div>
	);
};

export default ContactForm;

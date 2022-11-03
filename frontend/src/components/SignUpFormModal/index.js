import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import SignUpForm from "./SignUpForm";
import "./signupbtn.css";
function SignUpFormModal() {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button className="signup-button" onClick={() => setShowModal(true)}>
				Sign Up
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignUpForm />
				</Modal>
			)}
		</>
	);
}

export default SignUpFormModal;

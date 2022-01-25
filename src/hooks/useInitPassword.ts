import React from "react";
import { useState } from "react";

type ReturnType = [boolean, boolean, (e: React.FormEvent<HTMLFormElement>) => void];

const useInitPassword = (email: string, name: string, showConfirmModal: () => void): ReturnType => {
	const [emailValidation, setEmailValidation] = useState(true);
	const [nameValidation, setNameValidation] = useState(true);

	const checkAllInputsValidation = () => {
		setEmailValidation(email.trim() !== "");
		setNameValidation(name.trim() !== "");

		return email.trim() !== "" && name.trim() !== "";
	};

	const handleSubmitInitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationCheckResult = checkAllInputsValidation();

		if (!validationCheckResult) return;

		showConfirmModal();
	};

	return [emailValidation, nameValidation, handleSubmitInitForm];
};

export default useInitPassword;

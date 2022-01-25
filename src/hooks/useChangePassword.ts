import React, { useState } from "react";

type ReturnType = [boolean, boolean, boolean, (e: React.FormEvent<HTMLFormElement>) => void];

const useChangePassword = (curPassword: string, newPassword: string, newPasswordConfirm: string): ReturnType => {
	const [curPasswordValidation, setCurPasswordValidation] = useState(true);

	const [newPasswordValidation, setNewPasswordValidation] = useState(true);

	const [newPasswordConfirmValidation, setNewPasswordConfirmValidation] = useState(true);

	const checkCurPasswordValidation = () => {
		setCurPasswordValidation(curPassword.trim() !== "");

		return curPassword.trim() !== "";
	};

	const checkNewPasswordValidation = () => {
		const regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;

		const checkResult = regExp.test(newPassword);

		setNewPasswordValidation(checkResult);

		return checkResult;
	};

	const checkNewPasswordConfirmValidation = () => {
		const checkResult = newPasswordConfirm.trim() !== "" && newPassword === newPasswordConfirm;

		setNewPasswordConfirmValidation(checkResult);

		return checkResult;
	};

	const checkAllInputsValidation = () => {
		const isCurPasswordValid = checkCurPasswordValidation();
		const isNewPasswordValid = checkNewPasswordValidation();
		const isNewPasswordConfirmValid = checkNewPasswordConfirmValidation();

		return isCurPasswordValid && isNewPasswordValid && isNewPasswordConfirmValid;
	};

	const handleSubmitInitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationCheckResult = checkAllInputsValidation();

		if (!validationCheckResult) return;
	};

	return [curPasswordValidation, newPasswordValidation, newPasswordConfirmValidation, handleSubmitInitForm];
};

export default useChangePassword;

import { RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from "constants/api";
import { BASIC_ERROR_MESSAGE } from "constants/api";
import { useHistory } from "react-router-dom";
import { responseErrorWarning, responseSuccessGuide } from "stores/slices/user-slice";
import UserService from "apis/user/user-service";
import { useDispatch } from "react-redux";
import React, { useState } from "react";

type ReturnType = [boolean, boolean, boolean, (e: React.FormEvent<HTMLFormElement>) => void];
const userService = new UserService();
const useChangePassword = (curPassword: string, newPassword: string, newPasswordConfirm: string): ReturnType => {
	const [curPasswordValidation, setCurPasswordValidation] = useState(true);

	const [newPasswordValidation, setNewPasswordValidation] = useState(true);

	const [newPasswordConfirmValidation, setNewPasswordConfirmValidation] = useState(true);

	const dispatch = useDispatch();
	const history = useHistory();
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

	const changePassword = async () => {
		const data = {
			confirmation: newPasswordConfirm,
			currentPassword: curPassword,
			newPassword: newPassword,
		};

		try {
			const status = await userService.changePassword(data);
			if (status === RESPONSE_STATUS_200) {
				dispatch(responseSuccessGuide("비밀번호를 변경했어요!"));
				history.push("/");
			}

			if (status >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
				return;
			}
		} catch (error: any) {
			dispatch(responseErrorWarning(error.response.data?.error?.message || BASIC_ERROR_MESSAGE));
		}
	};

	const handleSubmitInitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationCheckResult = checkAllInputsValidation();

		if (!validationCheckResult) return;

		changePassword();
	};

	return [curPasswordValidation, newPasswordValidation, newPasswordConfirmValidation, handleSubmitInitForm];
};

export default useChangePassword;

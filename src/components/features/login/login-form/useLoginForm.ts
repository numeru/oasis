import React, { useState } from "react";
import AuthService from "apis/auth/auth-service";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { responseErrorWarning, userLogin } from "stores/slices/user-slice";
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from "constants/api";

const authService = new AuthService();

type ReturnType = [boolean, boolean, (e: React.FormEvent<HTMLFormElement>) => void];

const useLoginForm = (email: string, password: string): ReturnType => {
	const [emailValidation, setEmailValidation] = useState(true);

	const [passwordlValidation, setPasswordValidation] = useState(true);

	const checkAllInputsValidation = () => {
		setEmailValidation(email.trim() !== "");
		setPasswordValidation(password.trim() !== "");

		return email.trim() !== "" && password.trim() !== "";
	};

	const history = useHistory();

	const dispatch = useDispatch();

	const login = async () => {
		const data = {
			emailId: email,
			password: password,
		};

		try {
			const statusCode = await authService.login(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
				dispatch(userLogin());
				history.push({
					pathname: "/",
					state: {
						login_success: true,
					},
				});
			}
		} catch (error: any) {
			dispatch(responseErrorWarning(error.response.data?.error?.message || BASIC_ERROR_MESSAGE));
		}
	};

	const handleSubmitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const validationCheckResult = checkAllInputsValidation();

		if (!validationCheckResult) return;

		login();
	};

	return [emailValidation, passwordlValidation, handleSubmitLoginForm];
};

export default useLoginForm;

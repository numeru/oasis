import React from "react";
import SignUpFormService from "services/signup_form_service";
import { useDispatch } from "react-redux";
import { responseErrorWarning, userLogin } from "stores/slices/user-slice";
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from "constants/api";
import { useHistory } from "react-router-dom";
import AuthService from "apis/auth/auth-service";

const authService = new AuthService();

const useCompleteSignUpForm = (
	signUpFormService: SignUpFormService,
	certificationCode: string,
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const login = async () => {
		const data = {
			emailId: signUpFormService.getEmail(),
			password: signUpFormService.getPassword(),
		};

		try {
			const statusCode = await authService.login(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
				dispatch(userLogin());

				history.push({
					pathname: "/",
					state: {
						signup_success: true,
					},
				});
			}
		} catch (error: any) {
			dispatch(responseErrorWarning(error.response.data?.error?.message || "다시 로그인 해주세요."));
		}
	};

	const signUp = async () => {
		const data = {
			emailId: signUpFormService.getEmail(),
			password: signUpFormService.getPassword(),
			userName: signUpFormService.getName(),
			termsOfService: signUpFormService.getTerms(),
			privacyOfPolicy: signUpFormService.getPrivacy(),
			marketingSub: signUpFormService.getMarketing(),
		};

		try {
			const {
				statusCode,
				data: { message },
			} = await authService.signup(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(message || BASIC_ERROR_MESSAGE));
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
				login();
			}
		} catch (error) {
			dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
		}
	};

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsValid(certificationCode.trim() !== "");

		if (certificationCode.trim() === "") return;

		// 인증번호 확인 과정 필요

		signUp();
	};

	return handleSubmitForm;
};

export default useCompleteSignUpForm;

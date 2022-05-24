import { initSignUpForm } from 'stores/slices/signup-slice';
import { useDispatch, useSelector } from 'react-redux';
import { responseErrorWarning, userLogin } from 'stores/slices/user-slice';
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from 'constants/api';
import AuthService from 'apis/Auth/auth-service';
import { useRouter } from 'next/router';
import { selectUser } from 'stores/store';

const authService = new AuthService();

const useCompleteSignUpForm = (
	certificationCode: string,
	setIsValid: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const { email, password, name, privacy, terms, marketing } = useSelector(selectUser);

	const dispatch = useDispatch();

	const Router = useRouter();

	const login = async () => {
		const data = {
			emailId: email,
			password,
		};

		try {
			const statusCode = await authService.login(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
				dispatch(userLogin());

				Router.push(
					{
						pathname: '/',
						query: {
							signup_success: 'true',
						},
					},
					'/',
				);
			}
		} catch (error: any) {
			dispatch(responseErrorWarning(error.response.data?.error?.message || '다시 로그인 해주세요.'));
		}
	};

	const signup = async () => {
		const data = {
			emailId: email,
			password,
			userName: name,
			termsOfService: privacy,
			privacyOfPolicy: terms,
			marketingSub: marketing,
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

		setIsValid(certificationCode.trim() !== '');

		if (certificationCode.trim() === '') return;

		// 인증번호 확인 과정 필요

		dispatch(initSignUpForm());
		signup();
	};

	return handleSubmitForm;
};

export default useCompleteSignUpForm;

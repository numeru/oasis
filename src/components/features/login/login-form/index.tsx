import React, { useMemo, useState } from "react";

import {
	LoginButton,
	LoginFormContainer,
	LoginFormField,
	LoginFormLabel,
	LoginFormInput,
	MoveToSignUpButton,
	LoginAlertMessage,
} from "./styled";
import useInput from "@hooks/useInput";
import AuthService from "@apis/auth/auth-service";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { responseErrorWarning, throwTokenError, userLogin } from "@stores/slices/user-slice";
import TogglePasswordButton from "@components/shared/toggle-password-button";
import { TOKEN_ERROR } from "@apis/errors";

type Props = {
	authService: AuthService;
};

const LoginForm = ({ authService }: Props) => {
	const [email, handleEmail, setEmail] = useInput("");
	const [password, handlePassword, setPassword] = useInput("");

	const [emailValidation, setEmailValidation] = useState(true);

	const [passwordlValidation, setPasswordValidation] = useState(true);

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const checkAllInputsValidation = () => {
		setEmailValidation(email.trim() !== "");
		setPasswordValidation(password.trim() !== "");

		return !emailValidation || !passwordlValidation;
	};

	const isThereBlankInput = useMemo(
		() => email.trim() === "" || password.trim() === "",

		[email, password],
	);

	const history = useHistory();

	const dispatch = useDispatch();

	const login = async () => {
		const data = {
			emailId: email,
			password: password,
		};

		try {
			const {
				statusCode,
				data: { message },
			} = await authService.login(data);

			if (statusCode >= 400) {
				dispatch(responseErrorWarning(message || "잠시 후 다시 시도해주세요"));
				return;
			}

			if (statusCode === 200) {
				dispatch(userLogin());
				history.push({
					pathname: "/",
					state: {
						login_success: true,
					},
				});
			}
		} catch (error: any) {
			dispatch(responseErrorWarning(error.response.data?.error?.message || "잠시 후 다시 시도해주세요"));
		}
	};

	const handleSubmitLoginForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		checkAllInputsValidation();

		if (isThereBlankInput) return;

		login();
	};

	return (
		<LoginFormContainer onSubmit={handleSubmitLoginForm}>
			<ul>
				<LoginFormField>
					<LoginFormLabel htmlFor="login_email">이메일</LoginFormLabel>
					<LoginFormInput
						id="login_email"
						type="text"
						placeholder="이메일을 입력해주세요"
						value={email}
						onChange={handleEmail}
					/>
					{!emailValidation && <LoginAlertMessage>이메일을 입력해주세요</LoginAlertMessage>}
				</LoginFormField>
				<LoginFormField>
					<LoginFormLabel htmlFor="login_password">비밀번호</LoginFormLabel>
					<div>
						<LoginFormInput
							id="login_password"
							type={isPasswordVisible ? "text" : "password"}
							placeholder="비밀번호를 입력해주세요"
							value={password}
							onChange={handlePassword}
						/>
						{password !== "" && (
							<TogglePasswordButton isPasswordVisible={isPasswordVisible} setIsPasswordVisible={setIsPasswordVisible} />
						)}
					</div>

					{!passwordlValidation && <LoginAlertMessage>비밀번호를 입력해주세요</LoginAlertMessage>}
				</LoginFormField>
			</ul>

			<LoginButton type="submit">로그인</LoginButton>
			<MoveToSignUpButton to="/signup">회원가입</MoveToSignUpButton>
		</LoginFormContainer>
	);
};

export default LoginForm;

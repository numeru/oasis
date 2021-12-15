import React, { useState } from "react";

import {
	SignUpButton,
	SignUpCancelButton,
	SignUpFormCheckBox,
	SignUpFormContainer,
	SignUpFormInput,
	SignUpFormLabel,
	SignUpFormField,
	SignUpAlertMessage,
} from "./styled";
import useInput from "@hooks/useInput";
import AuthService from "@apis/auth/auth-service";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { responseErrorWarning, userLogin } from "@stores/slices/user-slice";
import { AlertFailModal } from "@components/shared/alert-messages/styled";
import TogglePasswordButton from "@components/shared/toggle-password-button";

type InputValidation = {
	valid: boolean;
	message: string;
};

type Props = {
	authService: AuthService;
};

const SignUpForm = ({ authService }: Props) => {
	const [email, handleEmail, setEmail] = useInput("");
	const [password, handlePassword, setPassword] = useInput("");
	const [name, handleName, setName] = useInput("");

	const [privacy, setPrivacy] = useState(false);
	const handlePrivacy = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPrivacy(e.target.checked);
	};
	const [terms, setTerms] = useState(false);
	const handleTerms = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTerms(e.target.checked);
	};
	const [marketing, setMarketing] = useState(false);
	const handleMarketing = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMarketing(e.target.checked);
	};

	const [emailValidation, setEmailValidation] = useState<InputValidation>({
		valid: true,
		message: "",
	});

	const checkEmailValidation = () => {
		if (!email.trim()) {
			setEmailValidation({
				valid: false,
				message: "이메일을 입력해주세요",
			});
			return;
		}

		const regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

		if (!regExp.test(email)) {
			setEmailValidation({
				valid: false,
				message: "사용 가능한 이메일을 입력해주세요",
			});
			return;
		}

		setEmailValidation({
			valid: true,
			message: "",
		});
	};

	const [passwordValidation, setPasswordValidation] = useState<InputValidation>({
		valid: true,
		message: "",
	});

	const checkPasswordValidation = () => {
		if (!password.trim()) {
			setPasswordValidation({
				valid: false,
				message: "비밀번호를 입력해주세요",
			});
			return;
		}

		const regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,}$/;

		if (!regExp.test(password) || password.length < 8) {
			setPasswordValidation({
				valid: false,
				message: "8자 이상 영문/숫자 조합으로 입력해주세요",
			});
			return;
		}

		setPasswordValidation({
			valid: true,
			message: "",
		});
	};

	const [nameValidation, setNameValidation] = useState<InputValidation>({
		valid: true,
		message: "",
	});

	const checkNameValidation = () => {
		if (!name.trim()) {
			setNameValidation({
				valid: false,
				message: "이름을 입력해주세요",
			});
			return;
		}

		const regExp = /^[가-힣]+$/;

		if (!regExp.test(name)) {
			setNameValidation({
				valid: false,
				message: "이름은 한글만 가능해요",
			});
			return;
		}

		setNameValidation({
			valid: true,
			message: "",
		});
	};

	const [agreementValidation, setAgreementValidation] = useState<InputValidation>({
		valid: true,
		message: "",
	});

	const checkAgreementValidation = () => {
		if (!privacy || !terms) {
			setAgreementValidation({
				valid: false,
				message: "필수 약관에 동의해주세요",
			});
			return;
		}

		setAgreementValidation({
			valid: true,
			message: "",
		});
	};

	const checkAllInputsValidation = () => {
		checkEmailValidation();
		checkPasswordValidation();
		checkNameValidation();
		checkAgreementValidation();

		return !emailValidation.valid || !passwordValidation.valid || !nameValidation.valid || !privacy || !terms;
	};

	const history = useHistory();

	const dispatch = useDispatch();

	const login = async () => {
		const data = {
			emailId: email,
			password: password,
		};

		const {
			statusCode,
			data: { message },
		} = await authService.login(data);

		if (statusCode >= 400) {
			alert(message);
			return;
		}

		if (statusCode === 200) {
			dispatch(userLogin());

			history.push({
				pathname: "/",
				state: {
					signup_success: true,
				},
			});
		}
	};

	const signUp = async () => {
		const data = {
			emailId: email,
			password: password,
			userName: name,
			termsOfService: terms,
			privacyOfPolicy: privacy,
			marketingSub: marketing,
		};

		try {
			const {
				statusCode,
				data: { message },
			} = await authService.signup(data);

			if (statusCode >= 400) {
				dispatch(responseErrorWarning(message || "잠시 후 다시 시도해주세요"));
				return;
			}

			if (statusCode === 200) {
				login();
			}
		} catch (error) {
			dispatch(responseErrorWarning("잠시 후 다시 시도해주세요"));
		}
	};

	const handleSumbitSignUpForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (checkAllInputsValidation()) return;

		signUp();
	};

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	return (
		<SignUpFormContainer onSubmit={handleSumbitSignUpForm}>
			{!agreementValidation.valid && <AlertFailModal>{agreementValidation.message}</AlertFailModal>}
			<ul>
				<SignUpFormField>
					<SignUpFormLabel htmlFor="signup_email">이메일*</SignUpFormLabel>
					<SignUpFormInput
						id="signup_email"
						type="text"
						placeholder="사용 가능한 이메일을 입력해주세요"
						value={email}
						onChange={handleEmail}
					/>
					{!emailValidation.valid && <SignUpAlertMessage>{emailValidation.message}</SignUpAlertMessage>}
				</SignUpFormField>
				<SignUpFormField>
					<SignUpFormLabel htmlFor="signup_password">비밀번호*</SignUpFormLabel>
					<div>
						<SignUpFormInput
							id="signup_password"
							type={isPasswordVisible ? "text" : "password"}
							placeholder="8자 이상 영문/숫자 포함해서 입력해주세요"
							value={password}
							onChange={handlePassword}
						/>
						{password !== "" && (
							<TogglePasswordButton isPasswordVisible={isPasswordVisible} setIsPasswordVisible={setIsPasswordVisible} />
						)}
					</div>

					{!passwordValidation.valid && <SignUpAlertMessage>{passwordValidation.message}</SignUpAlertMessage>}
				</SignUpFormField>
				<SignUpFormField>
					<SignUpFormLabel htmlFor="signup_name">이름*</SignUpFormLabel>
					<SignUpFormInput
						id="signup_name"
						type="text"
						placeholder="실명을 입력해주세요"
						value={name}
						onChange={handleName}
					/>
					{!nameValidation.valid && <SignUpAlertMessage>{nameValidation.message}</SignUpAlertMessage>}
				</SignUpFormField>
			</ul>

			<ul>
				<li>
					<SignUpFormCheckBox>
						<input type="checkbox" checked={privacy} onChange={handlePrivacy} />
						[필수] 개인정보처리방침에 동의합니다
					</SignUpFormCheckBox>
				</li>
				<li>
					<SignUpFormCheckBox>
						<input type="checkbox" checked={terms} onChange={handleTerms} />
						[필수] 이용약관에 동의합니다
					</SignUpFormCheckBox>
				</li>
				<li>
					<SignUpFormCheckBox>
						<input type="checkbox" checked={marketing} onChange={handleMarketing} />
						[선택] 마케팅정보수신에 동의합니다
					</SignUpFormCheckBox>
				</li>
			</ul>

			<SignUpButton type="submit">회원가입</SignUpButton>
			<SignUpCancelButton to="/login">돌아가기</SignUpCancelButton>
		</SignUpFormContainer>
	);
};

export default SignUpForm;

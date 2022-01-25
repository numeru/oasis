import React, { useState } from "react";
import useInput from "@hooks/useInput";
import TogglePasswordButton from "@components/shared/toggle-password-button";
import useLoginForm from "@hooks/useLoginForm";
import FormItem from "@components/shared/form-item";
import { FormAlertMessage, FormField, FormInput, FormLabel } from "@components/shared/form-item/styled";
import { LoginButton, LoginFormContainer, MoveToSignUpButton } from "./styled";

const LoginForm = () => {
	const [email, handleEmail] = useInput("");
	const [password, handlePassword] = useInput("");

	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const [emailValidation, passwordlValidation, handleSubmitLoginForm] = useLoginForm(email, password);

	return (
		<LoginFormContainer onSubmit={handleSubmitLoginForm}>
			<ul>
				<FormItem
					id="login_email"
					label="이메일"
					type="text"
					placeholder="이메일을 입력해주세요"
					value={email}
					handleChange={handleEmail}
					isValid={emailValidation}
					validationMessage="이메일을 입력해주세요"
					required
				/>

				<FormField>
					<FormLabel htmlFor="login_password">비밀번호</FormLabel>
					<div>
						<FormInput
							id="login_password"
							type={isPasswordVisible ? "text" : "password"}
							placeholder="비밀번호를 입력해주세요"
							value={password}
							onChange={handlePassword}
							aria-required="true"
							aria-invalid={!passwordlValidation}
							aria-errormessage="login_password_validation_error_message"
						/>
						{password !== "" && (
							<TogglePasswordButton isPasswordVisible={isPasswordVisible} setIsPasswordVisible={setIsPasswordVisible} />
						)}
					</div>

					{!passwordlValidation && (
						<FormAlertMessage id="login_password_validation_error_message" role="alert">
							비밀번호를 입력해주세요
						</FormAlertMessage>
					)}
				</FormField>
			</ul>

			<LoginButton type="submit">로그인</LoginButton>
			<MoveToSignUpButton to="/signup">회원가입</MoveToSignUpButton>
		</LoginFormContainer>
	);
};

export default LoginForm;

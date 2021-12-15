import React from "react";
import styled from "styled-components";
import LoginForm from "@components/features/login/login-form";
import { FindAccountButton, LoginHeader } from "@components/features/login/login-form/styled";
import AuthService from "@apis/auth/auth-service";

const LoginContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 5.6% 7.5% 95% 7.5%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

type Props = {
	authService: AuthService;
};

const Login = ({ authService }: Props) => {
	const handleOpenMail = () => {
		window.open("mailto:oasis.yeha@gmail.com", "_blank");
	};

	return (
		<LoginContainer>
			<LoginHeader>
				<span>👋</span>
				<h2>로그인해주세요</h2>
			</LoginHeader>

			<LoginForm authService={authService} />

			<FindAccountButton role="link" onClick={handleOpenMail}>
				이메일/비밀번호가 기억나지 않으세요?
			</FindAccountButton>
		</LoginContainer>
	);
};

export default Login;

import React from "react";
import styled from "styled-components";
import LoginForm from "@components/features/login/login-form";
import { FindAccountButton, LoginHeader } from "@components/features/login/login-form/styled";

const LoginContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 5.6% 7.5% 95% 7.5%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const Login = () => {
	return (
		<LoginContainer>
			<LoginHeader>
				<span>👋</span>
				<h2>로그인해주세요</h2>
			</LoginHeader>

			<LoginForm />

			<FindAccountButton to="/inquiry/account">비밀번호를 잊어버리셨나요?</FindAccountButton>
		</LoginContainer>
	);
};

export default Login;

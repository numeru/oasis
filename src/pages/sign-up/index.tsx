import React from "react";
import { Route, Switch } from "react-router";
import styled from "styled-components";
import SignUpForm from "@components/features/sign-up/sign-up-form";
import { SignUpHeader } from "@components/features/sign-up/sign-up-form/styled";
import CheckValidation from "@pages/sign-up/check-validation";
import AuthService from "@apis/auth/auth-service";

const SignUpContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 5.6% 7.5%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

type Props = {
	authService: AuthService;
};

const SignUp = ({ authService }: Props) => {
	return (
		<SignUpContainer>
			<SignUpHeader>
				<span>👋</span>
				<h2>회원가입해주세요</h2>
			</SignUpHeader>
			<Switch>
				<Route exact path="/signup">
					<SignUpForm authService={authService} />
				</Route>

				<Route exact path="/signup/validation" component={CheckValidation} />
			</Switch>
		</SignUpContainer>
	);
};

export default SignUp;

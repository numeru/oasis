import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import SignUpForm from "components/features/sign-up/sign-up-form";
import { SignUpHeader } from "components/features/sign-up/sign-up-form/styled";
import EmailCertification from "pages/sign-up/email-certification";
import SignUpFormService from "services/signup_form_service";

const SignUpContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 5.6% 7.5%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const signUpFormService = new SignUpFormService();

const SignUp = () => {
	useEffect(() => {
		return () => {
			signUpFormService.resetAllInputs();
		};
	}, []);

	return (
		<SignUpContainer>
			<SignUpHeader>
				<span>👋</span>
				<h2>회원가입</h2>
			</SignUpHeader>
			<Switch>
				<Route exact path="/signup">
					<SignUpForm signUpFormService={signUpFormService} />
				</Route>

				<Route exact path="/signup/certification">
					<EmailCertification signUpFormService={signUpFormService} />
				</Route>
			</Switch>
		</SignUpContainer>
	);
};

export default SignUp;

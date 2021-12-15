import styled from "styled-components";
import { FormCancelButton, FormConfirmButton } from "@components/shared/form-buttons/styled";
export const LoginHeader = styled.header`
	width: 100%;
	display: flex;
	margin-bottom: 11%;
	align-items: center;

	& > span {
		font-size: 1.75rem;
	}

	& > h2 {
		margin: 0;
		font-size: 1.5rem;
		margin-left: 3.5%;
		font-family: var(--font-nanum-bold);
	}
`;

export const LoginFormContainer = styled.form`
	width: 100%;
	padding: 0 6%;
	display: flex;
	flex-direction: column;
`;

export const LoginFormField = styled.li`
	margin-bottom: 11%;

	& > input {
		margin-top: 2.2%;
	}

	& > div {
		display: flex;
		align-items: center;
		position: relative;
		margin-top: 2.2%;
	}
`;

export const LoginFormLabel = styled.label`
	width: 100%;
	font-size: 0.875rem;
	padding-left: 2%;
	font-family: var(--font-nanum-bold);
`;

export const LoginFormInput = styled.input`
	width: 100%;
	font-size: 0.75rem;
	padding: 4.7% 5.7%;
	border-radius: 8px;
	border: 1px solid #363636;

	&::placeholder {
		color: var(--color-light-gray);
	}
`;
export const LoginButton = styled(FormConfirmButton)`
	width: 100%;
	margin: 2% 0 6.5% 0;
`;

export const MoveToSignUpButton = styled(FormCancelButton)`
	width: 100%;
	margin-bottom: 6.5%;
`;

export const FindAccountButton = styled.button`
	color: var(--color-dark-gray);
	font-size: 0.75rem;
	text-decoration: underline;
	background-color: transparent;
`;

export const LoginAlertMessage = styled.p`
	font-size: 0.75rem;
	color: var(--color-red);
	padding-left: 2%;
	margin: 1.4% 0 0 0;
`;

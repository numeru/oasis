import styled from "styled-components";
import { FormCancelButton, FormConfirmButton } from "@components/shared/form-buttons/styled";

export const SignUpHeader = styled.header`
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

export const SignUpFormContainer = styled.form`
	width: 100%;
	padding: 0 6% 48% 6%;
	display: flex;
	flex-direction: column;
	align-items: center;

	& > ul {
		width: 100%;
	}
`;

export const SignUpFormCheckBox = styled.label`
	display: flex;
	align-items: center;
	font-size: 0.875rem;
	padding-left: 2%;
	margin-bottom: 5%;
	cursor: pointer;
	position: relative;

	& > input {
		width: 20px;
		height: 20px;
		flex-shrink: 0;
		margin: 0 5% 0 0;
		cursor: pointer;
	}

	& > span {
		position: absolute;
		right: 4%;
		font-family: var(--font-nanum-bold);
		font-size: 0.9rem;
	}
`;

export const SignUpButton = styled(FormConfirmButton)`
	width: 100%;
	margin: 6.5% 0;
`;

export const SignUpCancelButton = styled(FormCancelButton)`
	width: 100%;
	margin-bottom: 6.5%;
`;

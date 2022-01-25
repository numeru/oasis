import styled from "styled-components";
import { FormConfirmButton } from "@components/shared/form-buttons/styled";
import { AlertFailMessage } from "@components/shared/alert-messages/styled";

export const UploadForm = styled.form`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 3% 0 40% 0;

	& > h2 {
		font-size: 1.125rem;
		width: 100%;
		text-align: left;
		margin: 0 0 9.5% 0;
		font-family: var(--font-nanum-bold);
	}

	& > ul {
		width: 100%;
	}
`;

export const UploadInputField = styled.li`
	width: 100%;
	padding: 0 1%;
	margin-bottom: 12%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	& > label {
		font-size: 1rem;
		margin: 0 0 2% 0;
		width: 100%;
		font-family: var(--font-nanum-bold);
	}
`;

export const UploadInputTitle = styled.p`
	font-size: 1rem;
	margin: 0 0 2% 0;
	width: 100%;
	font-family: var(--font-nanum-bold);
`;

export const UploadGuide = styled.p`
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	margin: 0 0 4% 0;
	padding-top: 2%;
	width: 100%;
`;

export const FillBlankInstructions = styled(AlertFailMessage)`
	display: inline-block;
	flex: 0;
	font-size: 0.75rem;
	padding: 1.3% 3.9%;
	margin: 1% 0 2% 0;
`;

export const UploadImageBox = styled.button`
	width: 100%;
	border: 2px dashed #dbdcde;
	border-radius: 8px;
	text-decoration: underline;
	text-align: center;
	padding: 6% 0;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	background-color: transparent;
	font-family: var(--font-nanum-bold);
`;

export const RemoveUploadedImageButton = styled.button`
	font-size: 0.75rem;
	background-color: transparent;
	color: var(--color-dark-gray);
	text-decoration: underline;
	float: right;
	margin-bottom: 2%;
	font-family: var(--font-nanum-bold);
`;

export const WorkTitleInput = styled.textarea`
	width: 100%;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	resize: none;
	border: none;
`;

export const WorkDescriptionInput = styled.textarea`
	width: 100%;
	height: 200px;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	resize: none;
	border: none;
`;

export const UploadSaveButton = styled(FormConfirmButton)`
	margin: 2.5% 0 5% 0;
`;

import styled from "styled-components";
import { FormConfirmButton } from "@components/shared/form-buttons/styled";
import { AlertFailMessage } from "@components/shared/alert-messages/styled";
import ArrowDownIcon from "@assets/images/mypage/arrow_down_icon.svg";

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
		margin: 0 0 7% 0;
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
		margin: 0 0 4% 0;
		width: 100%;
		font-family: var(--font-nanum-bold);
	}
`;

export const UploadInputTitle = styled.p`
	font-size: 1rem;
	margin: 0 0 4% 0;
	width: 100%;
	font-family: var(--font-nanum-bold);
`;

export const UploadGuide = styled.p`
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	margin: 0 0 4% 0;
	width: 100%;
`;

export const FillBlankInstructions = styled(AlertFailMessage)`
	display: inline-block;
	flex: 0;
	font-size: 0.75rem;
	padding: 1.3% 3.9%;
	margin: 0 0 2% 0;
`;

export const UploadImageBox = styled.button`
	width: 100%;
	padding: 0;
	text-align: center;
	font-size: 2rem;
	background-color: #d8d8d8;
	position: relative;

	&:after {
		content: "";
		display: block;
		padding-bottom: 100%;
	}

	& > img {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
`;

export const RemoveUploadedImageButton = styled.button`
	position: absolute;
	top: -10px;
	right: -10px;
	background-color: white;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	padding: 0;
`;

export const UploadWorkInput = styled.input`
	width: 100%;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	resize: none;
	border: none;

	&::placeholder {
		color: #b9b9b9;
	}
`;

export const UploadWorkTextArea = styled.textarea`
	width: 100%;
	height: 272px;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
	resize: none;
	border: none;

	&::placeholder {
		color: #b9b9b9;
	}
`;

export const RepresentativeTag = styled.span`
	position: absolute;
	top: 5px;
	left: 4px;
	width: 25px;
	height: 16px;
	border: 0.2px solid #fff16f;
	border-radius: 4px;
	background-color: #f9e002;
	color: white;
	font-size: 0.5rem;
	line-height: 16px;
	text-align: center;
	font-family: var(--font-nanum-bold);
`;

export const WorkSelectInput = styled.select`
	width: 100%;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	resize: none;
	border: none;
	appearance: none;
	position: relative;
	cursor: pointer;
	background-image: url(${ArrowDownIcon});
	background-repeat: no-repeat;
	background-position: right 4% center;
`;

import React from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ArrowBackIcon from "@assets/images/mypage/arrow_back_icon.svg";
import { useSelector } from "react-redux";
import { selectUI } from "@stores/store";

export const SubHeaderContainer = styled.header`
	position: sticky;
	top: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: white;
	padding: 2.8% 16px 2.8% 21px;
	border-bottom: 0.2px solid #868585;
	z-index: 5;

	& > button {
		&:first-child {
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: transparent;
			padding: 0;
		}
		&:not(:first-child) {
			color: white;
			background-color: var(--color-blue);
			font-size: 0.875rem;
			padding: 7px 13px;
			border-radius: 4px;
		}
	}
`;

const SubHeader = () => {
	const { buttonName, buttonType, clickFn } = useSelector(selectUI);

	const history = useHistory();

	const backToPrevPage = () => {
		history.goBack();
	};

	return (
		<SubHeaderContainer>
			<button type="button" onClick={backToPrevPage}>
				<img src={ArrowBackIcon} alt="돌아가기" />
			</button>
			{buttonName !== "" && (
				<button type={buttonType} onClick={clickFn}>
					{buttonName}
				</button>
			)}
		</SubHeaderContainer>
	);
};

export default SubHeader;

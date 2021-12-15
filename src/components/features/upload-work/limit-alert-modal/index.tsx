import React from "react";
import styled from "styled-components";

const RemoveAlertConatiner = styled.div`
	width: 100%;
	padding: 9.5% 8% 7.5% 8%;
	display: flex;
	flex-direction: column;

	& > p {
		color: var(--color-darker-gray);
		font-size: 0.875rem;
		margin: 0 0 10% 0;
	}
`;

const ConfirmButton = styled.button`
	background-color: transparent;
	color: var(--color-blue);
	font-size: 0.875rem;
`;

type Props = {
	setShowImageLimitModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadLimitAlertModal = ({ setShowImageLimitModal }: Props) => {
	return (
		<RemoveAlertConatiner>
			<p>작품 내용 이미지는 최대 10개만 첨부할 수 있어요</p>
			<ConfirmButton onClick={() => setShowImageLimitModal(false)}>확인</ConfirmButton>
		</RemoveAlertConatiner>
	);
};

export default UploadLimitAlertModal;

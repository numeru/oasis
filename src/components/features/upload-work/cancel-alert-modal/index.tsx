import React from "react";
import styled from "styled-components";

const UploadAlertConatiner = styled.div`
	width: 100%;
	padding: 9.5% 7% 7.5% 7%;

	& > p {
		color: var(--color-darker-gray);
		&:nth-child(1) {
			font-size: 0.875rem;
			margin: 0 0 5% 0;
			font-family: var(--font-nanum-bold);
		}

		&:nth-child(2) {
			font-size: 0.75rem;
			margin: 0 0 10% 0;
		}
	}
`;

const AlertButtonList = styled.ul`
	display: flex;
	align-items: center;
	justify-content: center;

	& > li {
		&:nth-child(1) {
			margin-right: 6%;
			& > button {
				color: var(--color-blue);
			}
		}

		&:nth-child(2) {
			margin-left: 6%;
			& > button {
				color: var(--color-darker-gray);
			}
		}

		& > button {
			background-color: transparent;
			font-size: 0.875rem;
			font-family: var(--font-nanum-bold);
		}
	}
`;

type Props = {
	setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
	setLeavePage: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadCancelAlertModal = ({ setShowAlertModal, setLeavePage }: Props) => {
	return (
		<UploadAlertConatiner>
			<p>정말로 페이지를 나가시겠어요?</p>
			<p>지금 아트로그로 돌아가면 작성 중인 내용이 사라져요</p>
			<AlertButtonList>
				<li>
					<button onClick={() => setShowAlertModal(false)}>남아있기</button>
				</li>
				<li>
					<button onClick={() => setLeavePage(true)}>나가기</button>
				</li>
			</AlertButtonList>
		</UploadAlertConatiner>
	);
};

export default UploadCancelAlertModal;

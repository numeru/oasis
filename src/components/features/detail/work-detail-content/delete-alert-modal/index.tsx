import React from "react";
import styled from "styled-components";
import WorkService from "@apis/work/work-service";
import { useDispatch } from "react-redux";
import { responseErrorWarning, throwTokenError } from "@stores/slices/user-slice";
import { useHistory } from "react-router";
import { TOKEN_ERROR } from "@apis/errors";

const DeleteWorkAlertConatiner = styled.div`
	width: 100%;
	padding: 9.5% 7% 7.5% 7%;

	& > p {
		color: var(--color-darker-gray);
		&:nth-child(1) {
			font-size: 0.875rem;
			margin: 0 0 5% 0;
			font-family: var(--font-nanum-bold);
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
				color: var(--color-darker-gray);
			}
		}

		&:nth-child(2) {
			margin-left: 6%;
			& > button {
				color: var(--color-blue);
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
	workId: string;
	setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	workService: WorkService;
};

const DeleteWorkAlertModal = ({ workId, setShowDeleteModal, workService }: Props) => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleCloseDeleteModal = () => {
		setShowDeleteModal(false);
	};

	const handleDeleteWork = async () => {
		try {
			const {
				statusCode,
				data: { message },
			} = await workService.deleteWork(workId);

			if (statusCode >= 400) {
				dispatch(responseErrorWarning(message || "잠시 후 다시 시도해주세요"));
				return;
			}

			if (statusCode === 200) {
				history.replace("/mypage");
			}
		} catch (error: any) {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
			dispatch(responseErrorWarning("잠시 후 다시 시도해주세요"));
		}
	};
	return (
		<DeleteWorkAlertConatiner>
			<p>이 작업물을 삭제할까요?</p>
			<AlertButtonList>
				<li>
					<button type="button" onClick={handleCloseDeleteModal}>
						취소
					</button>
				</li>
				<li>
					<button type="button" onClick={handleDeleteWork}>
						확인
					</button>
				</li>
			</AlertButtonList>
		</DeleteWorkAlertConatiner>
	);
};

export default DeleteWorkAlertModal;

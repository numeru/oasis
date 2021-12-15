import React from "react";
import styled from "styled-components";
import { WorkImage, UserUploadFile } from "@utils/types";

const DeleteImageAlertConatiner = styled.div`
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
	workImageToBeDeleted: number | null;
	setWorkImageToBeDeleted: React.Dispatch<React.SetStateAction<number | null>>;
	setCoverImageToBeDeleted: React.Dispatch<React.SetStateAction<boolean>>;
	setWorkImages: React.Dispatch<React.SetStateAction<WorkImage[]>>;
	setCoverImage: React.Dispatch<React.SetStateAction<UserUploadFile | null>>;
};

const DeleteImageAlertModal = ({
	workImageToBeDeleted,
	setWorkImageToBeDeleted,
	setCoverImageToBeDeleted,
	setWorkImages,
	setCoverImage,
}: Props) => {
	const deleteClickedImage = () => {
		if (workImageToBeDeleted !== null) {
			setWorkImages((prev) => prev.filter((img) => img.id !== workImageToBeDeleted));
			setWorkImageToBeDeleted(null);
		} else {
			setCoverImage(null);
			setCoverImageToBeDeleted(false);
		}
	};

	const cancelToRemoveImages = () => {
		setWorkImageToBeDeleted(null);
		setCoverImageToBeDeleted(false);
	};

	return (
		<DeleteImageAlertConatiner>
			<p>이미지를 삭제할까요?</p>
			<AlertButtonList>
				<li>
					<button type="button" onClick={cancelToRemoveImages}>
						취소
					</button>
				</li>
				<li>
					<button type="button" onClick={deleteClickedImage}>
						확인
					</button>
				</li>
			</AlertButtonList>
		</DeleteImageAlertConatiner>
	);
};

export default DeleteImageAlertModal;

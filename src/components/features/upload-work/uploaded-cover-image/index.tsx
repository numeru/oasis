import React from "react";
import { UserUploadFile } from "@utils/types";
import styled from "styled-components";
import { RemoveUploadedImageButton, UploadImageBox } from "../upload-work-form/styled";

export const CoverImage = styled.img`
	width: 100%;
	height: auto;
`;

type Props = {
	coverImage: UserUploadFile | null;
	clickRemoveButton: (type: "cover" | "work", id?: number | undefined) => void;
	clickCoverImageInput: () => void;
};

const UploadedCoverImage = ({ coverImage, clickRemoveButton, clickCoverImageInput }: Props) => {
	return (
		<>
			{coverImage ? (
				<>
					<RemoveUploadedImageButton
						type="button"
						onClick={() => clickRemoveButton("cover")}
						aria-label="업로드 한 작업물 커버 이미지 삭제하기"
					>
						삭제하기
					</RemoveUploadedImageButton>
					<CoverImage
						src={coverImage.thumbnail}
						alt="업로드 한 작업물 커버 이미지 미리보기"
						onClick={clickCoverImageInput}
					/>
				</>
			) : (
				<UploadImageBox type="button" onClick={clickCoverImageInput} aria-label="작업물 커버 이미지 추가">
					커버 이미지 추가
				</UploadImageBox>
			)}
		</>
	);
};

export default UploadedCoverImage;

import React from "react";
import { WorkImage } from "@utils/types";
import styled from "styled-components";
import { RemoveUploadedImageButton, UploadImageBox } from "../upload-work-form/styled";
export const WorkImages = styled.ul`
	width: 100%;

	& > li {
		width: 100%;

		&:last-child {
			margin-bottom: 15%;
		}

		& > img {
			width: 100%;
			height: auto;
			box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
		}
	}
`;

type Props = {
	workImages: WorkImage[];
	clickRemoveButton: (type: "cover" | "work", id?: number | undefined) => void;
	clickWorkImageInput: () => void;
};

const UploadedWorkImages = ({ workImages, clickRemoveButton, clickWorkImageInput }: Props) => {
	return (
		<>
			{workImages.length === 0 ? (
				<UploadImageBox type="button" onClick={clickWorkImageInput} aria-label="작업물 상세 이미지 추가">
					이미지 추가
				</UploadImageBox>
			) : (
				<>
					<WorkImages>
						{workImages.map((img) => (
							<li key={img.id}>
								<img src={img.thumbnail} alt="업로드 한 작업물 상세 이미지 미리보기" />
								<RemoveUploadedImageButton
									type="button"
									onClick={() => clickRemoveButton("work", img.id)}
									aria-label="업로드 한 작품 상세 이미지 삭제하기"
								>
									삭제하기
								</RemoveUploadedImageButton>
							</li>
						))}
					</WorkImages>
					<UploadImageBox type="button" onClick={clickWorkImageInput} aria-label="작업물 상세 이미지 추가">
						이미지 추가
					</UploadImageBox>
				</>
			)}
		</>
	);
};

export default UploadedWorkImages;

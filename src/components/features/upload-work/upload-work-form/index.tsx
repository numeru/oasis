import React, { useEffect, useState } from "react";
import { InvisibleFileInput } from "@components/shared/invisible-file-input/styled";
import { CountLetters } from "@components/shared/count-letters/styled";
import useInput from "@hooks/useInput";
import useTextLimit from "@hooks/useTextLimit";
import { FormCancelButton } from "@components/shared/form-buttons/styled";
import WorkCategories from "@components/shared/work-categories";
import { DESCRIPTION_LETTERS_LIMIT, INTRODUCTION_LETTERS_LIMIT, TITLE_LETTERS_LIMIT } from "@constants/letters";
import {
	FillBlankInstructions,
	UploadForm,
	UploadGuide,
	UploadInputField,
	UploadInputTitle,
	UploadSaveButton,
	WorkDescriptionInput,
	WorkTitleInput,
} from "./styled";
import useUploadWorkForm from "@hooks/useUploadWorkForm";
import useUploadWorkImages from "@hooks/useUploadWorkImages";
import UploadedCoverImage from "@components/features/upload-work/uploaded-cover-image";
import UploadedWorkImages from "@components/features/upload-work/uploaded-work-images";
import ConfirmModal from "@components/shared/confirm-modal";
import AlertModal from "@components/shared/alert-modal";

type Props = {
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadWorkForm = ({ setIsEdited }: Props) => {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [title, handleTitle, setTitle] = useInput("");
	const [description, handleDescription, setDescription] = useInput("");

	const numberOfTitleLetters = useTextLimit(title, setTitle, TITLE_LETTERS_LIMIT);
	const numberOfDescriptionLetters = useTextLimit(description, setDescription, DESCRIPTION_LETTERS_LIMIT);

	const [
		coverImage,
		workImages,
		numberOfWorkImages,
		coverImageRef,
		workImagesRef,
		uploadCoverImage,
		uploadWorkImages,
		workImageToBeDeleted,
		coverImageToBeDeleted,
		clickRemoveButton,
		deleteClickedImage,
		cancelToRemoveImages,
	] = useUploadWorkImages();

	useEffect(() => {
		setIsEdited(
			selectedCategory !== "" ||
				numberOfTitleLetters > 0 ||
				numberOfDescriptionLetters > 0 ||
				workImages.length > 0 ||
				coverImage !== null,
		);
	}, [selectedCategory, numberOfTitleLetters, numberOfDescriptionLetters, workImages, coverImage]);

	const [showImageLimitModal, setShowImageLimitModal] = useState(false);

	const handleClickConfirmButton = () => {
		setShowImageLimitModal(false);
	};

	const [blankInputs, isFormSubmitted, submitUploadWorkForm] = useUploadWorkForm(
		{ selectedCategory, coverImage, title, description, workImages },
		setIsEdited,
	);

	const clickCoverImageInput = () => {
		coverImageRef.current?.click();
	};

	const clickWorkImageInput = () => {
		if (workImages.length >= 10) {
			setShowImageLimitModal(true);
			return;
		}
		workImagesRef.current?.click();
	};

	return (
		<>
			<UploadForm onSubmit={submitUploadWorkForm}>
				<h2>새 작업물 등록</h2>

				<ul>
					<UploadInputField>
						<UploadInputTitle>카테고리</UploadInputTitle>
						{blankInputs.selectedCategory && (
							<FillBlankInstructions role="alert">카테고리를 1개 선택해주세요</FillBlankInstructions>
						)}
						<UploadGuide>작업물에 해당하는 카테고리를 1개 선택해주세요</UploadGuide>
						<WorkCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_cover_image">커버 이미지</label>
						{blankInputs.coverImage && (
							<FillBlankInstructions id="upload_cover_error_message" role="alert">
								커버 이미지를 추가해주세요
							</FillBlankInstructions>
						)}
						<UploadGuide id="cover_image_input_description">파일은 jpg, jpeg, png 형식만 가능해요</UploadGuide>
						<InvisibleFileInput
							type="file"
							id="upload_cover_image"
							accept="image/jpg, image/jpeg, image/png"
							ref={coverImageRef}
							onChange={uploadCoverImage}
							aria-required="true"
							aria-describedby="cover_image_input_description"
							aria-invalid={isFormSubmitted && blankInputs.coverImage}
							aria-errormessage="upload_cover_error_message"
						/>
						<UploadedCoverImage
							coverImage={coverImage}
							clickRemoveButton={clickRemoveButton}
							clickCoverImageInput={clickCoverImageInput}
						/>
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_title">제목</label>
						{blankInputs.title && (
							<FillBlankInstructions id="upload_title_error_message" role="alert">
								제목을 입력해주세요
							</FillBlankInstructions>
						)}
						<CountLetters>
							{numberOfTitleLetters} / {TITLE_LETTERS_LIMIT}
						</CountLetters>
						<WorkTitleInput
							id="upload_title"
							placeholder={`${TITLE_LETTERS_LIMIT}글자 이내로 입력해주세요`}
							value={title}
							onChange={handleTitle}
							aria-required="true"
							aria-invalid={isFormSubmitted && blankInputs.title}
							aria-errormessage="upload_title_error_message"
						/>
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_description">작품 소개</label>
						{blankInputs.description && (
							<FillBlankInstructions id="upload_description_error_message" role="alert">
								작품 소개를 입력해주세요
							</FillBlankInstructions>
						)}
						<CountLetters>
							{numberOfDescriptionLetters} / {INTRODUCTION_LETTERS_LIMIT}
						</CountLetters>
						<WorkDescriptionInput
							id="upload_description"
							placeholder={`사람들에게 소개하고 싶은 작품의 하이라이트를 설명해주세요
최대 ${INTRODUCTION_LETTERS_LIMIT}글자까지 가능해요`}
							value={description}
							onChange={handleDescription}
							aria-required="true"
							aria-invalid={isFormSubmitted && blankInputs.description}
							aria-errormessage="upload_description_error_message"
						/>
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_work_image">작품 내용</label>
						{blankInputs.workImages && (
							<FillBlankInstructions id="upload_work_images_error_message" role="alert">
								작품 내용 이미지를 1장 이상 추가해주세요
							</FillBlankInstructions>
						)}

						<UploadGuide id="work_images_input_description">
							파일은 jpg, jpeg, png 형식만 가능해요
							<br />한 번에 1개 씩, 최대 10개 파일을 추가할 수 있어요
						</UploadGuide>
						<CountLetters>{numberOfWorkImages} / 10</CountLetters>
						<InvisibleFileInput
							type="file"
							id="upload_work_image"
							accept="image/jpg, image/jpeg, image/png"
							ref={workImagesRef}
							onChange={uploadWorkImages}
							aria-required="true"
							aria-describedby="work_images_input_description"
							aria-invalid={isFormSubmitted && blankInputs.workImages}
							aria-errormessage="upload_work_images_error_message"
						/>
						<UploadedWorkImages
							workImages={workImages}
							clickRemoveButton={clickRemoveButton}
							clickWorkImageInput={clickWorkImageInput}
						/>
					</UploadInputField>
				</ul>

				<UploadSaveButton type="submit">저장하기</UploadSaveButton>

				<FormCancelButton to="/mypage">돌아가기</FormCancelButton>
			</UploadForm>

			{(workImageToBeDeleted !== null || coverImageToBeDeleted) && (
				<AlertModal
					content="이미지를 삭제할까요?"
					confirmName="확인"
					cancelName="취소"
					onConfirm={deleteClickedImage}
					onCancel={cancelToRemoveImages}
				/>
			)}
			{showImageLimitModal && (
				<ConfirmModal content="작품 내용 이미지는 최대 10개만 첨부할 수 있어요" onConfirm={handleClickConfirmButton} />
			)}
		</>
	);
};

export default UploadWorkForm;

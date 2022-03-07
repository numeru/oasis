import React, { useState } from "react";
import { InvisibleFileInput } from "@components/shared/invisible-file-input/styled";
import useInput from "@hooks/useInput";
import WorkCategories from "@components/shared/work-categories";
import {
	FillBlankInstructions,
	UploadForm,
	UploadGuide,
	UploadInputField,
	UploadInputTitle,
	WorkSelectInput,
	UploadWorkTextArea,
	UploadWorkInput,
} from "./styled";
import useUploadWorkForm from "@hooks/useUploadWorkForm";
import useUploadWorkImages from "@hooks/useUploadWorkImages";
import UploadedWorkImages from "@components/features/upload-work/uploaded-work-images";
import ConfirmModal from "@components/shared/confirm-modal";
import AlertModal from "@components/shared/alert-modal";
import useChangeHeader from "@hooks/useChangeHeader";

type Props = {
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
};

const UploadWorkForm = ({ setIsEdited }: Props) => {
	const [selectedCategory, setSelectedCategory] = useState("");
	const [title, handleTitle] = useInput("");
	const [description, handleDescription] = useInput("");
	const [tags, handleTags] = useInput("");
	const [friends, handleFriends] = useInput("");
	const [copyright, handleCopyright] = useInput("저작자표시");

	const [
		workImages,
		workImagesRef,
		uploadWorkImages,
		workImageToBeDeleted,
		clickRemoveButton,
		deleteClickedImage,
		cancelToRemoveImages,
		changeImageRef,
		changeUploadedWorkImage,
		clickChangeImageButton,
	] = useUploadWorkImages();

	const [showImageLimitModal, setShowImageLimitModal] = useState(false);

	const handleClickConfirmButton = () => {
		setShowImageLimitModal(false);
	};

	const [blankInputs, isFormSubmitted, submitUploadWorkForm] = useUploadWorkForm(
		{ selectedCategory, title, description, workImages, tags },
		setIsEdited,
	);

	useChangeHeader({
		headerType: "sub",
		buttonName: "저장",
		buttonType: "submit",
		clickFn: submitUploadWorkForm,
	});

	const clickUploadedWorkImage = (idx: number) => {
		clickChangeImageButton(idx);

		changeImageRef.current?.click();
	};

	const clickWorkImageInput = () => {
		workImagesRef.current?.click();
	};

	return (
		<>
			<UploadForm onSubmit={submitUploadWorkForm}>
				<h2>새 포트폴리오 등록</h2>

				<ul>
					<UploadInputField>
						<label htmlFor="upload_work_images">작업*</label>
						{blankInputs.workImages && (
							<FillBlankInstructions id="upload_works_error_message" role="alert">
								이미지를 등록해주세요
							</FillBlankInstructions>
						)}
						<UploadGuide id="work_images_input_description">사람들에게 보여줄 이미지를 등록해주세요</UploadGuide>
						<InvisibleFileInput
							type="file"
							id="upload_work_images"
							accept="image/jpg, image/jpeg, image/png"
							multiple
							ref={workImagesRef}
							onChange={uploadWorkImages}
							aria-required="true"
							aria-invalid={isFormSubmitted && blankInputs.workImages}
							aria-errormessage="upload_work_images_error_message"
						/>
						<InvisibleFileInput
							type="file"
							accept="image/jpg, image/jpeg, image/png"
							ref={changeImageRef}
							onChange={changeUploadedWorkImage}
						/>
						<UploadedWorkImages
							workImages={workImages}
							clickRemoveButton={clickRemoveButton}
							clickWorkImageInput={clickWorkImageInput}
							clickUploadedWorkImage={clickUploadedWorkImage}
						/>
					</UploadInputField>

					<UploadInputField>
						<UploadInputTitle>카테고리*</UploadInputTitle>
						{blankInputs.selectedCategory && (
							<FillBlankInstructions role="alert">카테고리를 1개 선택해주세요</FillBlankInstructions>
						)}
						<WorkCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_title">제목*</label>
						{blankInputs.title && (
							<FillBlankInstructions id="upload_title_error_message" role="alert">
								제목을 입력해주세요
							</FillBlankInstructions>
						)}
						<UploadWorkInput
							id="upload_title"
							placeholder="제목을 입력해주세요"
							value={title}
							onChange={handleTitle}
							aria-required="true"
							aria-invalid={isFormSubmitted && blankInputs.title}
							aria-errormessage="upload_title_error_message"
						/>
					</UploadInputField>

					<UploadInputField>
						<label htmlFor="upload_description">소개*</label>
						{blankInputs.description && (
							<FillBlankInstructions id="upload_description_error_message" role="alert">
								소개를 입력해주세요
							</FillBlankInstructions>
						)}
						<UploadWorkTextArea
							id="upload_description"
							placeholder="설명 또는 링크를 입력해주세요"
							value={description}
							onChange={handleDescription}
							aria-required="true"
							aria-invalid={isFormSubmitted && blankInputs.description}
							aria-errormessage="upload_description_error_message"
						/>
					</UploadInputField>
				</ul>

				<UploadInputField>
					<label htmlFor="upload_tag">태그*</label>
					{blankInputs.tags && (
						<FillBlankInstructions id="upload_tag_error_message" role="alert">
							태그를 입력해주세요
						</FillBlankInstructions>
					)}
					<UploadWorkInput
						id="upload_tag"
						placeholder="# 태그를 입력해주세요"
						value={tags}
						onChange={handleTags}
						aria-required="true"
						aria-invalid={isFormSubmitted && blankInputs.tags}
						aria-errormessage="upload_tag_error_message"
					/>
				</UploadInputField>

				<UploadInputField>
					<label htmlFor="upload_friends">함께한 친구</label>
					<UploadWorkInput
						id="upload_friends"
						placeholder="함께한 친구가 있다면 멘션해주세요"
						value={friends}
						onChange={handleFriends}
					/>
				</UploadInputField>

				<UploadInputField>
					<label htmlFor="upload_copyright">저작권</label>
					<WorkSelectInput name="copyright" id="upload_copyright" value={copyright} onChange={handleCopyright}>
						<option value="저작자표시">저작자표시</option>
						<option value="저작자표시-비영리">저작자표시-비영리</option>
						<option value="저작자표시-변경금지">저작자표시-변경금지</option>
						<option value="저작자표시-동일조건변경허락">저작자표시-동일조건변경허락</option>
						<option value="저작자표시-비영리-동일조건변경허락">저작자표시-비영리-동일조건변경허락</option>
						<option value="저작자표시-비영리-변경금지">저작자표시-비영리-변경금지</option>
						<option value="저작자표시 안 함">저작자표시 안 함</option>
					</WorkSelectInput>
				</UploadInputField>
			</UploadForm>

			{workImageToBeDeleted !== null && (
				<AlertModal
					content="이미지를 삭제할까요?"
					confirmName="확인"
					cancelName="취소"
					onConfirm={deleteClickedImage}
					onCancel={cancelToRemoveImages}
				/>
			)}
			{showImageLimitModal && (
				<ConfirmModal content="작품 이미지는 최대 10MB 까지만 첨부할 수 있어요" onConfirm={handleClickConfirmButton} />
			)}
		</>
	);
};

export default UploadWorkForm;

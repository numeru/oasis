import React, { useEffect, useMemo, useRef, useState } from "react";
import UserProfileBlank from "assets/images/mypage/user_profile_blank.svg";
import useInput from "hooks/useInput";
import {
	ChangeImageButton,
	UserIntroductionInput,
	EditProfileContainer,
	UploadedProfileImage,
	SaveProfileButton,
} from "./styled";
import useTextLimit from "hooks/useTextLimit";
import { FormCancelButton } from "components/shared/form-buttons/styled";
import { CountLetters } from "components/shared/count-letters/styled";
import { InvisibleFileInput } from "components/shared/invisible-file-input/styled";
import { useSelector } from "react-redux";
import { selectUser } from "stores/store";
import { UserUploadFile } from "utils/types";
import { INTRODUCTION_LETTERS_LIMIT } from "constants/letters";
import useUploadProfile from "components/features/edit-profile/edit-profile-form/useUploadProfile";
import { imageTypeFormatter } from "utils/formatter";

type Props = {
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
	isFormSubmitted: boolean;
};

const EditProfileForm = ({ setIsEdited, isFormSubmitted }: Props) => {
	const userSelector = useSelector(selectUser);
	const { profileImgPath, profileDescription } = userSelector;

	const [profileImage, setProfileImage] = useState<UserUploadFile | null>(null);

	const [userIntroduction, handleUserIntroduction, setUserIntroduction] = useInput(profileDescription || "");

	const numberOfIntroduction = useTextLimit(userIntroduction, setUserIntroduction, INTRODUCTION_LETTERS_LIMIT);

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleClickFileInput = () => {
		fileInputRef.current?.click();
	};

	useEffect(() => {
		setIsEdited((profileImage !== null || numberOfIntroduction > 0) && profileDescription !== userIntroduction);
	}, [profileImage, numberOfIntroduction]);

	const uploadProfileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;

		if (fileList && fileList[0]) {
			const url = URL.createObjectURL(fileList[0]);

			setProfileImage({
				file: fileList[0],
				thumbnail: url,
				type: imageTypeFormatter(fileList[0].type),
			});
		}
	};

	const showProfileImage = useMemo(() => {
		if (!profileImage && !profileImgPath) {
			return <img src={UserProfileBlank} alt="" onClick={handleClickFileInput} />;
		}
		return (
			<UploadedProfileImage src={profileImage?.thumbnail || profileImgPath} alt="" onClick={handleClickFileInput} />
		);
	}, [profileImage]);

	const handleUploadProfile = useUploadProfile(userIntroduction, profileImage, setIsEdited);

	useEffect(() => {
		if (isFormSubmitted) {
			handleUploadProfile();
		}
	}, [isFormSubmitted]);

	const submitProfileEditForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		handleUploadProfile();
	};

	return (
		<EditProfileContainer onSubmit={submitProfileEditForm}>
			<h2>프로필 편집</h2>
			{showProfileImage}
			<InvisibleFileInput
				type="file"
				accept="image/jpg, image/jpeg, image/png"
				ref={fileInputRef}
				onChange={uploadProfileImage}
			/>
			<ChangeImageButton type="button" onClick={handleClickFileInput}>
				프로필 사진 변경
			</ChangeImageButton>

			<label htmlFor="edit_profile_introduction" className="a11y-hidden">
				프로필 소개 변경
			</label>
			<CountLetters>
				{numberOfIntroduction} / {INTRODUCTION_LETTERS_LIMIT}자
			</CountLetters>
			<UserIntroductionInput
				id="edit_profile_introduction"
				onChange={handleUserIntroduction}
				value={userIntroduction}
				placeholder={userIntroduction || "여러분을 가장 잘 나타낼 수 있는 소개를 작성해보세요"}
			/>

			<SaveProfileButton type="submit">저장하기</SaveProfileButton>
			<FormCancelButton to="/mypage">돌아가기</FormCancelButton>
		</EditProfileContainer>
	);
};

export default EditProfileForm;

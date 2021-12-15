import React, { useEffect, useMemo, useRef, useState } from "react";
import UserProfileBlank from "@assets/images/mypage/user_profile_blank.svg";
import useInput from "@hooks/useInput";
import { useHistory } from "react-router";
import {
	ChangeImageButton,
	UserIntroductionInput,
	EditProfileContainer,
	UploadedProfileImage,
	SaveProfileButton,
} from "./styled";
import useTextLimit from "@hooks/useTextLimit";
import { FormCancelButton } from "@components/shared/form-buttons/styled";
import { CountLetters } from "@components/shared/count-letters/styled";
import { InvisibleFileInput } from "@components/shared/invisible-file-input/styled";
import UserService from "@apis/user/user-service";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStart, responseErrorWarning, responseSuccessGuide, throwTokenError } from "@stores/slices/user-slice";
import { TOKEN_ERROR } from "@apis/errors";
import { selectUser } from "@stores/store";
import { UserUploadFile } from "@utils/types";

type Props = {
	userService: UserService;
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
	isFormSubmitted: boolean;
};

const EditProfileForm = ({ userService, setIsEdited, isFormSubmitted }: Props) => {
	const userSelector = useSelector(selectUser);
	const { profileImgPath, profileDescription } = userSelector;

	const history = useHistory();

	const [profileImage, setProfileImage] = useState<UserUploadFile | null>(null);

	const [userIntroduction, handleUserIntroduction, setUserIntroduction] = useInput(profileDescription || "");

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleClickFileInput = () => {
		fileInputRef.current?.click();
	};

	const numberOfIntroduction = useTextLimit(userIntroduction, setUserIntroduction, 500);

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
				type: fileList[0].type.slice(0, 5),
			});
		}
	};

	const showProfileImage = useMemo(() => {
		if (!profileImage && !profileImgPath) {
			return <img src={UserProfileBlank} alt="user_profile" onClick={handleClickFileInput} />;
		}
		return (
			<UploadedProfileImage
				src={profileImage?.thumbnail || profileImgPath}
				alt="user_profile"
				onClick={handleClickFileInput}
			/>
		);
	}, [profileImage]);

	const dispatch = useDispatch();

	const handleUploadProfile = async () => {
		const data = {
			profileDescription: userIntroduction,
			profileFile: profileImage?.file,
		};

		try {
			const {
				statusCode,
				data: { message },
			} = await userService.uploadProfile(data);

			if (statusCode >= 400) {
				dispatch(responseErrorWarning(message || "잠시 후 다시 시도해주세요"));
				return;
			}

			if (statusCode === 200) {
				setIsEdited(false);

				dispatch(checkUserStart());
				dispatch(responseSuccessGuide("프로필을 변경했어요!"));

				history.push("/mypage");
			}
		} catch (error: any) {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
			dispatch(responseErrorWarning("잠시 후 다시 시도해주세요"));
		}
	};

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

			<CountLetters>{numberOfIntroduction} / 500자</CountLetters>
			<UserIntroductionInput
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

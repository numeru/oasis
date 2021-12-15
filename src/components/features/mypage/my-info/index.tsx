import React, { useMemo } from "react";
import UserProfileBlank from "@assets/images/mypage/user_profile_blank.svg";
import { MdEdit } from "react-icons/md";
import {
	LikeImage,
	MyLikes,
	PersonalInfo,
	ProfileEditButton,
	UserImageBlank,
	UserImageWrapper,
	UserInfoContainer,
	UserIntroduction,
	UserLikeInfo,
	UserProfile,
} from "./styled";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";
import useImageSize from "@hooks/useImageSize";

const MyInfo = () => {
	const userSelector = useSelector(selectUser);
	const {
		userName,
		universityName,
		universityMajor,
		universityVerify,
		heartCount,
		profileDescription,
		profileImgPath,
	} = userSelector;

	const checkUniversity = useMemo(
		() => universityVerify === "VERIFICATION",

		[universityVerify],
	);

	const imageRatio = useImageSize(profileImgPath);

	return (
		<UserInfoContainer>
			<UserProfile>
				<UserImageWrapper>
					<UserImageBlank src={profileImgPath || UserProfileBlank} alt="user_profile" $imageRatio={imageRatio} />
				</UserImageWrapper>

				<PersonalInfo $checkUniversity={checkUniversity}>
					<p>{userName}</p>
					<p>{checkUniversity ? `${universityName} ${universityMajor}` : "대학교 미인증"}</p>
					<UserLikeInfo>
						<span>
							<LikeImage /> <span>{heartCount}</span>
						</span>

						<MyLikes to="/mypage/likes">내가 하트 준 계정</MyLikes>
					</UserLikeInfo>
				</PersonalInfo>
			</UserProfile>
			<UserIntroduction>{profileDescription || "여러분을 가장 잘 나타낼 수 있는 소개를 작성해보세요"}</UserIntroduction>

			<ProfileEditButton to="/mypage/edit-profile">
				<MdEdit />
				프로필 편집
			</ProfileEditButton>
		</UserInfoContainer>
	);
};

export default MyInfo;

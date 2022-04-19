import React from "react";
import UserProfileBlank from "assets/images/mypage/user_profile_blank.svg";
import {
	PersonalInfo,
	UserImageWrapper,
	UserImageBlank,
	UserInfoContainer,
	UserProfile,
} from "components/features/mypage/my-info/styled";
import styled from "styled-components";
import LikeButton from "components/shared/like-button";
import useImageSize from "hooks/useImageSize";
import useGetUserInfo from "components/features/user/user-info/useGetUserInfo";

const UserIntroduction = styled.p`
	width: 100%;
	margin: 0 0 12% 0;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
`;

type Props = {
	userId: string;
};

const UserInfo = ({ userId }: Props) => {
	const [profileData, isLikeClicked, handleClickHeartButton, isUniversityVerified] = useGetUserInfo(userId);

	const imageRatio = useImageSize(profileData?.profileImgPath);

	return (
		<UserInfoContainer aria-labelledby="user_info_label">
			<h2 id="user_info_label" className="a11y-hidden">
				유저 정보
			</h2>
			<UserProfile>
				<UserImageWrapper>
					<UserImageBlank src={profileData?.profileImgPath || UserProfileBlank} alt="" $imageRatio={imageRatio} />
				</UserImageWrapper>

				<PersonalInfo $isUniversityVerified={isUniversityVerified}>
					<p>{profileData?.userName}</p>
					<p>
						{isUniversityVerified ? `${profileData?.universityName} ${profileData?.universityMajor}` : "대학교 미인증"}
					</p>
					<LikeButton
						isLikeClicked={isLikeClicked}
						handleClickButton={handleClickHeartButton}
						heartCount={profileData?.heartCount}
					/>
				</PersonalInfo>
			</UserProfile>
			<UserIntroduction>
				{profileData?.profileDescription || "여러분을 가장 잘 나타낼 수 있는 소개를 작성해보세요"}
			</UserIntroduction>
		</UserInfoContainer>
	);
};

export default UserInfo;

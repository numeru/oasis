import React, { useEffect, useMemo, useState } from "react";
import UserProfileBlank from "@assets/images/mypage/user_profile_blank.svg";
import {
	PersonalInfo,
	UserImageWrapper,
	UserImageBlank,
	UserInfoContainer,
	UserProfile,
} from "@components/features/mypage/my-info/styled";
import styled from "styled-components";
import LikeButton from "@components/shared/like-button";
import useSWR from "swr";
import API_URL, { API_HOST } from "@apis/api";
import { profileFetcher } from "@utils/fetcher";
import UserService from "@apis/user/user-service";
import { useDispatch, useSelector } from "react-redux";
import { responseErrorWarning } from "@stores/slices/user-slice";
import { selectUser } from "@stores/store";
import useImageSize from "@hooks/useImageSize";

const UserIntroduction = styled.p`
	width: 100%;
	margin: 0 0 12% 0;
	padding: 4%;
	background-color: var(--color-dark-white);
	border-radius: 8px;
	font-size: 0.75rem;
	color: var(--color-dark-gray);
`;

export type Profile = {
	uuid: string;
	emailId: string;
	userName: string;
	universityName: string | null;
	universityMajor: string | null;
	universityVerify: string;
	profileImgPath: string;
	profileImgThumbnailPath: string;
	profileDescription: string;
	heartCount: number;
	hasHeart: boolean;
	ableUpdate: boolean;
};

type Props = {
	userId: string;
	userService: UserService;
};

const UserInfo = ({ userId, userService }: Props) => {
	const dispatch = useDispatch();

	const userSelector = useSelector(selectUser);
	const { isLogin } = userSelector;

	const {
		user: { basic, search },
	} = API_URL;

	const { data: profileData, mutate } = useSWR<Profile>(
		[`${API_HOST}${basic}/${userId}${search}`, isLogin],
		profileFetcher,
	);

	const [isLikeClicked, setIsLikeClicked] = useState(profileData?.hasHeart || false);

	useEffect(() => {
		if (profileData) {
			setIsLikeClicked(profileData.hasHeart);
		}
	}, [profileData]);

	const handleClickHeartButton = () => {
		if (!profileData) return;

		try {
			const { hasHeart, heartCount } = profileData;

			userService.toggleHeartCount(userId);
			setIsLikeClicked(!hasHeart);
			mutate(
				{
					...profileData,
					hasHeart: !hasHeart,
					heartCount: hasHeart === true ? heartCount - 1 : heartCount + 1,
				},
				false,
			);
		} catch (error) {
			dispatch(responseErrorWarning("잠시 후 다시 시도해주세요"));
		}
	};

	const checkUniversity = useMemo(
		() => profileData?.universityVerify === "VERIFICATION",

		[profileData],
	);

	const imageRatio = useImageSize(profileData?.profileImgPath);

	return (
		<UserInfoContainer>
			<UserProfile>
				<UserImageWrapper>
					<UserImageBlank
						src={profileData?.profileImgPath || UserProfileBlank}
						alt="user_profile"
						$imageRatio={imageRatio}
					/>
				</UserImageWrapper>

				<PersonalInfo $checkUniversity={checkUniversity}>
					<p>{profileData?.userName}</p>
					<p>{checkUniversity ? `${profileData?.universityName} ${profileData?.universityMajor}` : "대학교 미인증"}</p>
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

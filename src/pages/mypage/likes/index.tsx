import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import UserProfileBlank from "@assets/images/mypage/user_profile_blank.svg";
import useSWRInfinite from "swr/infinite";
import API_URL, { API_HOST } from "@apis/api";
import { Profile } from "@components/features/user/user-info";
import { usersFetcher } from "@utils/fetcher";
import { TOKEN_ERROR } from "@apis/errors";
import { useDispatch } from "react-redux";
import { throwTokenError } from "@stores/slices/user-slice";
import { Link } from "react-router-dom";

type StyeldProps = {
	$checkUniversity: boolean;
};

const MyLikes = styled.section`
	width: 100%;
	padding-bottom: 120%;
	& > h2 {
		font-size: 1.125rem;
		margin: 0 0 11% 0;
		font-family: var(--font-nanum-bold);
	}
	& > ul {
		width: 100%;
	}
`;

export const EmptyGuideBox = styled.div`
	background-color: var(--color-dark-white);
	border-radius: 8px;
	color: var(--color-dark-gray);
	width: 93%;
	margin: auto;
	text-align: center;
	padding: 5% 0;
	font-size: 0.813rem;
`;

const LikeUserInfo = styled(Link)`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 8%;

	& > img {
		margin-right: 10px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	& > p {
		font-size: 0.875rem;
		margin: 0;
		color: ${({ $checkUniversity }: StyeldProps) => ($checkUniversity ? "black" : "var(--color-dark-gray)")};
		line-height: 20px;
		font-family: var(--font-nanum-light);

		& > span {
			font-family: var(--font-nanum-bold);
			color: black;
		}
	}
`;

const Likes = () => {
	const {
		user: { heart },
	} = API_URL;

	const [allHeartUsersWorks, setAllHeartUsersWorks] = useState<Profile[]>([]);
	const limit = 10;

	const getKey = (index: number, previousPageData: Profile[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${heart}/search?page=${index + 1}&pageSize=${limit}`;
	};

	const { data: allHeartUsersWorksData, setSize } = useSWRInfinite(getKey, usersFetcher, {
		dedupingInterval: 3600,
		onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}

			if (retryCount >= 10) return;

			revalidate();
		},
	});

	const getAllHeartUsersWorks = () => {
		if (allHeartUsersWorksData) {
			setAllHeartUsersWorks(allHeartUsersWorksData.flat());
		}
	};

	useEffect(() => {
		getAllHeartUsersWorks();
	}, [allHeartUsersWorksData]);

	const isEmpty = useMemo(() => allHeartUsersWorksData?.[0]?.length === 0, [allHeartUsersWorksData]);
	const isReachingEnd = useMemo(
		() =>
			isEmpty ||
			(allHeartUsersWorksData && allHeartUsersWorksData[allHeartUsersWorksData.length - 1]?.length < limit) ||
			false,
		[isEmpty, allHeartUsersWorksData],
	);

	const handleClickMoreUsersButton = () => {
		if (!isReachingEnd) {
			setSize((prevSize) => prevSize + 1);
		}
	};

	const dispatch = useDispatch();

	return (
		<MyLikes>
			<h2>내가 하트 준 계정</h2>
			{allHeartUsersWorks.length !== 0 ? (
				<ul>
					{allHeartUsersWorks.map((user) => (
						<li key={user.emailId}>
							<LikeUserInfo to={`/user/${user.uuid}`} $checkUniversity={user.universityVerify === "VERIFICATION"}>
								<img src={user.profileImgPath || UserProfileBlank} alt="user_image" />
								<p>
									<span>{user.userName}</span>
									<br />
									{user.universityVerify === "VERIFICATION"
										? `${user.universityName} ${user.universityMajor}`
										: "대학교 미인증"}
								</p>
							</LikeUserInfo>
						</li>
					))}
				</ul>
			) : (
				<EmptyGuideBox>아직 하트 준 계정이 없어요</EmptyGuideBox>
			)}
		</MyLikes>
	);
};

export default Likes;

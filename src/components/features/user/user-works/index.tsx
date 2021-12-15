import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import UploadedWorkCard from "@components/shared/uploaded-work-card";
import API_URL, { API_HOST } from "@apis/api";
import useSWRInfinite from "swr/infinite";
import { feedFetcher } from "@utils/fetcher";
import { Feed } from "@utils/types";
import { EmptyGuideBox } from "@pages/mypage/likes";
type StyledProps = {
	works: number;
};

const WorksContainer = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: ${({ works }: StyledProps) => (works === 0 ? "48% 0 40% 0" : "4% 0")};
`;

const UploadedMyWorks = styled.ul`
	width: 100%;
	margin-bottom: 8%;

	& > li {
		width: 100%;

		&:not(:last-child) {
			margin-bottom: 5%;
		}
	}
`;

const WorksMoreButton = styled.button`
	display: block;
	margin: auto;
	border: 2px solid var(--color-dark-gray);
	background-color: transparent;
	width: 84%;
	font-size: 0.813rem;
	border-radius: 8px;
	color: var(--color-dark-gray);
	height: 40px;
	font-family: var(--font-nanum-black);
`;

type Props = {
	userId: string;
};

const UserWorks = ({ userId }: Props) => {
	const [allUserWorks, setAllUserWorks] = useState<Feed[]>([]);
	const limit = 10;

	const {
		user: { works },
	} = API_URL;

	const getKey = (index: number, previousPageData: Feed[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${works}/${userId}?category=ALL&page=${index + 1}&pageSize=${limit}`;
	};

	const { data: allUserWorksData, setSize } = useSWRInfinite(getKey, feedFetcher, {
		dedupingInterval: 3600,
	});

	const getAllUserWorks = () => {
		if (allUserWorksData) {
			setAllUserWorks(allUserWorksData.flat());
		}
	};

	useEffect(() => {
		getAllUserWorks();
	}, [allUserWorksData]);

	const isEmpty = useMemo(() => allUserWorksData?.[0]?.length === 0, [allUserWorksData]);
	const isReachingEnd = useMemo(
		() => isEmpty || (allUserWorksData && allUserWorksData[allUserWorksData.length - 1]?.length < limit) || false,
		[isEmpty, allUserWorksData],
	);

	const handleClickMoreWorksButton = () => {
		if (!isReachingEnd) {
			setSize((prevSize) => prevSize + 1);
		}
	};

	return (
		<WorksContainer works={allUserWorks.length}>
			{allUserWorks?.length === 0 ? (
				<EmptyGuideBox>아직 등록된 작업물이 없어요</EmptyGuideBox>
			) : (
				<>
					<UploadedMyWorks>
						{allUserWorks?.map(({ uuid, coverFile, title, profileImage, userName }) => (
							<li key={uuid}>
								<UploadedWorkCard
									id={uuid}
									coverFile={coverFile.path}
									title={title}
									profileImage={profileImage}
									userName={userName}
									onlyImage
								/>
							</li>
						))}
					</UploadedMyWorks>
					{!isReachingEnd && (
						<WorksMoreButton type="button" onClick={handleClickMoreWorksButton}>
							더보기
						</WorksMoreButton>
					)}
				</>
			)}
		</WorksContainer>
	);
};

export default UserWorks;

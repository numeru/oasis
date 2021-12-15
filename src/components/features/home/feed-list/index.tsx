import React, { useEffect, useMemo, useState } from "react";
import UploadedWorkCard from "@components/shared/uploaded-work-card";
import styled from "styled-components";
import { feedFetcher } from "@utils/fetcher";
import useSWRInfinite from "swr/infinite";
import API_URL, { API_HOST } from "@apis/api";
import WorkCategories from "@components/shared/work-categories";
import { EmptyGuideBox } from "@pages/mypage/likes";
import { Feed } from "@utils/types";

const FeedListContainer = styled.section`
	width: 100%;

	& > h2 {
		font-size: 1.125rem;
		margin: 0 0 5% 0;
		font-family: var(--font-nanum-bold);
	}
`;

const FeedListWrapper = styled.ul`
	width: 100%;
	padding-top: 3%;
	margin-bottom: 8%;

	& > li {
		margin-bottom: 5%;
		box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.27);
		border-radius: 8px;
	}
`;

const FeedMoreButton = styled.button`
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

const EmptyGuideArea = styled(EmptyGuideBox)`
	margin: 11% auto 145% auto;
`;

const FeedList = () => {
	const [selectedCategory, setSelectedCategory] = useState("ALL");

	const [allFeeds, setAllFeeds] = useState<Feed[]>([]);
	const limit = 10;

	const {
		feed: { basic },
	} = API_URL;

	const getKey = (index: number, previousPageData: Feed[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${basic}?category=${selectedCategory}&page=${index + 1}&pageSize=${limit}`;
	};

	const { data: allFeedsData, setSize } = useSWRInfinite(getKey, feedFetcher, {
		dedupingInterval: 3600,
	});

	const getAllFeeds = () => {
		if (allFeedsData) {
			setAllFeeds(allFeedsData.flat());
		}
	};

	useEffect(() => {
		getAllFeeds();
	}, [allFeedsData]);

	const isEmpty = useMemo(() => allFeedsData?.[0]?.length === 0, [allFeedsData]);
	const isReachingEnd = useMemo(
		() => isEmpty || (allFeedsData && allFeedsData[allFeedsData.length - 1]?.length < limit) || false,
		[isEmpty, allFeedsData],
	);

	const handleClickMoreFeedsButton = () => {
		if (!isReachingEnd) {
			setSize((prevSize) => prevSize + 1);
		}
	};

	return (
		<FeedListContainer>
			<h2>아트 스토리</h2>
			<WorkCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
			{allFeeds.length === 0 ? (
				<EmptyGuideArea>아직 등록된 작업물이 없어요</EmptyGuideArea>
			) : (
				<>
					<FeedListWrapper>
						{allFeeds?.map(({ uuid, title, coverFile, profileImage, userName }) => (
							<li key={uuid}>
								<UploadedWorkCard
									id={uuid}
									coverFile={coverFile.path}
									title={title}
									profileImage={profileImage}
									userName={userName}
								/>
							</li>
						))}
					</FeedListWrapper>
					{!isReachingEnd && (
						<FeedMoreButton type="button" onClick={handleClickMoreFeedsButton}>
							더보기
						</FeedMoreButton>
					)}
				</>
			)}
		</FeedListContainer>
	);
};

export default FeedList;

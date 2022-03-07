import React, { useState } from "react";
import UploadedWorkCard from "@components/shared/uploaded-work-card";
import WorkCategories from "@components/shared/work-categories";
import { EmptyGuideArea, FeedListContainer, FeedListWrapper, FeedMoreButton } from "./styled";
import useGetAllFeedList from "@hooks/useGetAllFeedList";

const FeedList = () => {
	const [selectedCategory, setSelectedCategory] = useState("ALL");

	const [allFeeds, isReachingEnd, handleClickMoreFeedsButton] = useGetAllFeedList(selectedCategory);

	return (
		<FeedListContainer>
			<h2>아트 스토리</h2>
			<WorkCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
			{allFeeds.length === 0 ? (
				<EmptyGuideArea>아직 등록된 프로젝트가 없어요</EmptyGuideArea>
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

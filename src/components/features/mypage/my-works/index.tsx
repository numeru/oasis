import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { dummyWorks } from "@utils/dummy_works";
import UploadedWorkCard from "@components/shared/uploaded-work-card";
import useSWRInfinite from "swr/infinite";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";
import { feedFetcher } from "@utils/fetcher";
import { Feed } from "@utils/types";
import API_URL, { API_HOST } from "@apis/api";
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

const GuideMessage = styled.p`
	font-size: 1rem;
	color: var(--color-dark-gray);
`;

const UploadWorkButton = styled(Link)`
	background-color: var(--color-blue);
	color: var(--color-white);
	padding: ${({ works }: StyledProps) => (works === 0 ? "12.5px 41px" : "12.5px 29.3%")};
	border-radius: 8px;
	font-size: 0.75rem;
	${({ works }: StyledProps) => (works === 0 ? "" : "margin-bottom: 6%")};
	font-family: var(--font-nanum-bold);
`;

const UploadedMyWorks = styled.ul`
	width: 100%;

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

const MyWorks = () => {
	const userSelector = useSelector(selectUser);
	const { uuid } = userSelector;

	const [allMyWorks, setAllMyWorks] = useState<Feed[]>([]);
	const limit = 10;

	const {
		user: { works },
	} = API_URL;

	const getKey = (index: number, previousPageData: Feed[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${works}/${uuid}?category=ALL&page=${index + 1}&pageSize=${limit}`;
	};

	const { data: allMyWorksData, setSize } = useSWRInfinite(getKey, feedFetcher, {
		dedupingInterval: 3600,
	});

	const getAllMyWorks = () => {
		if (allMyWorksData) {
			setAllMyWorks(allMyWorksData.flat());
		}
	};

	useEffect(() => {
		getAllMyWorks();
	}, [allMyWorksData]);

	const isEmpty = useMemo(() => allMyWorksData?.[0]?.length === 0, [allMyWorksData]);
	const isReachingEnd = useMemo(
		() => isEmpty || (allMyWorksData && allMyWorksData[allMyWorksData.length - 1]?.length < limit) || false,
		[isEmpty, allMyWorksData],
	);

	const handleClickMoreWorksButton = () => {
		if (!isReachingEnd) {
			setSize((prevSize) => prevSize + 1);
		}
	};

	return (
		<WorksContainer works={allMyWorks.length}>
			{allMyWorks.length === 0 ? (
				<>
					<GuideMessage>여러분의 첫 작업물을 등록해보세요!</GuideMessage>
					<UploadWorkButton to="/mypage/upload" works={allMyWorks.length}>
						새 작업물 등록
					</UploadWorkButton>
				</>
			) : (
				<>
					<UploadWorkButton to="/mypage/upload" works={allMyWorks.length}>
						새 작업물 등록
					</UploadWorkButton>
					<UploadedMyWorks>
						{allMyWorks?.map(({ uuid, coverFile, title, profileImage, userName }) => (
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

export default MyWorks;

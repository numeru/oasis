import React, { useEffect, useMemo, useState } from "react";
import { feedFetcher } from "@utils/fetcher";
import useSWRInfinite from "swr/infinite";
import API_URL, { API_HOST } from "@apis/api";
import { Feed } from "@utils/types";
import { AMOUNT_OF_DATA_AT_ONCE, DEDUPING_INTERVAL_TIME } from "@constants/swr";

type ReturnTypes = [Feed[], boolean, () => void];

const useGetAllFeedList = (selectedCategory: string): ReturnTypes => {
	const [allFeeds, setAllFeeds] = useState<Feed[]>([]);

	const limit = AMOUNT_OF_DATA_AT_ONCE;

	const {
		feed: { basic },
	} = API_URL;

	const getKey = (index: number, previousPageData: Feed[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${basic}?category=${selectedCategory}&page=${index + 1}&pageSize=${limit}`;
	};

	const { data: allFeedsData, setSize } = useSWRInfinite(getKey, feedFetcher, {
		dedupingInterval: DEDUPING_INTERVAL_TIME,
		revalidateOnFocus: false,
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

	return [allFeeds, isReachingEnd, handleClickMoreFeedsButton];
};

export default useGetAllFeedList;

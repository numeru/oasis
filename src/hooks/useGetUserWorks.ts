import React, { useState, useEffect, useMemo } from "react";
import API_URL, { API_HOST } from "@apis/api";
import useSWRInfinite from "swr/infinite";
import { feedFetcher } from "@utils/fetcher";
import { Feed } from "@utils/types";
import { AMOUNT_OF_DATA_AT_ONCE, DEDUPING_INTERVAL_TIME } from "@constants/swr";

type ReturnType = [Feed[], boolean, () => void];

const useGetUserWorks = (userId: string): ReturnType => {
	const [allUserWorks, setAllUserWorks] = useState<Feed[]>([]);
	const limit = AMOUNT_OF_DATA_AT_ONCE;

	const {
		user: { works },
	} = API_URL;

	const getKey = (index: number, previousPageData: Feed[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${works}/${userId}?category=ALL&page=${index + 1}&pageSize=${limit}`;
	};

	const { data: allUserWorksData, setSize } = useSWRInfinite(getKey, feedFetcher, {
		dedupingInterval: DEDUPING_INTERVAL_TIME,
		revalidateOnFocus: false,
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

	return [allUserWorks, isReachingEnd, handleClickMoreWorksButton];
};

export default useGetUserWorks;

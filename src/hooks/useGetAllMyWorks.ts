import React, { useEffect, useMemo, useState } from "react";
import { feedFetcher } from "@utils/fetcher";
import { Feed } from "@utils/types";
import API_URL, { API_HOST } from "@apis/api";
import useSWRInfinite from "swr/infinite";
import { AMOUNT_OF_DATA_AT_ONCE, DEDUPING_INTERVAL_TIME } from "@constants/swr";

type ReturnType = [Feed[], boolean, () => void];

const useGetAllMyWorks = (uuid: string): ReturnType => {
	const [allMyWorks, setAllMyWorks] = useState<Feed[]>([]);
	const limit = AMOUNT_OF_DATA_AT_ONCE;

	const {
		user: { works },
	} = API_URL;

	const getKey = (index: number, previousPageData: Feed[] | null) => {
		if (previousPageData && !previousPageData.length) return null;
		return `${API_HOST}${works}/${uuid}?category=ALL&page=${index + 1}&pageSize=${limit}`;
	};

	const { data: allMyWorksData, setSize } = useSWRInfinite(getKey, feedFetcher, {
		revalidateOnFocus: false,
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

	return [allMyWorks, isReachingEnd, handleClickMoreWorksButton];
};

export default useGetAllMyWorks;

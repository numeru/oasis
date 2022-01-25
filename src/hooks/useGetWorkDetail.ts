import React, { useEffect } from "react";
import useSWRImmutable from "swr/immutable";
import { Feed, UploadedImage } from "@utils/types";
import { feedFetcher } from "@utils/fetcher";
import API_URL, { API_HOST } from "@apis/api";
import { useHistory } from "react-router-dom";

type WorkDetail = Feed & { artFiles: UploadedImage[] };

const useGetWorkDetail = (workId: string) => {
	const {
		feed: { basic, detail },
	} = API_URL;

	const { data: workDetailData, error } = useSWRImmutable<WorkDetail>(
		`${API_HOST}${basic}/${workId}${detail}`,
		feedFetcher,
	);

	const history = useHistory();

	useEffect(() => {
		if (error?.response?.status === 400) {
			history.replace("/");
		}
	}, [error]);

	return workDetailData;
};

export default useGetWorkDetail;

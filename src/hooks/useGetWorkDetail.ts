import React, { useEffect, useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { Feed, UploadedImage } from "@utils/types";
import { feedFetcher } from "@utils/fetcher";
import API_URL, { API_HOST } from "@apis/api";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";

type WorkDetail = Feed & { artFiles: UploadedImage[] };

type ReturnTypes = [WorkDetail | undefined, boolean];

const useGetWorkDetail = (workId: string): ReturnTypes => {
	const { uuid } = useSelector(selectUser);

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

	const isMine = useMemo(() => workDetailData?.userUuid === uuid, [workDetailData, uuid]);

	return [workDetailData, isMine];
};

export default useGetWorkDetail;

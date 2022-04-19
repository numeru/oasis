import React, { useEffect, useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import { Categories, CommercialCopyright, ModifyCopyright, UploadedImage } from "utils/types";
import { workDetailFetcher } from "utils/fetcher";
import API_URL, { API_HOST } from "apis/api";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "stores/store";
import { COPYRIGHT_INSTRUCTIONS } from "constants/copyright";

type WorkDetail = {
	uuid: string;
	ableDelete: boolean;
	artFiles: UploadedImage[];
	category: Categories;
	cclType: { cclCommercialType: CommercialCopyright; contentModifyType: ModifyCopyright } | null;
	collaborators: string | null;
	createDate: string;
	description: string;
	tags: string[] | null;
	title: string;
	updateDate: string | null;
	user: {
		profileImage: string;
		userName: string;
		userUuid: string;
	};
};

type ReturnTypes = [WorkDetail | undefined, boolean, string[]];

const useGetWorkDetail = (workId: string): ReturnTypes => {
	const { uuid } = useSelector(selectUser);

	const {
		work: { basic },
	} = API_URL;

	const { data: workDetailData, error } = useSWRImmutable<WorkDetail>(
		`${API_HOST}${basic}/${workId}`,
		workDetailFetcher,
	);

	const history = useHistory();

	useEffect(() => {
		if (error?.response?.status === 400) {
			history.replace("/");
		}
	}, [error]);

	const isMine = useMemo(() => workDetailData?.user?.userUuid === uuid, [workDetailData, uuid]);

	const cclInstruction = useMemo(() => {
		if (!workDetailData) return [];

		const { cclType } = workDetailData;

		if (cclType === null) return ["자유롭게 이용 가능"];

		const { cclCommercialType, contentModifyType } = cclType;

		return [
			"저작자 표시",
			cclCommercialType ? COPYRIGHT_INSTRUCTIONS[cclCommercialType] : "",
			contentModifyType ? COPYRIGHT_INSTRUCTIONS[contentModifyType] : "",
		].filter((ccl) => ccl !== "");
	}, [workDetailData]);

	return [workDetailData, isMine, cclInstruction];
};

export default useGetWorkDetail;

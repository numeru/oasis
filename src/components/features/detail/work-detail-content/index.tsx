import React, { useState } from "react";
import useSWRImmutable from "swr/immutable";
import {
	WorkDatailImage,
	WorkDeleteButton,
	WorkDetailDescription,
	WorkDetailImages,
	WorkDetailIntro,
	WorkDetailUserInfo,
} from "./styled";
import { feedFetcher } from "@utils/fetcher";
import API_URL, { API_HOST } from "@apis/api";
import { Feed, UploadedImage } from "@utils/types";
import UserProfileBlank from "@assets/images/mypage/user_profile_blank.svg";
import { Redirect, useLocation } from "react-router";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";
import Modal from "@components/shared/modal";
import WorkService from "@apis/work/work-service";
import DeleteWorkAlertModal from "./delete-alert-modal";
import useImageSize from "@hooks/useImageSize";

type WorkDetail = Feed & { artFiles: UploadedImage[] };

type Props = {
	workId: string;
	workService: WorkService;
};

const WorkDetailContent = ({ workId, workService }: Props) => {
	const location = useLocation();

	const userSelector = useSelector(selectUser);
	const { uuid } = userSelector;

	const {
		feed: { basic, detail },
	} = API_URL;

	const { data: workDetailData, error } = useSWRImmutable<WorkDetail>(
		`${API_HOST}${basic}/${workId}${detail}`,
		feedFetcher,
	);

	// if (error) {
	// 	return <Redirect to={`/${location.pathname.split("/")[1]}`} />;
	// }

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleClickDeleteWorkButton = () => {
		setShowDeleteModal(true);
	};

	const imageRatio = useImageSize(workDetailData?.profileImage);

	return (
		<>
			<WorkDetailIntro>
				<time dateTime={`${workDetailData?.createDate.slice(0, 10)}`}>
					{workDetailData?.createDate.slice(0, 10).replace(/-/gi, ".")}
				</time>
				<h2>{workDetailData?.title}</h2>
				<img src={workDetailData?.coverFile.path} alt="cover_image" />
			</WorkDetailIntro>

			<WorkDetailDescription>
				<WorkDetailUserInfo to={`/user/${workDetailData?.userUuid}`} $imageRatio={imageRatio}>
					<div>
						<img src={workDetailData?.profileImage || UserProfileBlank} alt="user_image" />
					</div>

					{workDetailData?.userName}
				</WorkDetailUserInfo>
				<p>{workDetailData?.description}</p>
			</WorkDetailDescription>

			<WorkDetailImages>
				<ul>
					{workDetailData?.artFiles.map((image) => (
						<WorkDatailImage key={image.uuid}>
							<img src={image.path} alt="work_image" />
						</WorkDatailImage>
					))}
				</ul>
			</WorkDetailImages>

			{workDetailData?.userUuid === uuid && (
				<WorkDeleteButton type="button" onClick={handleClickDeleteWorkButton}>
					삭제하기
				</WorkDeleteButton>
			)}
			{showDeleteModal && (
				<Modal>
					<DeleteWorkAlertModal workId={workId} setShowDeleteModal={setShowDeleteModal} workService={workService} />
				</Modal>
			)}
		</>
	);
};

export default WorkDetailContent;

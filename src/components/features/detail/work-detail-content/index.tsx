import React, { useState } from "react";
import {
	WorkDatailImage,
	WorkDeleteButton,
	WorkDetailDescription,
	WorkDetailImages,
	WorkDetailIntro,
	WorkDetailUserInfo,
} from "./styled";
import UserProfileBlank from "@assets/images/mypage/user_profile_blank.svg";
import useImageSize from "@hooks/useImageSize";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";
import useGetWorkDetail from "@hooks/useGetWorkDetail";
import AlertModal from "@components/shared/alert-modal";
import useDeleteWork from "@hooks/useDeleteWork";
import { dateFormatter, dateTimeFormatter } from "@utils/formatter";

type Props = {
	workId: string;
};

const WorkDetailContent = ({ workId }: Props) => {
	const userSelector = useSelector(selectUser);
	const { uuid } = userSelector;

	const workDetailData = useGetWorkDetail(workId);

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleClickDeleteWorkButton = () => {
		setShowDeleteModal(true);
	};

	const imageRatio = useImageSize(workDetailData?.profileImage);

	const handleDeleteWork = useDeleteWork(workId);

	const handleClickCancelButton = () => {
		setShowDeleteModal(false);
	};

	return (
		<>
			<WorkDetailIntro aria-labelledby="work_detail_intro_label">
				<time dateTime={dateTimeFormatter(workDetailData?.createDate)}>
					{dateFormatter(workDetailData?.createDate)}
				</time>
				<h2 id="work_detail_intro_label">{workDetailData?.title}</h2>
				<img src={workDetailData?.coverFile.path} alt="작업물 커버 이미지" />
			</WorkDetailIntro>

			<WorkDetailDescription aria-labelledby="work_detail_description_label">
				<h2 id="work_detail_description_label" className="a11y-hidden">
					작성자 및 작업물 설명
				</h2>
				<WorkDetailUserInfo to={`/user/${workDetailData?.userUuid}`} $imageRatio={imageRatio}>
					<div>
						<img src={workDetailData?.profileImage || UserProfileBlank} alt="" />
					</div>

					{workDetailData?.userName}
				</WorkDetailUserInfo>
				<p>{workDetailData?.description}</p>
			</WorkDetailDescription>

			<WorkDetailImages aria-labelledby="work_detail_images_label">
				<h2 id="work_detail_images_label" className="a11y-hidden">
					작업물 이미지
				</h2>
				<ul>
					{workDetailData?.artFiles.map((image) => (
						<WorkDatailImage key={image.uuid}>
							<img src={image.path} alt="작업물 상세 이미지" />
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
				<AlertModal
					content="이 작업물을 삭제할까요?"
					confirmName="확인"
					cancelName="취소"
					onConfirm={handleDeleteWork}
					onCancel={handleClickCancelButton}
				/>
			)}
		</>
	);
};

export default WorkDetailContent;

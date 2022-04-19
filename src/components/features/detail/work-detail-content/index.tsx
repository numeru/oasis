import React, { useState } from "react";
import {
	WorkDatailImage,
	WorkDetailDescription,
	WorkDetailImages,
	WorkDetailIntro,
	WorkWriterInfo,
	WorkWriterLink,
	WorkSubInfo,
	WorkSubInfoToggleButton,
	WorkSubInfoTable,
} from "./styled";
import UserProfileBlank from "assets/images/mypage/user_profile_blank.svg";
import useImageSize from "hooks/useImageSize";
import useGetWorkDetail from "components/features/detail/work-detail-content/useGetWorkDetail";
import AlertModal from "components/shared/alert-modal";
import useDeleteWork from "components/features/detail/work-detail-content/useDeleteWork";
import { dateFormatter } from "utils/formatter";
import ArrowUpIcon from "assets/images/detail/arrow_up.svg";
import useChangeHeader from "hooks/useChangeHeader";
import { CATEGORIES } from "constants/categories";

type Props = {
	workId: string;
};

const WorkDetailContent = ({ workId }: Props) => {
	const [workDetailData, isMine, cclInstruction] = useGetWorkDetail(workId);

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleClickDeleteWorkButton = () => {
		setShowDeleteModal(true);
	};

	useChangeHeader(
		{
			headerType: "sub",
			buttonName: isMine ? "삭제" : "",
			buttonType: "button",
			clickFn: isMine ? handleClickDeleteWorkButton : () => {},
		},
		isMine,
	);

	const imageRatio = useImageSize(workDetailData?.user.profileImage);

	const handleDeleteWork = useDeleteWork(workId);

	const handleClickCancelButton = () => {
		setShowDeleteModal(false);
	};

	const [showWorkSubInfo, setShowWorkSubInfo] = useState(false);

	const toggleWorkSubInfoSection = () => {
		setShowWorkSubInfo((prev) => !prev);
	};

	return (
		<article>
			<WorkDetailIntro aria-labelledby="work_detail_intro_label">
				<span>{workDetailData && CATEGORIES[workDetailData.category]}</span>
				<h2 id="work_detail_intro_label">{workDetailData?.title}</h2>
				<img src={workDetailData?.artFiles[0]?.path} alt="프로젝트 커버 이미지" />
			</WorkDetailIntro>

			<WorkDetailDescription aria-labelledby="work_detail_description_label">
				<h3 id="work_detail_description_label" className="a11y-hidden">
					프로젝트 상세 설명
				</h3>

				<p>{workDetailData?.description}</p>
			</WorkDetailDescription>

			<WorkDetailImages aria-labelledby="work_detail_images_label">
				<h3 id="work_detail_images_label" className="a11y-hidden">
					프로젝트 이미지
				</h3>
				<ul>
					{workDetailData?.artFiles.map((image) => (
						<WorkDatailImage key={image.uuid}>
							<img src={image?.path} alt="프로젝트 상세 이미지" />
						</WorkDatailImage>
					))}
				</ul>
			</WorkDetailImages>

			<WorkWriterInfo aria-labelledby="work_writer_description_label">
				<h3 id="work_writer_description_label" className="a11y-hidden">
					작성자 설명
				</h3>

				<WorkWriterLink to={`/user/${workDetailData?.user.userUuid}`} $imageRatio={imageRatio}>
					<span>
						<img src={workDetailData?.user.profileImage || UserProfileBlank} alt="" />
					</span>

					{workDetailData?.user.userName}
				</WorkWriterLink>
			</WorkWriterInfo>

			<WorkSubInfo aria-labelledby="work_sub_info_label">
				<h3 id="work_sub_info_label" className="a11y-hidden">
					프로젝트 관련 정보
				</h3>
				<WorkSubInfoToggleButton type="button" onClick={toggleWorkSubInfoSection}>
					프로젝트 정보 <img src={ArrowUpIcon} alt="" />
				</WorkSubInfoToggleButton>
				{showWorkSubInfo && (
					<WorkSubInfoTable>
						<tbody>
							<tr>
								<td>등록일</td>
								<td>{dateFormatter(workDetailData?.createDate, "/")}</td>
							</tr>
							<tr>
								<td>태그</td>
								<td>
									{workDetailData?.tags?.map((tag, idx) => (
										<span key={idx}>{tag}</span>
									))}
								</td>
							</tr>
							<tr>
								<td>함께한 친구</td>
								<td>{workDetailData?.collaborators}</td>
							</tr>
							<tr>
								<td>저작권</td>
								<td>
									{cclInstruction?.map((ccl, idx) => (
										<span key={idx}>{ccl}</span>
									))}
								</td>
							</tr>
						</tbody>
					</WorkSubInfoTable>
				)}
			</WorkSubInfo>

			{showDeleteModal && (
				<AlertModal
					content="이 프로젝트를 삭제할까요?"
					confirmName="확인"
					cancelName="취소"
					onConfirm={handleDeleteWork}
					onCancel={handleClickCancelButton}
				/>
			)}
		</article>
	);
};

export default WorkDetailContent;

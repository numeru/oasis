import React from "react";
import UploadedWorkCard from "@components/shared/uploaded-work-card";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";
import { GuideMessage, UploadedMyWorks, UploadWorkButton, WorksContainer, WorksMoreButton } from "./styled";
import useGetAllMyWorks from "@hooks/useGetAllMyWorks";
import PlusAddButton from "@assets/images/mypage/plus_add_button.svg";

const MyWorks = () => {
	const userSelector = useSelector(selectUser);
	const { uuid } = userSelector;

	const [allMyWorks, isReachingEnd, handleClickMoreWorksButton] = useGetAllMyWorks(uuid);

	return (
		<WorksContainer works={allMyWorks.length} aria-labelledby="mypage_my_works_label">
			<h2 id="mypage_my_works_label" className="a11y-hidden">
				내 프로젝트
			</h2>
			{allMyWorks.length === 0 ? (
				<>
					<GuideMessage>여러분의 첫 프로젝트를 등록해보세요!</GuideMessage>
					<UploadWorkButton to="/mypage/upload" aria-label="새 프로젝트 등록">
						<img src={PlusAddButton} alt="새 프로젝트 등록" />
					</UploadWorkButton>
				</>
			) : (
				<>
					<UploadWorkButton to="/mypage/upload" aria-label="새 프로젝트 등록">
						<img src={PlusAddButton} alt="새 프로젝트 등록" />
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

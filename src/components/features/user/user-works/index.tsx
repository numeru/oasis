import React from "react";
import UploadedWorkCard from "components/shared/uploaded-work-card";
import { EmptyGuideBox } from "components/shared/empty-guide-box/styled";
import { UploadedMyWorks, WorksContainer, WorksMoreButton } from "components/features/mypage/my-works/styled";
import useGetUserWorks from "components/features/user/user-works/useGetUserWorks";

type Props = {
	userId: string;
};

const UserWorks = ({ userId }: Props) => {
	const [allUserWorks, isReachingEnd, handleClickMoreWorksButton] = useGetUserWorks(userId);

	return (
		<WorksContainer works={allUserWorks.length} aria-labelledby="user_works_label">
			<h2 id="user_works_label" className="a11y-hidden">
				유저 프로젝트
			</h2>
			{allUserWorks?.length === 0 ? (
				<EmptyGuideBox>아직 등록된 프로젝트가 없어요</EmptyGuideBox>
			) : (
				<>
					<UploadedMyWorks>
						{allUserWorks?.map(({ uuid, coverFile, title, user: { profileImage, userName } }) => (
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

export default UserWorks;

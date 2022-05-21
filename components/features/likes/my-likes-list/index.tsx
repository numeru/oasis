import { EmptyGuideBox } from 'components/shared/empty-guide-box/styled';
import useGetAllHeartUsers from 'components/features/likes/my-likes-list/useGetAllHeartUsers';
import MyLikesItem from './my-likes-item';

const MyLikesList = () => {
	const allHeartUsersWorks = useGetAllHeartUsers();

	return (
		<>
			{allHeartUsersWorks.length !== 0 ? (
				<ul>
					{allHeartUsersWorks.map(
						({ emailId, uuid, universityVerify, profileImgPath, userName, universityName, universityMajor }) => (
							<li key={emailId}>
								<MyLikesItem
									uuid={uuid}
									universityVerify={universityVerify}
									profileImgPath={profileImgPath}
									userName={userName}
									universityName={universityName}
									universityMajor={universityMajor}
								/>
							</li>
						),
					)}
				</ul>
			) : (
				<EmptyGuideBox>아직 하트 준 계정이 없어요</EmptyGuideBox>
			)}
		</>
	);
};

export default MyLikesList;

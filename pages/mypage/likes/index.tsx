import UserProfileBlank from 'assets/images/mypage/user_profile_blank_small.svg';
import { EmptyGuideBox } from 'components/shared/empty-guide-box/styled';
import useGetAllHeartUsers from 'hooks/useGetAllHeartUsers';
import { USER_UNIVERSITY_VERIFICATION } from 'constants/user';
import styled from 'styled-components';
import Link from 'next/link';
import { MyPageContainer } from '..';
import Image from 'next/image';
import WithAuth from 'utils/HOC/withAuth';

type StyeldProps = {
	$checkUniversity: boolean;
};

export const MyLikes = styled.section`
	width: 100%;
	padding-bottom: 120%;
	& > h2 {
		font-size: 1.125rem;
		margin: 0 0 11% 0;
		font-family: var(--font-nanum-bold);
	}
	& > ul {
		width: 100%;
	}
`;

export const LikeUserImageWrapper = styled.div`
	margin-right: 10px;
	border-radius: 50%;
	width: 40px;
	height: 40px;
	overflow: hidden;
`;

export const LikeUserInfo = styled.a`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 8%;

	& > p {
		font-size: 0.875rem;
		margin: 0;
		color: ${({ $checkUniversity }: StyeldProps) => ($checkUniversity ? 'black' : 'var(--color-dark-gray)')};
		line-height: 20px;
		font-family: var(--font-nanum-light);

		& > span {
			font-family: var(--font-nanum-bold);
			color: black;
		}
	}
`;

const Likes = () => {
	const allHeartUsersWorks = useGetAllHeartUsers();

	return (
		<MyPageContainer>
			<MyLikes aria-labelledby="mypage_likes_label">
				<h2 id="mypage_likes_label">내가 하트 준 계정</h2>
				{allHeartUsersWorks.length !== 0 ? (
					<ul>
						{allHeartUsersWorks.map(
							({ emailId, uuid, universityVerify, profileImgPath, userName, universityName, universityMajor }) => (
								<li key={emailId}>
									<Link href={`/user/${uuid}`} passHref>
										<LikeUserInfo $checkUniversity={universityVerify === USER_UNIVERSITY_VERIFICATION}>
											<LikeUserImageWrapper>
												{profileImgPath ? (
													<Image src={profileImgPath} alt="" width={40} height={40} />
												) : (
													<UserProfileBlank />
												)}
											</LikeUserImageWrapper>

											<p>
												<span>{userName}</span>
												<br />
												{universityVerify === USER_UNIVERSITY_VERIFICATION
													? `${universityName} ${universityMajor}`
													: '대학교 미인증'}
											</p>
										</LikeUserInfo>
									</Link>
								</li>
							),
						)}
					</ul>
				) : (
					<EmptyGuideBox>아직 하트 준 계정이 없어요</EmptyGuideBox>
				)}
			</MyLikes>
		</MyPageContainer>
	);
};

export default WithAuth(Likes, true);

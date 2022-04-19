import React from "react";
import UserProfileBlank from "assets/images/mypage/user_profile_blank.svg";
import { LikeUserInfo, MyLikes } from "./styled";
import { EmptyGuideBox } from "components/shared/empty-guide-box/styled";
import useGetAllHeartUsers from "pages/mypage/likes/useGetAllHeartUsers";
import { USER_UNIVERSITY_VERIFICATION } from "constants/user";

const Likes = () => {
	const allHeartUsersWorks = useGetAllHeartUsers();

	return (
		<MyLikes aria-labelledby="mypage_likes_label">
			<h2 id="mypage_likes_label">내가 하트 준 계정</h2>
			{allHeartUsersWorks.length !== 0 ? (
				<ul>
					{allHeartUsersWorks.map((user) => (
						<li key={user.emailId}>
							<LikeUserInfo
								to={`/user/${user.uuid}`}
								$checkUniversity={user.universityVerify === USER_UNIVERSITY_VERIFICATION}
							>
								<img src={user.profileImgPath || UserProfileBlank} alt="" />
								<p>
									<span>{user.userName}</span>
									<br />
									{user.universityVerify === USER_UNIVERSITY_VERIFICATION
										? `${user.universityName} ${user.universityMajor}`
										: "대학교 미인증"}
								</p>
							</LikeUserInfo>
						</li>
					))}
				</ul>
			) : (
				<EmptyGuideBox>아직 하트 준 계정이 없어요</EmptyGuideBox>
			)}
		</MyLikes>
	);
};

export default Likes;

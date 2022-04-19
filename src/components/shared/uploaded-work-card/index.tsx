import React from "react";
import LazyLoad from "react-lazyload";
import { WorkCardContainer, WorkCardImage, WorkCardInfo, WorkCardTitle, WorkCardUserInfo } from "./styled";
import UserProfileBlank from "assets/images/mypage/user_profile_blank.svg";
import useImageSize from "hooks/useImageSize";

type Props = {
	id: string;
	coverFile: string;
	title: string;
	profileImage: string;
	userName: string;
	onlyImage?: boolean;
};

const UploadedWorkCard = ({ id, coverFile, title, profileImage, userName, onlyImage = false }: Props) => {
	const imageRatio = useImageSize(profileImage);

	return (
		<LazyLoad height={200} offset={800} once>
			<WorkCardContainer to={`/detail/${id}`}>
				<WorkCardInfo onlyImage={onlyImage}>
					<WorkCardImage src={coverFile} alt="" onlyImage={onlyImage} />
					<WorkCardTitle>{title}</WorkCardTitle>
				</WorkCardInfo>

				<WorkCardUserInfo onlyImage={onlyImage} $imageRatio={imageRatio}>
					<div>
						<img src={profileImage || UserProfileBlank} alt="" />
					</div>

					<p>{userName}</p>
				</WorkCardUserInfo>
			</WorkCardContainer>
		</LazyLoad>
	);
};

export default UploadedWorkCard;

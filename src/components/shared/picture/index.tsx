import React from "react";
import Source from "components/shared/source";
import { DeviceImage } from "assets/device-images";
import { minTypeFormatter } from "utils/formatter";
import styled from "styled-components";

const PictureWrapper = styled.picture`
	& > img {
		width: 100%;
		height: auto;
	}
`;

type Props = {
	type: string;
	minType: string;
	image: DeviceImage;
	alt: string;
};

const Picture = ({ type, minType, image, alt }: Props) => {
	const minTypeImage = minTypeFormatter(image, type, minType);

	return (
		<PictureWrapper>
			{minType && <Source type={minType} image={minTypeImage} />}
			<Source type={type} image={image} />
			<img src={image.x1} alt={alt} />
		</PictureWrapper>
	);
};

export default Picture;

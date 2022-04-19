import React from "react";
import { DeviceImage } from "assets/device-images";

type Props = {
	type: string;
	image: DeviceImage;
};

const Source = ({ type, image }: Props) => {
	return <source type={`image/${type}`} srcSet={`${image.x1} 1x, ${image.x2} 2x, ${image.x3} 3x`} />;
};

export default Source;

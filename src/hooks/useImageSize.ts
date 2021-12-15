import React, { useState, useEffect } from "react";

const useImageSize = (src: string | undefined) => {
	const [width, setWidth] = useState(0);
	const [height, setHeight] = useState(0);

	const image = new Image();

	const setImageSize = () => {
		setWidth(image.width);
		setHeight(image.height);
	};
	useEffect(() => {
		image.addEventListener("load", setImageSize);
		return () => image.removeEventListener("load", setImageSize);
	}, [src]);

	useEffect(() => {
		if (src) {
			image.src = src;
		}
	}, [src]);

	return width >= height;
};

export default useImageSize;

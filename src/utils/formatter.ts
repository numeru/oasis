import { DeviceImage } from "@assets/device-images";

export const dateFormatter = (date: string | undefined) => date?.slice(0, 10).replace(/-/gi, ".");

export const dateTimeFormatter = (date: string | undefined) => date?.slice(0, 10);

export const imageTypeFormatter = (path: string) => path.slice(0, 5);

const convertPathExt = (path: string, from = "png", to = "webp") => {
	return path.slice(0, path.length - from.length) + to;
};

export const minTypeFormatter = (image: DeviceImage, type?: string, minType?: string) => {
	const minImage: DeviceImage = {
		x1: "",
		x2: "",
		x3: "",
	};

	const minTypeValues = Object.values(image).map((value) => convertPathExt(value, type, minType));

	minImage.x1 = minTypeValues[0];
	minImage.x2 = minTypeValues[1];
	minImage.x3 = minTypeValues[2];

	return minImage;
};

export const uriLinkFormatter = (text: string | undefined) => {
	if (!text) return "";

	const uriRegExp =
		/(?:https?:\/\/|www\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/gim;

	return text.replace(uriRegExp, '<a href="$&" target="_blank" rel="noopener noreferrer">$&</a>');
};

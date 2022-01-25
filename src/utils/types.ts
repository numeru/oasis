export type UserUploadFile = {
	file: File;
	thumbnail: string;
	type: string;
};

export type UploadedImage = {
	uuid: string;
	fileUuid: string;
	fileName: string;
	extension: string;
	fileType: string;
	size: number;
	path: string;
	thumbnailPath: string;
	referenceInfoType: string;
	sort: number;
	createDate: string;
	updateDate: boolean;
};

export type Feed = {
	userUuid: string;
	userName: string;
	profileImage: string;
	uuid: string;
	title: string;
	coverFile: UploadedImage;
	description: string;
	createDate: string;
	updateDate: string;
	ableDelete: boolean;
};

export type WorkImage = {
	id: number;
	file: File;
	thumbnail: string;
	type: string;
};

export type Profile = {
	uuid: string;
	emailId: string;
	userName: string;
	universityName: string | null;
	universityMajor: string | null;
	universityVerify: string;
	profileImgPath: string;
	profileImgThumbnailPath: string;
	profileDescription: string;
	heartCount: number;
	hasHeart: boolean;
	ableUpdate: boolean;
};

import { CommercialCopyright, ModifyCopyright, WorkImage } from "utils/types";

export type UploadWorkRequest = {
	title: string;
	description: string;
	workImages: WorkImage[];
	category: string;
	tags: string;
	collaborators: string;
	copyright: string;
	commercialCopyright: CommercialCopyright;
	modifyCopyright: ModifyCopyright;
};

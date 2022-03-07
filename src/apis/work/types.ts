import { WorkImage } from "@utils/types";

export type UploadWorkRequest = {
	title: string;
	description: string;
	category: string;
	artFiles: WorkImage[];
};

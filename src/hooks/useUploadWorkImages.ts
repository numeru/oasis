import React, { useMemo, useRef, useState } from "react";
import { UserUploadFile, WorkImage } from "@utils/types";
import { imageTypeFormatter } from "@utils/formatter";

type ReturnType = [
	UserUploadFile | null,
	WorkImage[],
	number,
	React.RefObject<HTMLInputElement>,
	React.RefObject<HTMLInputElement>,
	(e: React.ChangeEvent<HTMLInputElement>) => void,
	(e: React.ChangeEvent<HTMLInputElement>) => void,
	number | null,
	boolean,
	(type: "cover" | "work", id?: number | undefined) => void,
	() => void,
	() => void,
];

const useUploadWorkImages = (): ReturnType => {
	const [coverImage, setCoverImage] = useState<UserUploadFile | null>(null);
	const [workImages, setWorkImages] = useState<WorkImage[]>([]);
	const numberOfWorkImages = useMemo(() => workImages.length, [workImages]);

	const coverImageRef = useRef<HTMLInputElement>(null);
	const workImagesRef = useRef<HTMLInputElement>(null);

	const uploadCoverImage = (e: React.ChangeEvent<HTMLInputElement>) => {
		const fileList = e.target.files;

		if (fileList && fileList[0]) {
			const url = URL.createObjectURL(fileList[0]);
			setCoverImage({
				file: fileList[0],
				thumbnail: url,
				type: imageTypeFormatter(fileList[0].type),
			});

			if (coverImageRef.current) coverImageRef.current.value = "";
		}
	};

	const uploadWorkImages = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (workImages.length >= 10) return;

		const fileList = e.target.files;

		if (fileList && fileList[0]) {
			const url = URL.createObjectURL(fileList[0]);

			const newWorkImage = {
				id: Math.floor(Math.random() * 1000),
				file: fileList[0],
				thumbnail: url,
				type: imageTypeFormatter(fileList[0].type),
			};
			setWorkImages((prev) => {
				return [...prev, newWorkImage];
			});

			if (workImagesRef.current) workImagesRef.current.value = "";
		}
	};

	const [workImageToBeDeleted, setWorkImageToBeDeleted] = useState<number | null>(null);
	const [coverImageToBeDeleted, setCoverImageToBeDeleted] = useState<boolean>(false);

	const clickRemoveButton = (type: "cover" | "work", id?: number) => {
		if (type === "work" && id) {
			setWorkImageToBeDeleted(id);
		} else {
			setCoverImageToBeDeleted(true);
		}
	};

	const deleteClickedImage = () => {
		if (workImageToBeDeleted !== null) {
			setWorkImages((prev) => prev.filter((img) => img.id !== workImageToBeDeleted));
			setWorkImageToBeDeleted(null);
		} else {
			setCoverImage(null);
			setCoverImageToBeDeleted(false);
		}
	};

	const cancelToRemoveImages = () => {
		setWorkImageToBeDeleted(null);
		setCoverImageToBeDeleted(false);
	};

	return [
		coverImage,
		workImages,
		numberOfWorkImages,
		coverImageRef,
		workImagesRef,
		uploadCoverImage,
		uploadWorkImages,
		workImageToBeDeleted,
		coverImageToBeDeleted,
		clickRemoveButton,
		deleteClickedImage,
		cancelToRemoveImages,
	];
};

export default useUploadWorkImages;

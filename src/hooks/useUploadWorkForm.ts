import React, { useState } from "react";
import WorkService from "@apis/work/work-service";
import { TOKEN_ERROR } from "@constants/errors";
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from "@constants/api";
import { useHistory } from "react-router-dom";
import { responseErrorWarning, throwTokenError } from "@stores/slices/user-slice";
import { useDispatch } from "react-redux";
import { UserUploadFile, WorkImage } from "@utils/types";

const workService = new WorkService();

type BlankUploadFormInputs = {
	selectedCategory: boolean;
	coverImage: boolean;
	title: boolean;
	description: boolean;
	workImages: boolean;
};

type UploadFormInputs = {
	selectedCategory: string;
	coverImage: UserUploadFile | null;
	title: string;
	description: string;
	workImages: WorkImage[];
};

type ReturnType = [BlankUploadFormInputs, boolean, (e: React.FormEvent<HTMLFormElement>) => Promise<void>];

const useUploadWorkForm = (
	{ selectedCategory, coverImage, title, description, workImages }: UploadFormInputs,
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>,
): ReturnType => {
	const [blankInputs, setBlankInputs] = useState<BlankUploadFormInputs>({
		selectedCategory: false,
		coverImage: false,
		title: false,
		description: false,
		workImages: false,
	});

	const findBlanklInputs = () => {
		setBlankInputs({
			selectedCategory: selectedCategory === "",
			coverImage: coverImage === null,
			title: title === "",
			description: description === "",
			workImages: workImages.length === 0,
		});

		return (
			selectedCategory === "" || title === "" || description === "" || workImages.length === 0 || coverImage === null
		);
	};

	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const history = useHistory();
	const dispatch = useDispatch();

	const submitUploadWorkForm = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsFormSubmitted(true);

		const isThereBlankInput = findBlanklInputs();

		if (isThereBlankInput) return;

		try {
			const data = {
				title,
				description,
				category: selectedCategory,
				coverFile: coverImage!.file,
				artFiles: workImages,
			};

			const {
				statusCode,
				data: { message },
			} = await workService.uploadWork(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(message || BASIC_ERROR_MESSAGE));
			}

			if (statusCode == RESPONSE_STATUS_200) {
				setIsEdited(false);
				history.replace("/mypage");
			}
		} catch (error: any) {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
			dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
		}
	};

	return [blankInputs, isFormSubmitted, submitUploadWorkForm];
};

export default useUploadWorkForm;

import React, { useEffect, useState } from "react";
import WorkService from "@apis/work/work-service";
import { TOKEN_ERROR } from "@constants/errors";
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from "@constants/api";
import { useHistory } from "react-router-dom";
import { responseErrorWarning, throwTokenError } from "@stores/slices/user-slice";
import { useDispatch } from "react-redux";
import { WorkImage } from "@utils/types";

const workService = new WorkService();

type BlankUploadFormInputs = {
	selectedCategory: boolean;
	title: boolean;
	description: boolean;
	workImages: boolean;
	tags: boolean;
};

type UploadFormInputs = {
	selectedCategory: string;
	title: string;
	description: string;
	workImages: WorkImage[];
	tags: string;
};

type ReturnType = [BlankUploadFormInputs, boolean, (e: React.FormEvent<HTMLFormElement>) => Promise<void>];

const useUploadWorkForm = (
	{ selectedCategory, title, description, workImages, tags }: UploadFormInputs,
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>,
): ReturnType => {
	const [blankInputs, setBlankInputs] = useState<BlankUploadFormInputs>({
		selectedCategory: false,
		title: false,
		description: false,
		workImages: false,
		tags: false,
	});

	const findBlanklInputs = () => {
		setBlankInputs({
			selectedCategory: selectedCategory === "",
			title: title === "",
			description: description === "",
			workImages: workImages.length === 0,
			tags: tags === "",
		});

		return selectedCategory === "" || title === "" || description === "" || workImages.length === 0 || tags === "";
	};

	useEffect(() => {
		setIsEdited(selectedCategory !== "" || title !== "" || description !== "" || workImages.length > 0 || tags !== "");
	}, [selectedCategory, title, description, workImages, tags]);

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

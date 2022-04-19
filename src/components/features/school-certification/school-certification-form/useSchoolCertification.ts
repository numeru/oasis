import React from "react";
import { responseErrorWarning } from "stores/slices/user-slice";
import { TOKEN_ERROR } from "constants/errors";
import { throwTokenError } from "stores/slices/user-slice";
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from "constants/api";
import UserService from "apis/user/user-service";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserUploadFile } from "utils/types";

const userService = new UserService();

const useSchoolCertification = (
	studentIdCardImage: UserUploadFile | null,
	setIsFormSubmitted: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const history = useHistory();
	const dispatch = useDispatch();

	const handleSubmitSchoolIdForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setIsFormSubmitted(true);

		if (!studentIdCardImage) return;

		handleSchoolCertifying();
	};

	const handleSchoolCertifying = async () => {
		try {
			if (!studentIdCardImage) return;

			const {
				statusCode,
				data: { message },
			} = await userService.certifySchool(studentIdCardImage.file);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(message || BASIC_ERROR_MESSAGE));
				return;
			}

			if (statusCode <= RESPONSE_STATUS_200) {
				history.push("/settings/certification/result");
			}
		} catch (error: any) {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
			dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
		}
	};

	return handleSubmitSchoolIdForm;
};

export default useSchoolCertification;

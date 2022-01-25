import React from "react";
import WorkService from "@apis/work/work-service";
import { useDispatch } from "react-redux";
import { responseErrorWarning, throwTokenError } from "@stores/slices/user-slice";
import { useHistory } from "react-router-dom";
import { TOKEN_ERROR } from "@constants/errors";
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from "@constants/api";

const workService = new WorkService();

type ReturnTypes = () => Promise<void>;

const useDeleteWork = (workId: string): ReturnTypes => {
	const dispatch = useDispatch();
	const history = useHistory();

	const handleDeleteWork = async () => {
		try {
			const {
				statusCode,
				data: { message },
			} = await workService.deleteWork(workId);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(message || BASIC_ERROR_MESSAGE));
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
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

	return handleDeleteWork;
};

export default useDeleteWork;

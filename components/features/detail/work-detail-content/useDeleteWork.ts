import WorkService from 'apis/work/work-service';
import { useDispatch } from 'react-redux';
import { responseErrorWarning, throwTokenError } from 'stores/slices/user-slice';
import { TOKEN_ERROR } from 'constants/errors';
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from 'constants/api';
import { useRouter } from 'next/router';

const workService = new WorkService();

type ReturnTypes = () => Promise<void>;

const useDeleteWork = (workId: string): ReturnTypes => {
	const dispatch = useDispatch();

	const Router = useRouter();

	const handleDeleteWork = async () => {
		try {
			const statusCode = await workService.deleteWork(workId);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
				Router.replace('/mypage');
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

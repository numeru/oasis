import UserService from 'apis/user/user-service';
import { checkUserStart, responseErrorWarning, responseSuccessGuide, throwTokenError } from 'stores/slices/user-slice';
import { TOKEN_ERROR } from 'constants/errors';
import { BASIC_ERROR_MESSAGE, RESPONSE_STATUS_200, RESPONSE_STATUS_400 } from 'constants/api';
import { useDispatch } from 'react-redux';
import { UserUploadFile } from 'types/upload';
import { useRouter } from 'next/router';

const userService = new UserService();

const useUploadProfile = (
	userIntroduction: string,
	profileImage: UserUploadFile | null,
	setIsEdited: React.Dispatch<React.SetStateAction<boolean>>,
) => {
	const dispatch = useDispatch();

	const Router = useRouter();

	const handleUploadProfile = async () => {
		const data = {
			profileDescription: userIntroduction,
			profileFile: profileImage?.file,
		};

		try {
			const {
				statusCode,
				data: { message },
			} = await userService.uploadProfile(data);

			if (statusCode >= RESPONSE_STATUS_400) {
				dispatch(responseErrorWarning(message || BASIC_ERROR_MESSAGE));
				return;
			}

			if (statusCode === RESPONSE_STATUS_200) {
				setIsEdited(false);

				dispatch(checkUserStart());
				dispatch(responseSuccessGuide('프로필을 변경했어요!'));

				Router.push('/mypage');
			}
		} catch (error: any) {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
			dispatch(responseErrorWarning(BASIC_ERROR_MESSAGE));
		}
	};

	return handleUploadProfile;
};

export default useUploadProfile;

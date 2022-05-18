import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { responseErrorWarning, userLogout, setUserData } from 'stores/slices/user-slice';
import { RESPONSE_STATUS_200 } from 'constants/api';
import API_URL from 'apis/api';
import { getStorageItem, storageAccessKey, storageTokenType } from 'utils/local-storage';
import { apiWithInterceptor } from 'stores/sagas/user-saga';
import styled from 'styled-components';
import Image from 'next/image';
import LoadingIndicatorImage from 'assets/images/loadingIndicator/loading_indicator.png';

const WhiteLoadingPage = styled.div`
	width: 100%;
	height: 80vh;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export const LoadingIndicator = styled(Image)`
	animation: spin 800ms infinite linear;
	@keyframes "spin" {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(359deg);
		}
	}
`;

const WithAuth = (Component: any, block = false) => {
	const AuthenticatedComponent = () => {
		const Router = useRouter();
		const dispatch = useDispatch();

		const [isAllowed, setIsAllowed] = useState(false);

		const checkUserData = async () => {
			try {
				const {
					auth: { check },
				} = API_URL;

				const accessToken = getStorageItem(storageAccessKey);
				const tokenType = getStorageItem(storageTokenType);

				const config = {
					headers: {
						Authorization: `${tokenType} ${accessToken}`,
					},
				};

				const base = apiWithInterceptor();

				const response = await base.get(check, config);

				const {
					data: { user },
					status,
				} = response;

				if (status === RESPONSE_STATUS_200 && user) {
					dispatch(setUserData(user));

					setIsAllowed(true);
				} else if (block) {
					dispatch(responseErrorWarning('로그인이 필요한 페이지 입니다'));

					Router.push('/');
				} else {
					setIsAllowed(true);
				}
			} catch (error) {
				if (block) {
					dispatch(userLogout());
					dispatch(responseErrorWarning('로그인이 필요한 페이지 입니다'));
					Router.push('/login');
				} else {
					setIsAllowed(true);
				}
			}
		};

		useEffect(() => {
			checkUserData();
		}, []);

		return isAllowed ? (
			<Component />
		) : (
			<WhiteLoadingPage>
				<LoadingIndicator src={LoadingIndicatorImage} alt="" width={30} height={30} />
			</WhiteLoadingPage>
		);
	};

	return AuthenticatedComponent;
};

export default WithAuth;

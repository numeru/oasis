import { apiWithInterceptor } from "@stores/sagas/user-saga";
import axios from "axios";
import { getStorageItem, storageAccessKey, storageTokenType } from "./local-storage";

export const feedFetcher = (url: string) => axios.get(url).then((response) => response.data.data.artStoryItem);

export const profileFetcher = (url: string, isLogin = false) => {
	if (isLogin) {
		const accessToken = getStorageItem(storageAccessKey);
		const tokenType = getStorageItem(storageTokenType);

		const config = {
			headers: {
				Authorization: `${tokenType} ${accessToken}`,
			},
		};

		const base = apiWithInterceptor();
		return base.get(url, config).then((response) => response.data.data.userInfo);
	}

	return axios.get(url).then((response) => response.data.data.userInfo);
};

export const usersFetcher = (url: string) => {
	const accessToken = getStorageItem(storageAccessKey);
	const tokenType = getStorageItem(storageTokenType);

	const config = {
		headers: {
			Authorization: `${tokenType} ${accessToken}`,
		},
	};

	const base = apiWithInterceptor();
	return base.get(url, config).then((response) => response.data.data.users);
};

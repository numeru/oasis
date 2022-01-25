import axios, { AxiosInstance } from "axios";
import API_URL, { API_HOST, BasicResult } from "@apis/api";
import AuthService, { IAuthService } from "@apis/auth/auth-service";
import { UploadWorkRequest } from "./types";
import { getStorageItem, storageAccessKey, storageTokenType } from "@utils/local-storage";
import { RESPONSE_STATUS_400, RESPONSE_STATUS_500 } from "@constants/api";

class WorkService {
	private base: AxiosInstance;
	private workUrl;

	private authService: IAuthService;

	constructor() {
		this.base = axios.create({
			baseURL: API_HOST,
		});
		this.base.interceptors.response.use(
			async (response) => {
				const { config, data } = response;
				if (data?.statusCode >= RESPONSE_STATUS_400 && data?.statusCode < RESPONSE_STATUS_500) {
					const result = await this.authService.getNewToken();

					if (result) {
						const accessToken = getStorageItem(storageAccessKey);
						const tokenType = getStorageItem(storageTokenType);

						if (config.headers) {
							config.headers["Authorization"] = `${tokenType} ${accessToken}`;

							return axios(config);
						}
					}
				}
				return response;
			},
			async (error) => {
				const {
					config,
					response: { status },
				} = error;

				if (status >= RESPONSE_STATUS_400 && status < RESPONSE_STATUS_500) {
					const result = await this.authService.getNewToken();

					if (result) {
						const accessToken = getStorageItem(storageAccessKey);
						const tokenType = getStorageItem(storageTokenType);

						config.headers["Authorization"] = `${tokenType} ${accessToken}`;
						return axios(config);
					}
				}

				return error;
			},
		);
		this.workUrl = API_URL.work;
		this.authService = new AuthService();
	}

	async uploadWork({ title, description, category, coverFile, artFiles }: UploadWorkRequest) {
		const { upload } = this.workUrl;

		const config = this.authService.setAuthHeader();
		config.headers["Content-Type"] = "multipart/form-data";

		const formData = new FormData();

		formData.append("title", title);
		formData.append("description", description);
		formData.append("category", category);
		formData.append("coverFile", coverFile);

		for (let i = 0; i < artFiles.length; i++) {
			const { file } = artFiles[i];
			formData.append("artFiles", file);
		}

		const response = await this.base.post(upload, formData, config);
		const result: BasicResult = await response.data;

		return result;
	}

	async deleteWork(userId: string) {
		const { basic } = this.workUrl;

		const config = this.authService.setAuthHeader();

		const response = await this.base.delete(`${basic}/${userId}/detail/delete`, config);

		const result: BasicResult = await response.data;

		return result;
	}
}

export default WorkService;

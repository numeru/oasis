export type ApiResult<T> = {
	timeStamp: string;
	statusCode: number;
	status: string;
	data: T;
};

export type BasicResult = ApiResult<{
	message: string;
}>;

export const API_HOST = "";

const API_URL = {
	auth: {
		signup: "/signUp",
		login: "/signIn",
		logout: "/signOut",
		check: "/token/health",
		token: "/issueToken",
	},
	work: {
		basic: "/home/artStory",
		upload: "/home/artStory/artLog/submit",
	},
	feed: {
		basic: "/home/artStory",
		detail: "/detail",
	},
	user: {
		basic: "/account/profile",
		update: "/account/profile/update",
		search: "/search",
		works: "/home/artStory",
		heart: "/account/profile/heart",
		school: "/account/profile/studentIdCard/upload",
	},
};

export default API_URL;

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
		signup: "/sign-up",
		login: "/sign-in",
		logout: "/signOut",
		check: "/token-health",
		token: "/issue-token",
	},
	work: {
		basic: "/art-logs",
	},
	feed: {
		basic: "/art-stories",
	},
	user: {
		basic: "/account/profile",
		update: "/account/profile/update",
		search: "/search",
		works: "/art-logs",
		heart: "/account/profile/heart",
		school: "/account/profile/studentIdCard/upload",
		password: "/account/password",
		draw: "/account/draw",
	},
};

export default API_URL;

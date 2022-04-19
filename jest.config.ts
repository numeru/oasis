module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/setUpTests.ts"],
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
	transformIgnorePatterns: ["/node_modules/"],
	testRegex: "/tests/.*\\.(ts|tsx)$",
	clearMocks: true,
	moduleNameMapper: {
		"hooks/(.*)": "<rootDir>/src/hooks/$1",
		"components/(.*)": "<rootDir>/src/components/$1",
		"pages/(.*)": "<rootDir>/src/pages/$1",
		"utils/(.*)": "<rootDir>/src/utils/$1",
		"stores/(.*)": "<rootDir>/src/stores/$1",
		"assets/(.*)": "<rootDir>/src/assets/$1",
		"services/(.*)": "<rootDir>/src/services/$1",
		"constants/(.*)": "<rootDir>/src/constants/$1",
		"apis/(.*)": "<rootDir>/src/apis/$1",
	},
};

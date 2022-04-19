import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import User from "pages/user";
import withMock from "storybook-addon-mock";
import { API_HOST } from "apis/api";
import DummyCoverImage from "assets/images/dummy/dummy_image_1.png";
import DummyProfileImage from "assets/images/dummy/dummy_image_2.png";
import { USER_UNIVERSITY_VERIFYING } from "constants/user";

export default {
	title: "Design System/Pages/User",
	component: User,
	decorators: [withMock],
	parameters: {
		componentSubtitle: "선택한 사용자의 정보를 볼 수 있는 페이지 입니다.",
	},
} as ComponentMeta<typeof User>;

const Template: ComponentStory<typeof User> = (args) => <User />;

export const Primary = Template.bind({});

Primary.parameters = {
	mockData: [
		{
			url: `${API_HOST}/account/profile/undefined/search`,
			method: "GET",
			status: 200,
			response: {
				data: {
					userInfo: {
						ableUpdate: false,
						emailId: "test@gmail.com",
						hasHeart: false,
						heartCount: 0,
						profileDescription: "유저 설명",
						profileImgPath: DummyProfileImage,
						profileImgThumbnailPath: DummyProfileImage,
						universityMajor: null,
						universityName: null,
						universityVerify: USER_UNIVERSITY_VERIFYING,
						userName: "유저 이름",
						uuid: "user-uuid",
					},
				},
			},
		},
		{
			url: `${API_HOST}/home/artStory/undefined?category=ALL&page=1&pageSize=10`,
			method: "GET",
			status: 200,
			delay: 1000,
			response: {
				data: {
					artStoryItem: {
						ableDelete: false,
						artFiles: [
							{
								createDate: "2021-12-03T12:04:34.000Z",
								extension: "png",
								fileName: "cover-name",
								fileType: "image/png",
								fileUuid: "cover-uuid",
								path: DummyCoverImage,
								referenceInfoType: "ART_DESCRIPTION_IMG",
								size: 884017,
								sort: 0,
								thumbnailPath: DummyCoverImage,
								updateDate: null,
								uuid: "4127eee5-52e5-49c9-8b8e-ec6c8014d7fc",
							},
						],
						category: "DANCE",
						coverFile: {
							createDate: "2021-12-03T12:04:34.000Z",
							extension: "png",
							fileName: "cover-name",
							fileType: "image/png",
							fileUuid: "cover-uuid",
							path: DummyCoverImage,
							referenceInfoType: "ART_DESCRIPTION_IMG",
							size: 884017,
							sort: 0,
							thumbnailPath: DummyCoverImage,
							updateDate: null,
							uuid: "4127eee5-52e5-49c9-8b8e-ec6c8014d7fc",
						},
						createDate: "2021-12-03T12:04:32.620Z",
						description: "작품 설명",
						profileImage: DummyProfileImage,
						title: "제목",
						updateDate: null,
						userName: "작성자",
						userUuid: "user-uuid",
						uuid: "uuid",
					},
				},
			},
		},
	],
};

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Likes from "@pages/mypage/likes";
import withMock from "storybook-addon-mock";
import { API_HOST } from "@apis/api";
import DummyProfileImage from "@assets/images/dummy/dummy_image_2.png";

export default {
	title: "Design System/Pages/MyPage/Likes",
	component: Likes,
	decorators: [withMock],
} as ComponentMeta<typeof Likes>;

const Template: ComponentStory<typeof Likes> = (args) => <Likes />;

export const WithUser = Template.bind({});

WithUser.parameters = {
	mockData: [
		{
			url: `${API_HOST}/account/profile/heart/search?page=1&pageSize=10`,
			method: "GET",
			status: 200,
			delay: 1000,
			response: {
				data: {
					users: {
						ableUpdate: true,
						emailId: "test@gmail.com",
						hasHeart: true,
						heartCount: 3,
						profileDescription: "유저 설명 입니다.",
						profileImgPath: DummyProfileImage,
						profileImgThumbnailPath: DummyProfileImage,
						universityMajor: null,
						universityName: null,
						universityVerify: null,
						userName: "이름",
						uuid: "like-user-1",
					},
				},
			},
		},
	],
};

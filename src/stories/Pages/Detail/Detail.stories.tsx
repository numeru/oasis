import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Detail from "@pages/detail";
import withMock from "storybook-addon-mock";
import { API_HOST } from "@apis/api";
import DummyCoverImage from "@assets/images/dummy/dummy_image_1.png";
import DummyProfileImage from "@assets/images/dummy/dummy_image_2.png";

export default {
	title: "Design System/Pages/Detail",
	component: Detail,
	decorators: [withMock],
} as ComponentMeta<typeof Detail>;

const Template: ComponentStory<typeof Detail> = (args) => <Detail />;

export const Primary = Template.bind({});

Primary.parameters = {
	mockData: [
		{
			url: `${API_HOST}/home/artStory/undefined/detail`,
			method: "GET",
			status: 200,
			response: {
				data: {
					artStoryItem: {
						ableDelete: true,
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

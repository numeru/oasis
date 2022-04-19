import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import MyPage from "pages/mypage";
import { MemoryRouter } from "react-router-dom";

export default {
	title: "Design System/Pages/MyPage",
	component: MyPage,
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={["/mypage"]}>
				<Story />
			</MemoryRouter>
		),
	],
	parameters: {
		componentSubtitle: "나와 관련된 정보를 볼 수 있는 페이지 입니다.",
	},
} as ComponentMeta<typeof MyPage>;

const Template: ComponentStory<typeof MyPage> = (args) => <MyPage />;

export const Primary = Template.bind({});

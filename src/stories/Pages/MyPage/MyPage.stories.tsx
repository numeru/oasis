import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import MyPage from "@pages/mypage";
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
} as ComponentMeta<typeof MyPage>;

const Template: ComponentStory<typeof MyPage> = (args) => <MyPage />;

export const Primary = Template.bind({});

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import EditProfile from "@pages/mypage/edit-profile";

export default {
	title: "Design System/Pages/MyPage/EditProfile",
	component: EditProfile,
	parameters: {
		componentSubtitle: "내 프로필을 수정할 수 있는 페이지 입니다.",
	},
} as ComponentMeta<typeof EditProfile>;

const Template: ComponentStory<typeof EditProfile> = (args) => <EditProfile />;

export const Primary = Template.bind({});

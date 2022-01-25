import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import EditProfile from "@pages/mypage/edit-profile";

export default {
	title: "Design System/Pages/MyPage/EditProfile",
	component: EditProfile,
} as ComponentMeta<typeof EditProfile>;

const Template: ComponentStory<typeof EditProfile> = (args) => <EditProfile />;

export const Primary = Template.bind({});

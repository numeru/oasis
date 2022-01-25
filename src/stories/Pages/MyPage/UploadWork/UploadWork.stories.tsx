import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import UploadWork from "@pages/mypage/upload-work";

export default {
	title: "Design System/Pages/MyPage/UploadWork",
	component: UploadWork,
} as ComponentMeta<typeof UploadWork>;

const Template: ComponentStory<typeof UploadWork> = (args) => <UploadWork />;

export const Primary = Template.bind({});

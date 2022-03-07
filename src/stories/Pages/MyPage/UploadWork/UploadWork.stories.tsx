import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import UploadWork from "@pages/mypage/upload-work";

export default {
	title: "Design System/Pages/MyPage/UploadWork",
	component: UploadWork,
	parameters: {
		componentSubtitle: "프로젝트를 업로드 하는 페이지 입니다.",
	},
} as ComponentMeta<typeof UploadWork>;

const Template: ComponentStory<typeof UploadWork> = (args) => <UploadWork />;

export const Primary = Template.bind({});

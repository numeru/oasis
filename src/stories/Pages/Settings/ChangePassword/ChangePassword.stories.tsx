import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChangePassword from "@pages/settings/change-password";

export default {
	title: "Design System/Pages/Settings/ChangePassword",
	component: ChangePassword,
	parameters: {
		componentSubtitle: "비밀번호를 변경할 수 있는 페이지 입니다.",
	},
} as ComponentMeta<typeof ChangePassword>;

const Template: ComponentStory<typeof ChangePassword> = (args) => <ChangePassword />;

export const Primary = Template.bind({});

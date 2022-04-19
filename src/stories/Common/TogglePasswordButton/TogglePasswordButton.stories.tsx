import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import TogglePasswordButton from "components/shared/toggle-password-button";

export default {
	title: "Design System/Common/TogglePasswordButton",
	component: TogglePasswordButton,
	argTypes: { setIsPasswordVisible: { action: "toggled" } },
	parameters: {
		layout: "centered",
		componentSubtitle: "비밀번호 형식의 인풋에서 값을 보여줄지 여부를 토클하는 버튼으로 사용합니다.",
	},
} as ComponentMeta<typeof TogglePasswordButton>;

const Template: ComponentStory<typeof TogglePasswordButton> = (args) => <TogglePasswordButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	isPasswordVisible: true,
};

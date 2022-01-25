import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import TogglePasswordButton from "@components/shared/toggle-password-button";

export default {
	title: "Design System/Common/TogglePasswordButton",
	component: TogglePasswordButton,
	argTypes: { setIsPasswordVisible: { action: "toggled" } },
	parameters: {
		layout: "centered",
	},
} as ComponentMeta<typeof TogglePasswordButton>;

const Template: ComponentStory<typeof TogglePasswordButton> = (args) => <TogglePasswordButton {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	isPasswordVisible: true,
};

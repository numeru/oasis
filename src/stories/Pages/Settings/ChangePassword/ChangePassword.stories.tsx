import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ChangePassword from "@pages/settings/change-password";

export default {
	title: "Design System/Pages/Settings/ChangePassword",
	component: ChangePassword,
} as ComponentMeta<typeof ChangePassword>;

const Template: ComponentStory<typeof ChangePassword> = (args) => <ChangePassword />;

export const Primary = Template.bind({});

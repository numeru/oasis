import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Settings from "@pages/settings";

export default {
	title: "Design System/Pages/Settings",
	component: Settings,
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = (args) => <Settings {...args} />;

export const Primary = Template.bind({});

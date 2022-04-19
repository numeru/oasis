import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Settings from "pages/settings";

export default {
	title: "Design System/Pages/Settings",
	component: Settings,
	parameters: {
		componentSubtitle: "여러 세팅을 할 수 있는 페이지 입니다.",
	},
} as ComponentMeta<typeof Settings>;

const Template: ComponentStory<typeof Settings> = (args) => <Settings />;

export const Primary = Template.bind({});

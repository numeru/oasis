import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Home from "@pages/home";

export default {
	title: "Design System/Pages/Home",
	component: Home,
	parameters: {
		componentSubtitle: "접속 시 보여주는 첫 페이지 입니다.",
	},
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home />;

export const Primary = Template.bind({});

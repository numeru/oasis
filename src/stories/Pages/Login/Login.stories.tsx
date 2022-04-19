import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Login from "pages/login";

export default {
	title: "Design System/Pages/Login",
	component: Login,
	parameters: {
		componentSubtitle: "로그인 할 수 있는 페이지 입니다.",
	},
} as ComponentMeta<typeof Login>;

const Template: ComponentStory<typeof Login> = (args) => <Login />;

export const Primary = Template.bind({});

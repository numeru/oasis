import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Home from "@pages/home";

export default {
	title: "Design System/Pages/Home",
	component: Home,
} as ComponentMeta<typeof Home>;

const Template: ComponentStory<typeof Home> = (args) => <Home />;

export const Primary = Template.bind({});

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Picture from "@components/shared/picture";
import { Banner } from "@assets/device-images";

export default {
	title: "Design System/Common/Picture",
	component: Picture,
} as ComponentMeta<typeof Picture>;

const Template: ComponentStory<typeof Picture> = (args) => <Picture {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	type: "png",
	minType: "webp",
	image: Banner,
	alt: "",
};

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Picture from "components/shared/picture";
import { Banner } from "assets/device-images";

export default {
	title: "Design System/Common/Picture",
	component: Picture,
	parameters: {
		componentSubtitle: "webp등의 최적화 된 형식으로 변환될 수 있는 이미지를 보여줄 때 사용합니다.",
	},
} as ComponentMeta<typeof Picture>;

const Template: ComponentStory<typeof Picture> = (args) => <Picture {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	type: "png",
	minType: "webp",
	image: Banner,
	alt: "",
};

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import UploadedWorkCard from "@components/shared/uploaded-work-card";
import DummyCoverImage from "@assets/images/dummy/dummy_image_1.png";
import DummyProfileImage from "@assets/images/dummy/dummy_image_1.png";

export default {
	title: "Design System/Common/UploadedWorkCard",
	component: UploadedWorkCard,
} as ComponentMeta<typeof UploadedWorkCard>;

const Template: ComponentStory<typeof UploadedWorkCard> = (args) => <UploadedWorkCard {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	id: "id",
	coverFile: DummyCoverImage,
	title: "제목",
	profileImage: DummyProfileImage,
	userName: "이름",
	onlyImage: false,
};

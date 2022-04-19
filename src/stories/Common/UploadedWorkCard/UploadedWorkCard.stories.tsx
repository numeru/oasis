import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import UploadedWorkCard from "components/shared/uploaded-work-card";
import DummyCoverImage from "assets/images/dummy/dummy_image_1.png";
import DummyProfileImage from "assets/images/dummy/dummy_image_1.png";

export default {
	title: "Design System/Common/UploadedWorkCard",
	component: UploadedWorkCard,
	parameters: {
		componentSubtitle: "피드 리스트, 업로드 한 프로젝트 리스트 등에서 각 항목을 나타낼 때 사용합니다.",
	},
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

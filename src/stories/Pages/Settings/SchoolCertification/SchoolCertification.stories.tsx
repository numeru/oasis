import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SchoolCertification from "pages/settings/school-certification";

export default {
	title: "Design System/Pages/Settings/SchoolCertification",
	component: SchoolCertification,
	parameters: {
		componentSubtitle: "학생증을 인증할 수 있는 페이지 입니다.",
	},
} as ComponentMeta<typeof SchoolCertification>;

const Template: ComponentStory<typeof SchoolCertification> = (args) => <SchoolCertification />;

export const Primary = Template.bind({});

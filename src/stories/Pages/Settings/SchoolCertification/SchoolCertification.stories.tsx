import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SchoolCertification from "@pages/settings/school-certification";

export default {
	title: "Design System/Pages/Settings/SchoolCertification",
	component: SchoolCertification,
} as ComponentMeta<typeof SchoolCertification>;

const Template: ComponentStory<typeof SchoolCertification> = (args) => <SchoolCertification />;

export const Primary = Template.bind({});

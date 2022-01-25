import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import CertificationResult from "@pages/settings/school-certification/result";

export default {
	title: "Design System/Pages/Settings/SchoolCertification/SchoolCertificationResult",
	component: CertificationResult,
} as ComponentMeta<typeof CertificationResult>;

const Template: ComponentStory<typeof CertificationResult> = (args) => <CertificationResult />;

export const Primary = Template.bind({});

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import CertificationResult from "@pages/settings/school-certification/result";

export default {
	title: "Design System/Pages/Settings/SchoolCertification/SchoolCertificationResult",
	component: CertificationResult,
	parameters: {
		componentSubtitle: "학생증 인증 결과를 확인할 수 있는 페이지 입니다.",
	},
} as ComponentMeta<typeof CertificationResult>;

const Template: ComponentStory<typeof CertificationResult> = (args) => <CertificationResult />;

export const Primary = Template.bind({});

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import EmailCertification from "@pages/sign-up/email-certification";

export default {
	title: "Design System/Pages/SignUp/EmailCertification",
	component: EmailCertification,
} as ComponentMeta<typeof EmailCertification>;

const Template: ComponentStory<typeof EmailCertification> = (args) => <EmailCertification {...args} />;

export const Primary = Template.bind({});

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import AccountInquiry from "@pages/inquiry/account";

export default {
	title: "Design System/Pages/AccountInquiry",
	component: AccountInquiry,
} as ComponentMeta<typeof AccountInquiry>;

const Template: ComponentStory<typeof AccountInquiry> = (args) => <AccountInquiry />;

export const Primary = Template.bind({});

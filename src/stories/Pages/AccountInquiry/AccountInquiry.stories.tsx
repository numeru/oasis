import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import AccountInquiry from "pages/inquiry/account";

export default {
	title: "Design System/Pages/AccountInquiry",
	component: AccountInquiry,
	parameters: {
		componentSubtitle: "비밀번호를 초기화하는 페이지 입니다.",
	},
} as ComponentMeta<typeof AccountInquiry>;

const Template: ComponentStory<typeof AccountInquiry> = (args) => <AccountInquiry />;

export const Primary = Template.bind({});

import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import FormItem from "@components/shared/form-item";

export default {
	title: "Design System/Common/FormItem",
	component: FormItem,
	argTypes: { handleChange: { action: "changed" } },
} as ComponentMeta<typeof FormItem>;

const Template: ComponentStory<typeof FormItem> = (args) => <FormItem {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	id: "form_item",
	label: "아이디",
	type: "text",
	placeholder: "아이디를 입력해주세요",
	value: "테스트",
	isValid: true,
	validationMessage: "아이디를 입력해주세요",
	required: true,
};

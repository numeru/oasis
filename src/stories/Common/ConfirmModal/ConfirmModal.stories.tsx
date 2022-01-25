import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import ConfirmModal from "@components/shared/confirm-modal";

export default {
	title: "Design System/Common/ConfirmModal",
	component: ConfirmModal,
	argTypes: { onConfirm: { action: "clicked" } },
} as ComponentMeta<typeof ConfirmModal>;

const Template: ComponentStory<typeof ConfirmModal> = (args) => <ConfirmModal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	content: "확인 메세지",
	dark: true,
};
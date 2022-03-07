import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import AlertModal from "@components/shared/alert-modal";

export default {
	title: "Design System/Common/AlertModal",
	component: AlertModal,
	argTypes: { onConfirm: { action: "clicked" }, onCancel: { action: "clicked" } },
	parameters: {
		componentSubtitle: "사용자의 액션을 막고 경고 모달을 보여줄 때 사용합니다.",
	},
} as ComponentMeta<typeof AlertModal>;

const Template: ComponentStory<typeof AlertModal> = (args) => <AlertModal {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	content: "경고 메세지",
	subContent: "경고 설명",
	confirmName: "확인",
	cancelName: "취소",
	reverse: true,
};

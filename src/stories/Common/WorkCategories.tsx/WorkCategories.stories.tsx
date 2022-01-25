import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import WorkCategories from "@components/shared/work-categories";

export default {
	title: "Design System/Common/WorkCategories",
	component: WorkCategories,
	argTypes: { setSelectedCategory: { action: "selected" } },
} as ComponentMeta<typeof WorkCategories>;

const Template: ComponentStory<typeof WorkCategories> = (args) => <WorkCategories {...args} />;

export const Primary = Template.bind({});

Primary.args = {
	selectedCategory: "ALL",
};

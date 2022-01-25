import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import SignUp from "@pages/sign-up";
import { MemoryRouter } from "react-router-dom";

export default {
	title: "Design System/Pages/SignUp",
	component: SignUp,
	decorators: [
		(Story) => (
			<MemoryRouter initialEntries={["/signup"]}>
				<Story />
			</MemoryRouter>
		),
	],
} as ComponentMeta<typeof SignUp>;

const Template: ComponentStory<typeof SignUp> = (args) => <SignUp />;

export const Primary = Template.bind({});

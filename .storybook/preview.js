import "../src/index.css";

import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "@stores/store";

export const decorators = [
	(Story) => (
		<BrowserRouter>
			<Provider store={store}>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
					}}
				>
					<div
						style={{
							width: "40%",
							minHeight: "300px",
						}}
					>
						<Story />
					</div>
				</div>
			</Provider>
		</BrowserRouter>
	),
];

export const parameters = {
	actions: { argTypesRegex: "^on[A-Z].*" },
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
};

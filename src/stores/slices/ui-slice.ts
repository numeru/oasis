import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
	headerType: "default" | "sub";
	buttonName: string;
	clickFn: any;
	buttonType: "button" | "submit";
};

const initialState: InitialState = {
	headerType: "default",
	buttonName: "",
	clickFn: () => {},
	buttonType: "button",
};

export const UISlice = createSlice({
	name: "UI",
	initialState,
	reducers: {
		changeHeader(state, action: PayloadAction<InitialState>) {
			state.headerType = action.payload.headerType;
			state.buttonName = action.payload.buttonName;
			state.clickFn = action.payload.clickFn;
			state.buttonType = action.payload.buttonType;
		},
		initHeader(state) {
			state.headerType = "default";
			state.buttonName = "";
			state.clickFn = () => {};
			state.buttonType = "button";
		},
	},
});

export default UISlice;

export const { changeHeader, initHeader } = UISlice.actions;

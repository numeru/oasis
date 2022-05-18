import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeaderType } from 'types/header';

type InitialState = {
	headerType: HeaderType;
};

const initialState: InitialState = {
	headerType: 'default',
};

export const UISlice = createSlice({
	name: 'UI',
	initialState,
	reducers: {
		changeHeader(state, action: PayloadAction<HeaderType>) {
			state.headerType = action.payload;
		},
		initHeader(state) {
			state.headerType = 'default';
		},
	},
});

export default UISlice;

export const { changeHeader, initHeader } = UISlice.actions;

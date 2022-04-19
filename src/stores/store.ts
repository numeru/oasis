import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "stores/slices/user-slice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/root";
import UISlice from "./slices/ui-slice";

const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
	const store = configureStore({
		reducer: {
			user: userSlice.reducer,
			ui: UISlice.reducer,
		},
		middleware: [sagaMiddleware],
		devTools: process.env.NODE_ENV === "production" ? false : true,
	});
	sagaMiddleware.run(rootSaga);

	return store;
};

const store = createStore();

export default store;

type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.user;
export const selectUI = (state: RootState) => state.ui;

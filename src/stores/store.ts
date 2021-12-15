import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "@stores/slices/user-slice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./sagas/root";

const sagaMiddleware = createSagaMiddleware();

const createStore = () => {
	const store = configureStore({
		reducer: {
			user: userSlice.reducer,
		},
		middleware: [sagaMiddleware],
	});
	sagaMiddleware.run(rootSaga);

	return store;
};

const store = createStore();

export default store;

type RootState = ReturnType<typeof store.getState>;

export const selectUser = (state: RootState) => state.user;

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthService from "@apis/auth/auth-service";
import { Provider } from "react-redux";
import store from "@stores/store";
import WorkService from "@apis/work/work-service";
import UserService from "@apis/user/user-service";

const authService = new AuthService();
const workService = new WorkService();
const userService = new UserService();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App authService={authService} workService={workService} userService={userService} />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root"),
);

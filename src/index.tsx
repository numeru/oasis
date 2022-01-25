import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthService from "@apis/auth/auth-service";
import { Provider } from "react-redux";
import store from "@stores/store";

const authService = new AuthService();

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<App authService={authService} />
			</Provider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root"),
);

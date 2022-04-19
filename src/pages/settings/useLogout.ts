import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "stores/slices/user-slice";
import AuthService from "apis/auth/auth-service";

const authService = new AuthService();

const useLogout = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const handleClickLogoutButton = async () => {
		dispatch(userLogout());
		authService.logout();
		history.push("/");
	};

	return handleClickLogoutButton;
};

export default useLogout;

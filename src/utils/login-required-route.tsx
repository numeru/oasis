import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "@stores/store";
import { responseErrorWarning } from "@stores/slices/user-slice";

type Props = {
	exact?: boolean | undefined;
	path: string | readonly string[] | undefined;
	Component: React.ComponentType<any>;
};

const LoginRequiredRoute = ({ path, Component, ...rest }: Props) => {
	const userSelector = useSelector(selectUser);
	const { isLogin } = userSelector;

	const dispatch = useDispatch();

	const alertToLogin = () => {
		dispatch(responseErrorWarning("로그인이 필요한 페이지 입니다."));
	};

	return (
		<Route
			{...rest}
			path={path}
			render={(props) => {
				if (isLogin) {
					return <Component {...props} />;
				}

				alertToLogin();
				return (
					<Redirect
						to={{
							pathname: "/login",
							state: { rejectedFrom: path },
						}}
					/>
				);
			}}
		/>
	);
};

export default LoginRequiredRoute;

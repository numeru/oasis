import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router";
import Home from "@pages/home";
import Login from "@pages/login";
import MyPage from "@pages/mypage";
import SignUp from "@pages/sign-up";
import Settings from "@pages/settings";
import User from "@pages/user";
import WorkDetail from "@pages/detail";
import OasisLayout from "@components/layout";
import AuthService from "@apis/auth/auth-service";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStart, responseErrorWarning, userLogout } from "@stores/slices/user-slice";
import { selectUser } from "@stores/store";
import WorkService from "@apis/work/work-service";
import UserService from "@apis/user/user-service";

// const Home = lazy(() => import("@pages/home"));
// const Login = lazy(() => import("@pages/login"));
// const MyPage = lazy(() => import("@pages/mypage"));
// const SignUp = lazy(() => import("@pages/sign-up"));
// const Settings = lazy(() => import("@pages/settings"));
// const User = lazy(() => import("@pages/user"));

type Props = {
	authService: AuthService;
	workService: WorkService;
	userService: UserService;
};
function App({ authService, workService, userService }: Props) {
	const dispatch = useDispatch();
	const history = useHistory();

	const userSelector = useSelector(selectUser);
	const { isLogin, isTokenError, checkUserError, checkUserLoading } = userSelector;

	const checkUserData = async () => {
		try {
			if (checkUserLoading) return;

			dispatch(checkUserStart());

			// if (checkUserError) {
			// 	dispatch(userLogout());
			// 	dispatch(responseErrorWarning("알 수 없는 오류가 발생했습니다. 문제가 계속 될 경우 고객센터로 문의해주세요."));
			// 	history.push("/login");
			// }
		} catch (error) {
			dispatch(userLogout());
			dispatch(responseErrorWarning("다시 로그인 해주세요"));
			history.push("/login");
		}
	};

	useEffect(() => {
		checkUserData();
	}, [isLogin]);

	useEffect(() => {
		if (isTokenError) {
			history.replace("/login");
		}
	}, [isTokenError]);

	return (
		<OasisLayout>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route path="/mypage">
					<MyPage workService={workService} userService={userService} />
				</Route>
				<Route exact path="/login" render={(props) => <Login {...props} authService={authService} />} />
				<Route exact path="/signup" render={(props) => <SignUp {...props} authService={authService} />} />
				<Route
					path="/settings"
					render={(props) => <Settings {...props} authService={authService} userService={userService} />}
				/>
				<Route exact path="/user/:id" render={(props) => <User {...props} userService={userService} />} />
				<Route exact path="/detail/:id" render={(props) => <WorkDetail {...props} workService={workService} />} />
				<Redirect path="*" to="/" />
			</Switch>
		</OasisLayout>
	);
}

export default App;

import React, { lazy, Suspense, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";
import OasisLayout from "@components/layout";
import { useDispatch, useSelector } from "react-redux";
import { checkUserStart, responseErrorWarning, userLogout } from "@stores/slices/user-slice";
import { selectUser } from "@stores/store";
import LoginRequiredRoute from "@utils/login-required-route";

const Home = lazy(() => import("@pages/home"));
const Login = lazy(() => import("@pages/login"));
const MyPage = lazy(() => import("@pages/mypage"));
const SignUp = lazy(() => import("@pages/sign-up"));
const Settings = lazy(() => import("@pages/settings"));
const User = lazy(() => import("@pages/user"));
const WorkDetail = lazy(() => import("@pages/detail"));
const AccountInquiry = lazy(() => import("@pages/inquiry/account"));

function App() {
	const dispatch = useDispatch();
	const history = useHistory();

	const userSelector = useSelector(selectUser);
	const { isLogin, isTokenError, checkUserLoading } = userSelector;

	const checkUserData = async () => {
		try {
			if (checkUserLoading) return;

			dispatch(checkUserStart());
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
			<Suspense fallback={null}>
				<Switch>
					<Route exact path="/" component={Home} />
					<LoginRequiredRoute path="/mypage" Component={MyPage} />

					<Route exact path="/login" component={Login} />
					<Route path="/signup" component={SignUp} />

					<LoginRequiredRoute path="/settings" Component={Settings} />

					<Route exact path="/user/:id" component={User} />

					<Route exact path="/detail/:id" component={WorkDetail} />
					<Route exact path="/inquiry/account" component={AccountInquiry} />
					<Redirect path="*" to="/" />
				</Switch>
			</Suspense>
		</OasisLayout>
	);
}

export default App;

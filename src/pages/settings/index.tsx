import React from "react";
import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import AuthService from "@apis/auth/auth-service";
import { Redirect, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { responseErrorWarning, userLogout } from "@stores/slices/user-slice";
import { AboutUser, LogoutButton, SettingsContainer, SettingsMenus } from "./styled";
import SchoolCertification from "@pages/settings/school-certification";
import { Route, Switch } from "react-router";
import { selectUser } from "@stores/store";
import UserService from "@apis/user/user-service";
import CertificationResult from "./school-certification/result";

type Props = {
	authService: AuthService;
	userService: UserService;
};

const Settings = ({ authService, userService }: Props) => {
	const { isLogin, userName, emailId } = useSelector(selectUser);
	const history = useHistory();

	const dispatch = useDispatch();

	const handleClickLogout = async () => {
		dispatch(userLogout());
		authService.logout();
		history.push("/");

		// try {
		// 	const result = await authService.logout();

		// 	if (result) {
		// 		const {
		// 			statusCode,
		// 			data: { message },
		// 		} = result;

		// 		if (statusCode >= 400) {
		// 			dispatch(responseErrorWarning(message || "잠시 후 다시 시도해주세요"));
		// 			return;
		// 		}

		// 		if (statusCode === 200) {
		// 			dispatch(userLogout());
		// 			history.push("/");
		// 			return;
		// 		}
		// 	}
		// 	dispatch(userLogout());
		// 	history.push("/");
		// } catch (error: any) {
		// 	dispatch(responseErrorWarning(error.response.data.error?.message || "잠시 후 다시 시도해주세요"));
		// }
	};

	const handleClickNotices = () => {
		window.open("https://o4sis.notion.site/505d741305a149c6b029aa435af054f6", "_blank");
	};

	const handleOpenMail = () => {
		window.open("mailto:oasis.yeha@gmail.com", "_blank");
	};

	return (
		<Switch>
			<Route exact path="/settings">
				<SettingsContainer>
					<AboutUser isLogin={isLogin}>
						{isLogin ? (
							<>
								<p>{userName}</p>
								<p>{emailId}</p>
								<p>이메일 변경을 원하시면 오아시스에 문의해주세요</p>
							</>
						) : (
							<>
								<p>로그인해주세요</p>
								<p>아이디 / 비밀번호 관련 문의는 오아시스에 문의하기를 이용해주세요 요</p>
							</>
						)}
					</AboutUser>

					<SettingsMenus>
						{isLogin && (
							<li>
								<Link to="/settings/certification">
									학교 인증하기 <MdChevronRight />
								</Link>
							</li>
						)}

						<li>
							<button type="button" role="link" onClick={handleClickNotices}>
								공지사항 <MdChevronRight />
							</button>
						</li>
						<li>
							<button onClick={handleOpenMail}>
								오아시스에 문의하기 <MdChevronRight />
							</button>
						</li>
					</SettingsMenus>
					{isLogin && (
						<LogoutButton type="button" onClick={handleClickLogout}>
							로그아웃
						</LogoutButton>
					)}
				</SettingsContainer>
			</Route>
			<Route
				exact
				path="/settings/certification"
				render={(props) => <SchoolCertification {...props} userService={userService} />}
			/>

			<Route exact path="/settings/certification/result">
				<CertificationResult />
			</Route>

			<Redirect path="*" to="/settings" />
		</Switch>
	);
};

export default Settings;

import React from "react";
import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import AuthService from "@apis/auth/auth-service";
import { Redirect, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@stores/slices/user-slice";
import { AboutUser, LogoutButton, SettingsContainer, SettingsMenus } from "./styled";
import SchoolCertification from "@pages/settings/school-certification";
import { Route, Switch } from "react-router-dom";
import { selectUser } from "@stores/store";
import CertificationResult from "./school-certification/result";
import ChangePassword from "./change-password";

type Props = {
	authService: AuthService;
};

const Settings = ({ authService }: Props) => {
	const { isLogin, userName, emailId } = useSelector(selectUser);
	const history = useHistory();

	const dispatch = useDispatch();

	const handleClickLogout = async () => {
		dispatch(userLogout());
		authService.logout();
		history.push("/");
	};

	const handleClickNotices = () => {
		window.open("https://o4sis.notion.site/505d741305a149c6b029aa435af054f6", "_blank", "noopener");
	};

	const handleOpenMail = () => {
		window.open("mailto:oasis.yeha@gmail.com", "_blank", "noopener");
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
								<p>아이디 / 비밀번호 관련 문의는 오아시스에 문의하기를 이용해주세요</p>
							</>
						)}
					</AboutUser>

					<SettingsMenus>
						{isLogin && (
							<>
								<li>
									<Link to="/settings/certification">
										학교 인증하기 <MdChevronRight />
									</Link>
								</li>
								<li>
									<Link to="/settings/change-password">
										비밀번호 변경하기 <MdChevronRight />
									</Link>
								</li>
							</>
						)}

						<li>
							<button type="button" onClick={handleClickNotices}>
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

			<Route exact path="/settings/certification" component={SchoolCertification} />

			<Route exact path="/settings/certification/result" component={CertificationResult} />

			<Route exact path="/settings/change-password" component={ChangePassword} />

			<Redirect path="*" to="/settings" />
		</Switch>
	);
};

export default Settings;

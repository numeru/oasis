import React from "react";
import SmallLogo from "@assets/images/layout/oasis_logo_small.svg";
import {
	LayoutHeader,
	HeaderLogoTitle,
	HeaderLogoImage,
	HeaderMenuButton,
	HeaderMenuList,
	HeaderLogo,
	HeaderNavMenu,
} from "./styled";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";

const Header = () => {
	const userSelector = useSelector(selectUser);
	const { isLogin } = userSelector;

	return (
		<LayoutHeader>
			<HeaderLogo to="/">
				<HeaderLogoTitle>Oasis</HeaderLogoTitle>
				<HeaderLogoImage src={SmallLogo} alt="" />
			</HeaderLogo>
			<HeaderNavMenu>
				<HeaderMenuList>
					{isLogin ? (
						<>
							<li>
								<HeaderMenuButton activeClassName="selected" exact to="/">
									홈
								</HeaderMenuButton>
							</li>
							<li>
								<HeaderMenuButton activeClassName="selected" to="/mypage">
									아트로그
								</HeaderMenuButton>
							</li>
							<li>
								<HeaderMenuButton activeClassName="selected" to="/settings">
									설정
								</HeaderMenuButton>
							</li>
						</>
					) : (
						<>
							<li>
								<HeaderMenuButton activeClassName="selected" exact to="/">
									홈
								</HeaderMenuButton>
							</li>
							<li>
								<HeaderMenuButton activeClassName="selected" to="/login">
									로그인
								</HeaderMenuButton>
							</li>
						</>
					)}
				</HeaderMenuList>
			</HeaderNavMenu>
		</LayoutHeader>
	);
};

export default Header;

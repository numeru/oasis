import { Link, NavLink } from "react-router-dom";
import styled from "styled-components";

export const LayoutHeader = styled.header`
	width: 100%;
	padding: 2.8% 1%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

export const HeaderLogoTitle = styled.h1`
	font-size: 1.5rem;
	color: #222222;
	margin: 0;
	font-family: var(--font-nanum-bold);
	height: 30px;
	line-height: 33px;
`;

export const HeaderLogoImage = styled.img`
	width: 30px;
	height: 30px;
`;

export const HeaderLogo = styled(Link)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const HeaderNavMenu = styled.nav`
	flex: 1;
`;
export const HeaderMenuList = styled.ul`
	width: 100%;
	display: flex;
	justify-content: flex-end;

	& > li {
		margin: 0 4.2%;
	}
`;

export const HeaderMenuButton = styled(NavLink)`
	font-size: 0.875rem;
	background-color: transparent;
	color: var(--color-dark-gray);
	font-family: var(--font-nanum-bold);

	&.selected {
		text-decoration: underline;
		color: black;
	}
`;

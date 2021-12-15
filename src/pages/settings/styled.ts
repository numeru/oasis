import styled from "styled-components";

type StyledProps = {
	isLogin: boolean;
};
export const SettingsContainer = styled.main`
	padding: 3.3% 0 5% 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	padding-bottom: 100%;
`;

export const AboutUser = styled.div`
	padding: ${({ isLogin }: StyledProps) => (isLogin ? "4.8%" : "7%")} 7%;
	width: 100%;
	background-color: #fffdf1;
	border-radius: 8px;

	& > p {
		&:nth-child(1) {
			font-size: 1.25rem;
			margin: 0 0 2.2% 0;
			font-family: var(--font-nanum-bold);
		}

		&:nth-child(2) {
			font-size: 0.875rem;
			margin: 0 0 1% 0;
		}

		&:last-child {
			font-size: 0.625rem;
			color: var(--color-dark-gray);
			margin: 1% 0 0 0;
		}
	}
`;

export const SettingsMenus = styled.ul`
	width: 100%;
	margin: 4% 0 9.5% 0;
	padding: 0 7%;

	& > li {
		width: 100%;
		font-size: 1.125rem;
		margin: 1.5% 0;

		& > a,
		button {
			width: 100%;
			color: black;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 3% 0;
			font-family: var(--font-nanum-bold);
			font-size: 1.125rem;
			background-color: transparent;
		}
	}
`;

export const LogoutButton = styled.button`
	border: 1px solid #848484;
	color: var(--color-dark-gray);
	border-radius: 8px;
	font-size: 1.125rem;
	background-color: transparent;
	width: 86%;
	height: 48px;
	display: block;
	margin: auto;
	font-family: var(--font-nanum-bold);
`;

import styled from "styled-components";

export const HomeBanner = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5.6%;
	padding: 0 3.3%;
	width: 100%;
	border-radius: 24px;
	background-color: transparent;

	& > img,
	picture {
		width: 100%;
		height: auto;
		border-radius: 24px;
	}
`;

export const HomeContainer = styled.main`
	width: 100%;
	padding: 5.6% 3.3%;
`;

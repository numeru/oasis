import styled from "styled-components";

export const LayoutFooter = styled.footer`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 5.2% 7.8%;
	width: 100%;
	background: #f0f0f0;
	border-radius: 8px;
`;

export const FooterInstaButton = styled.button`
	width: 30px;
	height: 30px;
	margin-bottom: 5%;
	background-color: transparent;
	padding: 0;
`;
export const FooterInstaLogo = styled.img`
	width: 30px;
	height: 30px;
`;
export const FooterOptionList = styled.ul`
	& > li {
		margin-bottom: 9.9%;
	}
`;

export const FooterOptionButton = styled.button`
	font-size: 0.75rem;
	padding: 0;
	text-decoration: underline;
	color: black;
	font-family: var(--font-nanum-bold);
`;

export const FooterCompanyInfo = styled.address`
	color: #848484;
	font-style: normal;
	font-size: 0.75rem;
	margin-top: 1.9%;
	line-height: 20px;
`;

export const FooterCopyright = styled.p`
	font-size: 0.75rem;
	color: #848484;
	margin: 4% 0 0 0;
`;

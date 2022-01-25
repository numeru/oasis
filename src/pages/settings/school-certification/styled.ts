import styled from "styled-components";

export const SchoolCertificationContainer = styled.main`
	width: 100%;
	padding: 5%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 100%;
`;

export const SchoolCertificationHeader = styled.header`
	width: 100%;
	margin-bottom: 6%;

	& > h2 {
		font-size: 1.3rem;
		margin: 0 0 5% 0;
		font-family: var(--font-nanum-bold);
	}

	& > p {
		font-size: 0.875rem;
		color: #848484;
		margin: 0;
	}
`;
export const SchoolCertificationExampleImage = styled.img`
	width: 50%;
	height: auto;
	margin-bottom: 8%;
	background-color: transparent;
`;

import styled from "styled-components";

export const CertificationResultContainer = styled.main`
	width: 100%;
	padding: 5% 5% 100% 5%;

	& > h2 {
		font-size: 1.3rem;
		margin: 0 0 12% 0;
		font-family: var(--font-nanum-bold);
	}
`;

export const CertificationResultBox = styled.section`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	border-radius: 16px;
	background: #eaf3ff;
	width: 100%;
	margin: auto;
	padding: 12% 10.5% 9% 10.5%;

	& > img {
		width: 52%;
		height: auto;
		margin-bottom: 15%;
	}

	& > h3 {
		font-size: 1.125rem;
		font-family: var(--font-nanum-bold);
		margin: 0 0 5% 0;
	}
	& > p {
		font-size: 0.875rem;
		margin: 0;
		line-height: 24px;
		text-align: center;
	}
`;

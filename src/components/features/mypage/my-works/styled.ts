import { Link } from "react-router-dom";
import styled from "styled-components";

type StyledProps = {
	works: number;
};

export const WorksContainer = styled.section`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: ${({ works }: StyledProps) => (works === 0 ? "48% 0 40% 0" : "4% 0")};
`;

export const GuideMessage = styled.p`
	font-size: 1rem;
	color: var(--color-dark-gray);
`;

export const UploadWorkButton = styled(Link)`
	background-color: var(--color-blue);
	color: var(--color-white);
	padding: ${({ works }: StyledProps) => (works === 0 ? "12.5px 41px" : "12.5px 29.3%")};
	border-radius: 8px;
	font-size: 0.75rem;
	${({ works }: StyledProps) => (works === 0 ? "" : "margin-bottom: 6%")};
	font-family: var(--font-nanum-bold);
`;

export const UploadedMyWorks = styled.ul`
	width: 100%;
	margin-bottom: 8%;

	& > li {
		width: 100%;

		&:not(:last-child) {
			margin-bottom: 5%;
		}
	}
`;

export const WorksMoreButton = styled.button`
	display: block;
	margin: auto;
	border: 2px solid var(--color-dark-gray);
	background-color: transparent;
	width: 84%;
	font-size: 0.813rem;
	border-radius: 8px;
	color: var(--color-dark-gray);
	height: 40px;
	font-family: var(--font-nanum-black);
`;

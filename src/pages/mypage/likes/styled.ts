import { Link } from "react-router-dom";
import styled from "styled-components";

type StyeldProps = {
	$checkUniversity: boolean;
};

export const MyLikes = styled.section`
	width: 100%;
	padding-bottom: 120%;
	& > h2 {
		font-size: 1.125rem;
		margin: 0 0 11% 0;
		font-family: var(--font-nanum-bold);
	}
	& > ul {
		width: 100%;
	}
`;

export const LikeUserInfo = styled(Link)`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 8%;

	& > img {
		margin-right: 10px;
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	& > p {
		font-size: 0.875rem;
		margin: 0;
		color: ${({ $checkUniversity }: StyeldProps) => ($checkUniversity ? "black" : "var(--color-dark-gray)")};
		line-height: 20px;
		font-family: var(--font-nanum-light);

		& > span {
			font-family: var(--font-nanum-bold);
			color: black;
		}
	}
`;

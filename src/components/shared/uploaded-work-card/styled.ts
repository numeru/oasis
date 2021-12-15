import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

type StyledProps = {
	onlyImage: boolean;
	$imageRatio?: boolean;
};

export const WorkCardContainer = styled(Link)`
	width: 100%;
`;

export const WorkCardInfo = styled.div`
	width: 100%;
	height: 0;
	padding-bottom: 75%;
	overflow-y: hidden;
	position: relative;
	border-radius: ${({ onlyImage }: StyledProps) => (onlyImage ? "8px" : "8px 8px 0px 0px")};
`;

export const WorkCardImage = styled.img`
	position: absolute;
	bottom: 50%;
	transform: translateY(50%);
	width: 100%;
	min-height: calc(100%);
	border-radius: ${({ onlyImage }: StyledProps) => (onlyImage ? "8px" : "8px 8px 0px 0px")};
`;

export const WorkCardTitle = styled.p`
	position: absolute;
	left: 3.5%;
	bottom: 5%;
	font-size: 0.75rem;
	margin: 0;
	color: white;
	font-family: var(--font-nanum-bold);
`;

export const WorkCardUserInfo = styled.div`
	width: 100%;
	font-size: 0.813rem;
	padding: 2.3% 4.5%;
	display: ${({ onlyImage }: StyledProps) => (onlyImage ? "none" : "flex")};
	align-items: center;

	& > div {
		margin-right: 10px;
		width: 40px;
		height: 0;
		padding-bottom: 40px;
		overflow: hidden;
		position: relative;
		border-radius: 50%;
		z-index: 0;
		& > img {
			${({ $imageRatio }: StyledProps) =>
				$imageRatio
					? css`
							height: 100%;
							position: absolute;
							left: 50%;
							transform: translateX(-50%);
							min-width: calc(100%);
					  `
					: css`
							width: 100%;
							position: absolute;
							bottom: 50%;
							transform: translateY(50%);
							min-height: calc(100%);
					  `}
		}
	}

	& > p {
		font-size: 0.813rem;
		margin: 0;
		color: black;
		font-family: var(--font-nanum-bold);
	}
`;

import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { FormConfirmButton } from "@components/shared/form-buttons/styled";

type StyledProps = {
	$imageRatio: boolean;
};
export const WorkDetailIntro = styled.section`
	& > time {
		color: var(--color-dark-gray);
		font-size: 0.875rem;
	}

	& > h2 {
		font-size: 1.5rem;
		padding: 0 1.5%;
		margin: 2.9% 0 3.9% 0;
		font-family: var(--font-nanum-bold);
	}

	& > img {
		padding: 0 1.5%;
		width: 100%;
		height: auto;
	}
`;

export const WorkDetailDescription = styled.section`
	& > div {
		width: 100%;
		padding: 3.4% 4% 3.4% 5%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	& > p {
		margin: 0;
		padding: 3.2% 5%;
		font-size: 0.75rem;
		line-height: 20px;
	}
`;

export const WorkDetailUserInfo = styled(Link)`
	display: flex;
	align-items: center;
	font-size: 0.75rem;
	flex: 1;
	color: black;
	font-family: var(--font-nanum-bold);
	width: 100%;
	padding: 3.4% 4% 3.4% 5%;

	& > div {
		margin-right: 10px;
		width: 40px;
		height: 0;
		padding-bottom: 40px;
		overflow-y: hidden;
		position: relative;
		border-radius: 50%;
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
`;

export const WorkDetailImages = styled.section`
	padding: 5% 1.5%;
`;

export const WorkDatailImage = styled.li`
	margin-bottom: 5%;
	& > img {
		width: 100%;
		height: auto;
	}
`;

export const WorkDeleteButton = styled(FormConfirmButton)`
	width: 90.4%;
	display: block;
	margin: auto;
`;

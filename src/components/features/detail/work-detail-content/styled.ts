import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

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
	& > p {
		margin: 0;
		padding: 5%;
		font-size: 0.75rem;
		line-height: 20px;
	}
`;

export const WorkWriterInfo = styled.section`
	padding: 2%;
`;

export const WorkWriterLink = styled(Link)`
	display: flex;
	align-items: center;
	font-size: 0.75rem;
	flex: 1;
	color: black;
	font-family: var(--font-nanum-bold);
	width: 100%;

	& > span {
		margin-right: 10px;
		width: 30px;
		height: 0;
		padding-bottom: 30px;
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
	padding: 1.5%;
`;

export const WorkDatailImage = styled.li`
	&:not(:last-child) {
		margin-bottom: 5%;
	}

	& > img {
		width: 100%;
		height: auto;
	}
`;

export const WorkSubInfo = styled.section`
	width: 100%;
	padding: 4% 3%;
`;

export const WorkSubInfoToggleButton = styled.button`
	display: flex;
	align-items: stretch;
	font-size: 1rem;
	background-color: transparent;
	font-family: var(--font-nanum-bold);
	padding: 0;

	& > img {
		margin-left: 14px;
		padding-bottom: 3px;
	}
`;

export const WorkSubInfoTable = styled.table`
	width: 100%;
	margin-top: 2%;
	table-layout: auto;

	& > tbody {
		& > tr {
			height: 28px;

			& > td:first-child {
				color: var(--color-dark-gray);
				font-size: 0.75rem;
				font-family: var(--font-nanum-bold);
			}
			& > td:last-child {
				font-size: 0.75rem;
				font-family: var(--font-nanum-bold);
			}
		}
	}
`;

import React from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

const categories = [
	{
		id: "0",
		name: "전체",
		query: "ALL",
	},
	{
		id: "1",
		name: "미술",
		query: "ART",
	},
	{
		id: "2",
		name: "음악",
		query: "MUSIC",
	},
	{
		id: "3",
		name: "무용",
		query: "DANCE",
	},
	{
		id: "4",
		name: "연극영화",
		query: "THEATRE_FILM",
	},
];

const uploadCategories = categories.slice(1, 5);

type StyledProps = {
	selected: boolean;
};

const CategoryMenus = styled.ul`
	width: 100%;
	display: flex;
	align-items: center;
	margin-bottom: 2%;
	overflow-y: scroll;

	& > li:not(:last-child) {
		margin-right: 5%;
	}
`;

const CategoryButton = styled.button`
	white-space: nowrap;
	padding: 8px 20px;
	border-radius: 20px;
	font-size: 0.875rem;
	font-family: var(--font-nanum-bold);
	border: 1px solid ${({ selected }: StyledProps) => (selected ? "var(--color-blue)" : "var(--color-light-gray)")};
	color: ${({ selected }: StyledProps) => (selected ? "var(--color-blue)" : "var(--color-light-gray)")};
	background-color: ${({ selected }: StyledProps) => (selected ? "rgba(2, 101, 249, 0.1)" : "transparent")};

	@media screen and (max-width: 1080px) {
		padding: 6px 15px;
	}

	@media screen and (max-width: 768px) {
		padding: 2vw 4.73vw;
	}

	@media screen and (max-width: 468px) {
		padding: 1.9vw 4.3vw;
	}

	@media screen and (min-width: 1600px) {
		padding: 12px 30px;
	}

	@media screen and (min-width: 1920px) {
		padding: 14px 35px;
	}
`;

type Props = {
	selectedCategory: string;
	setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
};

const WorkCategories = ({ selectedCategory, setSelectedCategory }: Props) => {
	const location = useLocation();

	return (
		<CategoryMenus>
			{location.pathname === "/mypage/upload"
				? uploadCategories.map((category) => (
						<li key={category.id}>
							<CategoryButton
								type="button"
								onClick={() => setSelectedCategory(category.query)}
								selected={selectedCategory === category.query}
							>
								{category.name}
							</CategoryButton>
						</li>
				  ))
				: categories.map((category) => (
						<li key={category.id}>
							<CategoryButton
								type="button"
								onClick={() => setSelectedCategory(category.query)}
								selected={selectedCategory === category.query}
							>
								{category.name}
							</CategoryButton>
						</li>
				  ))}
		</CategoryMenus>
	);
};

export default WorkCategories;

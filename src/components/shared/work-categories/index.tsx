import React from "react";
import { categories, uploadCategories } from "@constants/categories";
import { useLocation } from "react-router-dom";
import { CategoryButton, CategoryMenus } from "./styled";

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
								aria-selected={selectedCategory === category.query}
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
								aria-selected={selectedCategory === category.query}
							>
								{category.name}
							</CategoryButton>
						</li>
				  ))}
		</CategoryMenus>
	);
};

export default WorkCategories;

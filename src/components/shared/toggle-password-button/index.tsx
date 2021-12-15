import React from "react";
import InvisibleEye from "@assets/images/login/invisible_eye.svg";
import VisibleEye from "@assets/images/login/visible_eye.svg";
import styled from "styled-components";

type Props = {
	isPasswordVisible: boolean;
	setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ToggleButton = styled.button`
	background-color: transparent;
	width: 20px;
	height: 20px;
	position: absolute;
	right: 6%;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const TogglePasswordButton = ({ isPasswordVisible, setIsPasswordVisible }: Props) => {
	return (
		<ToggleButton type="button" onClick={() => setIsPasswordVisible((prev) => !prev)}>
			<img src={isPasswordVisible ? VisibleEye : InvisibleEye} alt="show or hide password" />
		</ToggleButton>
	);
};

export default TogglePasswordButton;

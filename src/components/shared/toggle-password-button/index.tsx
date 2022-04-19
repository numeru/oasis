import React from "react";
import InvisibleEye from "assets/images/login/invisible_eye.svg";
import VisibleEye from "assets/images/login/visible_eye.svg";
import styled from "styled-components";

const ToggleButton = styled.button`
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

type Props = {
	isPasswordVisible: boolean;
	setIsPasswordVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const TogglePasswordButton = ({ isPasswordVisible, setIsPasswordVisible }: Props) => {
	return (
		<ToggleButton
			type="button"
			role="switch"
			aria-checked={isPasswordVisible}
			onClick={() => setIsPasswordVisible((prev) => !prev)}
			aria-label="비밀번호 보이기 혹은 숨김"
		>
			<img src={isPasswordVisible ? VisibleEye : InvisibleEye} alt="" />
		</ToggleButton>
	);
};

export default TogglePasswordButton;

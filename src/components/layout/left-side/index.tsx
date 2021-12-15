import React from "react";
import LargeLogo from "@assets/images/layout/oasis_logo_large.svg";

import { LeftContainer, LeftLogo, LeftTitle, LeftDescription } from "./styled";

const Leftside = () => {
	return (
		<LeftContainer>
			<LeftLogo src={LargeLogo} alt="oasis_logo" />
			<LeftTitle>Our Art Story Is</LeftTitle>
			<LeftDescription>오아시스에서 당신의 예술 이야기를 들려주세요</LeftDescription>
		</LeftContainer>
	);
};

export default Leftside;

import React, { ReactNode } from "react";
import Leftside from "components/layout/left-side";
import RightSide from "components/layout/right-side";
import styled from "styled-components";

const LayoutContainer = styled.div`
	display: flex;
	width: 100%;
	height: 100%;
	padding: 0 19% 0 10.5%;

	@media screen and (max-width: 768px) {
		padding: 0;
	}
`;

type Props = {
	children: ReactNode;
};

const OasisLayout = ({ children }: Props) => {
	return (
		<LayoutContainer>
			<Leftside />
			<RightSide>{children}</RightSide>
		</LayoutContainer>
	);
};

export default OasisLayout;

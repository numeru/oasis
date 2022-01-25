import React, { ReactNode, useMemo } from "react";
import Footer from "./footer";
import Header from "./header";
import styled from "styled-components";
import { AlertFailModal, AlertSuccessModal } from "@components/shared/alert-messages/styled";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";

const RightContainer = styled.div`
	width: 45%;
	min-width: 320px;
	height: 100%;
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;

	@media screen and (max-width: 768px) {
		width: 100%;
		min-width: 280px;
	}
`;

type Props = {
	children: ReactNode;
};

const RightSide = ({ children }: Props) => {
	const userSelector = useSelector(selectUser);

	const { responseError, responseErrorMessage, responseSuccess, responseSuccessMessage, checkUserComplete } =
		userSelector;
	const checkUserDone = useMemo(() => checkUserComplete, [checkUserComplete]);

	return (
		<RightContainer>
			{checkUserDone && (
				<>
					<Header />
					{responseSuccess && <AlertSuccessModal role="status">{responseSuccessMessage}</AlertSuccessModal>}
					{responseError && <AlertFailModal role="alert">{responseErrorMessage}</AlertFailModal>}
					{children}
					<Footer />
				</>
			)}
		</RightContainer>
	);
};

export default RightSide;

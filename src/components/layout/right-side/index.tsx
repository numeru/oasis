import React, { ReactNode } from "react";
import Footer from "./footer";
import Header from "./header";
import styled from "styled-components";
import { AlertFailModal, AlertSuccessModal } from "@components/shared/alert-messages/styled";
import { useSelector } from "react-redux";
import { selectUI, selectUser } from "@stores/store";
import { LoadingIndicator, LoadingIndicatorContainer } from "@components/shared/loading-indicator";
import Loadingindicator from "@assets/images/loadingIndicator/loading_indicator.png";
import SubHeader from "./sub-header";

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
	const {
		responseError,
		responseErrorMessage,
		responseSuccess,
		responseSuccessMessage,
		checkUserComplete,
		checkUserLoading,
	} = useSelector(selectUser);

	const { headerType } = useSelector(selectUI);

	return (
		<RightContainer>
			{checkUserLoading ? (
				<LoadingIndicatorContainer>
					<LoadingIndicator src={Loadingindicator} alt="loading" />
				</LoadingIndicatorContainer>
			) : (
				<>
					{checkUserComplete && (
						<>
							{headerType === "default" ? <Header /> : <SubHeader />}
							{responseSuccess && <AlertSuccessModal role="status">{responseSuccessMessage}</AlertSuccessModal>}
							{responseError && <AlertFailModal role="alert">{responseErrorMessage}</AlertFailModal>}
							{children}
							<Footer />
						</>
					)}
				</>
			)}
		</RightContainer>
	);
};

export default RightSide;

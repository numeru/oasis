import React, { ReactNode } from "react";
import { ModalContainer, ModalCard } from "@components/shared/modal/styled";

type Props = {
	children: ReactNode;
};

const Modal = ({ children }: Props) => {
	return (
		<ModalContainer>
			<ModalCard>{children}</ModalCard>
		</ModalContainer>
	);
};

export default Modal;

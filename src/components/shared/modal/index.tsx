import React, { ReactNode } from "react";
import { ModalContainer, ModalCard } from "@components/shared/modal/styled";

type Props = {
	dark?: boolean;
	children: ReactNode;
};

const Modal = ({ dark = false, children }: Props) => {
	return (
		<ModalContainer $dark={dark}>
			<ModalCard>{children}</ModalCard>
		</ModalContainer>
	);
};

export default Modal;

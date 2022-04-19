import React, { useState } from "react";
import SignUpFormService from "services/signup_form_service";
import EmailCertificationForm from "components/features/email-certification/certification-form";
import useTimeOutState from "hooks/useTimeOutState";
import { RESEND_TIME_OUT } from "constants/alert";
import ConfirmModal from "components/shared/confirm-modal";

type Props = {
	signUpFormService: SignUpFormService;
};

const EmailCertification = ({ signUpFormService }: Props) => {
	const [showAlertModal, setShowAlertModal] = useState(false);

	const [isCodeSentAgain, setIsCodeSentAgain] = useTimeOutState(RESEND_TIME_OUT);

	const handleClickConfirmButton = () => {
		setShowAlertModal(false);
	};

	return (
		<>
			<EmailCertificationForm
				signUpFormService={signUpFormService}
				isCodeSentAgain={isCodeSentAgain}
				setIsCodeSentAgain={setIsCodeSentAgain}
				setShowAlertModal={setShowAlertModal}
			/>
			{showAlertModal && (
				<ConfirmModal
					content={`${RESEND_TIME_OUT / 1000}초 후 다시 받기 버튼을 눌러주세요`}
					onConfirm={handleClickConfirmButton}
					dark
				/>
			)}
		</>
	);
};

export default EmailCertification;

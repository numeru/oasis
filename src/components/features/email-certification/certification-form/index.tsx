import React, { useEffect, useState } from "react";
import useInput from "@hooks/useInput";
import { CertificationCancelButton, CompleteSignUpButton, CertificationForm, ResendButton } from "./styled";
import { useHistory, useLocation } from "react-router-dom";
import useCompleteSignUpForm from "@hooks/useCompleteSignUpForm";
import { FormAlertMessage, FormInput, FormLabel } from "@components/shared/form-item/styled";
import SignUpFormService from "@services/signup_form_service";
type Location = {
	from_signup?: boolean;
};

type Props = {
	signUpFormService: SignUpFormService;
	isCodeSentAgain: boolean;
	setIsCodeSentAgain: React.Dispatch<React.SetStateAction<boolean>>;
	setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmailCertificationForm = ({
	signUpFormService,
	isCodeSentAgain,
	setIsCodeSentAgain,
	setShowAlertModal,
}: Props) => {
	const location = useLocation<Location>();

	const history = useHistory();

	useEffect(() => {
		if (location.state?.from_signup !== true) {
			history.replace("/");
		}
	}, [location]);

	const [certificationCode, handleCertificationCode] = useInput("");
	const [isValid, setIsValid] = useState(true);

	const handleSubmitForm = useCompleteSignUpForm(signUpFormService, certificationCode, setIsValid);

	const handleClickResendButton = () => {
		if (isCodeSentAgain) {
			setShowAlertModal(true);
			return;
		}
		setIsCodeSentAgain(true);
	};

	return (
		<CertificationForm onSubmit={handleSubmitForm}>
			<p>
				입력하신 이메일 주소로
				<br />
				6자리 인증번호를 발송했어요
			</p>
			<p>이메일이 안보인다면 스팸함/휴지통을 확인해주세요</p>
			<FormLabel htmlFor="email_certification_code">인증번호</FormLabel>
			<div>
				<FormInput
					id="email_certification_code"
					value={certificationCode}
					onChange={handleCertificationCode}
					placeholder="인증번호를 입력해주세요"
					aria-required="true"
					aria-invalid={!isValid}
					aria-errormessage="certification_code_validation_error_message"
				/>
				<ResendButton type="button" onClick={handleClickResendButton}>
					다시 받기
				</ResendButton>
			</div>

			{!isValid && (
				<FormAlertMessage id="certification_code_validation_error_message" role="alert">
					인증번호를 입력해주세요
				</FormAlertMessage>
			)}

			<CompleteSignUpButton type="submit">회원가입</CompleteSignUpButton>
			<CertificationCancelButton to="/signup">돌아가기</CertificationCancelButton>
		</CertificationForm>
	);
};

export default EmailCertificationForm;

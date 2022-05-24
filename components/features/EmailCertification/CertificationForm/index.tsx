import { useState } from 'react';
import useInput from 'hooks/useInput';
import { CompleteSignUpButton, CertificationForm, ResendButton } from './styled';
import useCompleteSignUpForm from 'components/features/EmailCertification/CertificationForm/useCompleteSignUpForm';
import { FormAlertMessage, FormInput, FormLabel } from 'components/shared/FormItem/styled';
import useTimeOutState from 'hooks/useTimeOutState';
import { RESEND_TIME_OUT } from 'constants/alert';

type Props = {
	setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const EmailCertificationForm = ({ setShowAlertModal }: Props) => {
	const [certificationCode, handleCertificationCode] = useInput('');

	const [isValid, setIsValid] = useState(true);

	const handleSubmitForm = useCompleteSignUpForm(certificationCode, setIsValid);

	const [isCodeSentAgain, setIsCodeSentAgain] = useTimeOutState(RESEND_TIME_OUT);

	const handleClickResendButton = () => {
		if (isCodeSentAgain) {
			setShowAlertModal(true);
			return;
		}

		// 인증 번호 재전송 로직

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
		</CertificationForm>
	);
};

export default EmailCertificationForm;

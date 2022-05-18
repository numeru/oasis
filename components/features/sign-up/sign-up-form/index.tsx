import { SignUpButton, SignUpCancelButton, SignUpFormCheckBox, SignUpFormContainer } from './styled';
import { AlertFailModal } from 'components/shared/alert-messages/styled';
import useSignUpFormValidation from 'components/features/sign-up/sign-up-form/useSignUpFormValidation';
import FormItem from 'components/shared/form-item';
import { useSelector } from 'react-redux';
import { selectSignUp } from 'stores/store';
import useInput from 'hooks/useInput';

const SignUpForm = () => {
	const {
		email: storedEmail,
		password: storedPassword,
		passwordConfirm: storedPasswordConfirm,
		name: storedName,
		privacy: storedPrivacy,
		terms: storedTerms,
		marketing: storedMarketing,
	} = useSelector(selectSignUp);

	const [email, handleEmail] = useInput(storedEmail);

	const [password, handlePassword] = useInput(storedPassword);

	const [passwordConfirm, handlePasswordConfirm] = useInput(storedPasswordConfirm);

	const [name, handleName] = useInput(storedName);

	const [privacy, handlePrivacy] = useInput(storedPrivacy, 'checkbox');

	const [terms, handleTerms] = useInput(storedTerms, 'checkbox');

	const [marketing, handleMarketing] = useInput(storedMarketing, 'checkbox');

	const [
		emailValidation,
		passwordValidation,
		passwordConfirmValidation,
		nameValidation,
		agreementValidation,
		handleSumbitSignUpForm,
	] = useSignUpFormValidation(email, password, passwordConfirm, name, privacy, terms, marketing);

	return (
		<>
			{!agreementValidation.valid && <AlertFailModal role="alert">{agreementValidation.message}</AlertFailModal>}
			<SignUpFormContainer onSubmit={handleSumbitSignUpForm}>
				<ul>
					<FormItem
						id="signup_email"
						label="이메일*"
						type="text"
						placeholder="사용 가능한 이메일을 입력해주세요"
						value={email}
						handleChange={handleEmail}
						isValid={emailValidation.valid}
						validationMessage={emailValidation.message}
						required
					/>

					<FormItem
						id="signup_password"
						label="비밀번호*"
						type="password"
						placeholder="8자 이상 영문/숫자 포함해서 입력해주세요"
						value={password}
						handleChange={handlePassword}
						isValid={passwordValidation.valid}
						validationMessage={passwordValidation.message}
						required
					/>

					<FormItem
						id="signup_password_confirm"
						label="비밀번호 확인*"
						type="password"
						placeholder="비밀번호를 다시 입력해주세요"
						value={passwordConfirm}
						handleChange={handlePasswordConfirm}
						isValid={passwordConfirmValidation.valid}
						validationMessage={passwordConfirmValidation.message}
						required
					/>

					<FormItem
						id="signup_name"
						label="이름*"
						type="text"
						placeholder="실명을 입력해주세요"
						value={name}
						handleChange={handleName}
						isValid={nameValidation.valid}
						validationMessage={nameValidation.message}
						required
					/>
				</ul>

				<ul>
					<li>
						<SignUpFormCheckBox>
							<input
								type="checkbox"
								checked={privacy}
								onChange={handlePrivacy}
								aria-required="true"
								aria-checked={privacy}
							/>
							[필수] 개인정보처리방침에 동의합니다
							<span>&gt;</span>
						</SignUpFormCheckBox>
					</li>
					<li>
						<SignUpFormCheckBox>
							<input type="checkbox" checked={terms} onChange={handleTerms} aria-required="true" aria-checked={terms} />
							[필수] 이용약관에 동의합니다
							<span>&gt;</span>
						</SignUpFormCheckBox>
					</li>
					<li>
						<SignUpFormCheckBox>
							<input
								type="checkbox"
								checked={marketing}
								onChange={handleMarketing}
								aria-required="true"
								aria-checked={marketing}
							/>
							[선택] 마케팅정보수신에 동의합니다
							<span>&gt;</span>
						</SignUpFormCheckBox>
					</li>
				</ul>

				<SignUpButton type="submit">회원가입</SignUpButton>
				<SignUpCancelButton href="/login">돌아가기</SignUpCancelButton>
			</SignUpFormContainer>
		</>
	);
};

export default SignUpForm;

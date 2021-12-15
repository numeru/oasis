import React, { useState } from "react";
import { SignUpFormInput } from "@components/features/sign-up/sign-up-form/styled";
import styled from "styled-components";
import { FormConfirmButton } from "@components/shared/form-buttons/styled";
import useInput from "@hooks/useInput";

const CheckValidationForm = styled.form`
	padding: 0 6.1% 120% 6.1%;
	width: 100%;
	& > p {
		&:nth-child(1) {
			font-size: 1.125rem;
			margin: 0 0 3.8% 0;
			line-height: 30px;
			font-family: var(--font-nanum-bold);
		}

		&:nth-child(2) {
			font-size: 0.75rem;
			color: var(--color-dark-gray);
			margin: 0 0 4.1% 0;
		}
	}
`;

const CheckValidationButton = styled(FormConfirmButton)`
	width: 100%;
	margin-top: 11.3%;
`;

const ValidationAlertMessage = styled.p`
	font-size: 0.75rem;
	color: var(--color-red);
	padding-left: 2%;
	margin: 1.4% 0 0 0;
`;

const CheckValidation = () => {
	const [validNumber, setValidNumber] = useInput("");
	const [isValid, setIsValid] = useState(true);

	const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!validNumber.trim()) return;
	};

	return (
		<CheckValidationForm onSubmit={handleSubmitForm}>
			<p>
				입력하신 이메일 주소로
				<br />
				6자리 인증번호를 발송했어요
			</p>
			<p>이메일이 안보인다면 스팸함/휴지통을 확인해주세요</p>
			<SignUpFormInput value={validNumber} onChange={setValidNumber} placeholder="인증번호를 입력해주세요" />
			{!isValid && <ValidationAlertMessage>인증번호를 다시 입력해주세요</ValidationAlertMessage>}
			<CheckValidationButton type="submit">회원가입</CheckValidationButton>
		</CheckValidationForm>
	);
};

export default CheckValidation;

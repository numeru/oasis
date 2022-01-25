import React from "react";
import FormItem from "@components/shared/form-item";
import useInput from "@hooks/useInput";
import styled from "styled-components";
import { FormConfirmButton } from "@components/shared/form-buttons/styled";
import useInitPassword from "@hooks/useInitPassword";

const InitializationFormContainer = styled.form`
	width: 100%;
	padding: 0 6%;
`;

const InitButton = styled(FormConfirmButton)`
	width: 100%;
`;

type Props = {
	showConfirmModal: () => void;
};

const InitializationPasswordForm = ({ showConfirmModal }: Props) => {
	const [email, handleEmail] = useInput("");

	const [name, handleName] = useInput("");

	const [emailValidation, nameValidation, handleSubmitInitForm] = useInitPassword(email, name, showConfirmModal);

	return (
		<InitializationFormContainer onSubmit={handleSubmitInitForm}>
			<ul>
				<FormItem
					id="init_pw_email"
					label="이메일"
					type="text"
					placeholder="이메일을 입력해주세요"
					value={email}
					handleChange={handleEmail}
					isValid={emailValidation}
					validationMessage="이메일을 입력해주세요"
					required
				/>

				<FormItem
					id="init_pw_name"
					label="이름"
					type="text"
					placeholder="이름을 입력해주세요"
					value={name}
					handleChange={handleName}
					isValid={nameValidation}
					validationMessage="이름을 입력해주세요"
					required
				/>
			</ul>

			<InitButton type="submit">비밀번호 재설정</InitButton>
		</InitializationFormContainer>
	);
};

export default InitializationPasswordForm;

import React, { useState, useRef, useMemo } from "react";
import { UserUploadFile } from "@utils/types";
import {
	UploadSchoolIdCardForm,
	SchoolIdCardUploadButton,
	SchoolIdCardUploadBox,
	UplodedStudentIdCardImage,
	SubmitSchoolIdCardButton,
	SchoolIdCardDeleteButton,
} from "./styled";
import { InvisibleFileInput } from "@components/shared/invisible-file-input/styled";
import { AlertFailModal } from "@components/shared/alert-messages/styled";
import useTimeOutState from "@hooks/useTimeOutState";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import UserService from "@apis/user/user-service";
import { responseErrorWarning } from "@stores/slices/user-slice";
import { TOKEN_ERROR } from "@apis/errors";
import { throwTokenError } from "@stores/slices/user-slice";

type Props = {
	userService: UserService;
};
const SchoolCertificationForm = ({ userService }: Props) => {
	const [studentIdCardImage, setStudentIdCardImage] = useState<UserUploadFile | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [fileSubmit, setFileSubmit] = useTimeOutState();
	const history = useHistory();
	const dispatch = useDispatch();

	const uploadStudentIdCard = (e: React.ChangeEvent<HTMLInputElement>) => {
		const studentIdCardList = e.target.files;

		if (studentIdCardList && studentIdCardList[0]) {
			const url = URL.createObjectURL(studentIdCardList[0]);
			setStudentIdCardImage({
				file: studentIdCardList[0],
				thumbnail: url,
				type: studentIdCardList[0].type.slice(0, 5),
			});

			if (fileInputRef.current) fileInputRef.current.value = "";
		}
	};

	const showStudentIdCard = useMemo(() => {
		if (!studentIdCardImage) {
			return (
				<SchoolIdCardUploadButton type="button" onClick={() => fileInputRef.current?.click()}>
					학생증 업로드
				</SchoolIdCardUploadButton>
			);
		}
		return (
			<UplodedStudentIdCardImage
				src={studentIdCardImage.thumbnail}
				alt="student_id_card"
				onClick={() => fileInputRef.current?.click()}
			/>
		);
	}, [studentIdCardImage]);

	const handleSubmitSchoolIdForm = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setFileSubmit(true);

		if (!studentIdCardImage) return;

		handleSchoolCertifying();
	};

	const handleSchoolCertifying = async () => {
		try {
			if (!studentIdCardImage) return;

			const {
				statusCode,
				data: { message },
			} = await userService.certifySchool(studentIdCardImage.file);

			if (statusCode >= 400) {
				dispatch(responseErrorWarning(message || "잠시 후 다시 시도해주세요"));
				return;
			}

			if (statusCode <= 200) {
				history.push("/settings/certification/result");
			}
		} catch (error: any) {
			if (error?.message === TOKEN_ERROR) {
				dispatch(throwTokenError());
				return;
			}
			dispatch(responseErrorWarning("잠시 후 다시 시도해주세요"));
		}
	};

	return (
		<UploadSchoolIdCardForm onSubmit={handleSubmitSchoolIdForm}>
			{!studentIdCardImage && fileSubmit && <AlertFailModal>학생증을 업로드 해주세요</AlertFailModal>}

			{studentIdCardImage && (
				<SchoolIdCardDeleteButton type="button" onClick={() => setStudentIdCardImage(null)}>
					삭제하기
				</SchoolIdCardDeleteButton>
			)}
			<SchoolIdCardUploadBox empty={studentIdCardImage === null}>{showStudentIdCard}</SchoolIdCardUploadBox>

			<InvisibleFileInput
				type="file"
				accept="image/jpg, image/jpeg, image/png"
				ref={fileInputRef}
				onChange={uploadStudentIdCard}
			/>

			<SubmitSchoolIdCardButton type="submit">저장하기</SubmitSchoolIdCardButton>
		</UploadSchoolIdCardForm>
	);
};

export default SchoolCertificationForm;

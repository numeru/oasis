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
import useSchoolCertification from "@hooks/useSchoolCertification";
import { imageTypeFormatter } from "@utils/formatter";

const SchoolCertificationForm = () => {
	const [studentIdCardImage, setStudentIdCardImage] = useState<UserUploadFile | null>(null);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [isFormSubmitted, setIsFormSubmitted] = useState(false);

	const uploadStudentIdCard = (e: React.ChangeEvent<HTMLInputElement>) => {
		const studentIdCardList = e.target.files;

		if (studentIdCardList && studentIdCardList[0]) {
			const url = URL.createObjectURL(studentIdCardList[0]);
			setStudentIdCardImage({
				file: studentIdCardList[0],
				thumbnail: url,
				type: imageTypeFormatter(studentIdCardList[0].type),
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
				alt="업로드 한 내 학생증 이미지 미리보기"
				onClick={() => fileInputRef.current?.click()}
			/>
		);
	}, [studentIdCardImage]);

	const handleSubmitSchoolIdForm = useSchoolCertification(studentIdCardImage, setIsFormSubmitted);

	return (
		<>
			{!studentIdCardImage && isFormSubmitted && (
				<AlertFailModal id="school_id_card_error_message" role="alert">
					학생증을 업로드 해주세요
				</AlertFailModal>
			)}
			<UploadSchoolIdCardForm onSubmit={handleSubmitSchoolIdForm}>
				{studentIdCardImage && (
					<SchoolIdCardDeleteButton type="button" onClick={() => setStudentIdCardImage(null)}>
						삭제하기
					</SchoolIdCardDeleteButton>
				)}

				<label htmlFor="school_id_card_input" className="a11y-hidden">
					학생증 업로드 인풋
				</label>
				<InvisibleFileInput
					id="school_id_card_input"
					type="file"
					accept="image/jpg, image/jpeg, image/png"
					ref={fileInputRef}
					onChange={uploadStudentIdCard}
					aria-required="true"
					aria-invalid={!studentIdCardImage && isFormSubmitted}
					aria-errormessage="school_id_card_error_message"
				/>

				<SchoolIdCardUploadBox empty={studentIdCardImage === null}>{showStudentIdCard}</SchoolIdCardUploadBox>

				<SubmitSchoolIdCardButton type="submit">저장하기</SubmitSchoolIdCardButton>
			</UploadSchoolIdCardForm>
		</>
	);
};

export default SchoolCertificationForm;

import React from "react";
import SchoolCertificationForm from "components/features/school-certification/school-certification-form";
import { Redirect } from "react-router-dom";
import ExampleschoolIdCard from "assets/images/school-certification/school_id_example.png";
import { useSelector } from "react-redux";
import { selectUser } from "stores/store";
import { SchoolCertificationContainer, SchoolCertificationExampleImage, SchoolCertificationHeader } from "./styled";
import { USER_UNIVERSITY_NO_VERIFICATION } from "constants/user";

const SchoolCertification = () => {
	const userSelector = useSelector(selectUser);
	const { checkUserComplete, isLogin, universityVerify } = userSelector;

	if (checkUserComplete && !isLogin) {
		return <Redirect to="/login" />;
	}

	if (universityVerify !== USER_UNIVERSITY_NO_VERIFICATION) {
		return <Redirect to="/settings/certification/result" />;
	}

	return (
		<SchoolCertificationContainer>
			<SchoolCertificationHeader>
				<h2>학교 인증하기</h2>
				<p>아래와 같이 가로로 찍은 학생증 사진을 업로드해주세요</p>
			</SchoolCertificationHeader>
			<SchoolCertificationExampleImage src={ExampleschoolIdCard} alt="학생증 예시 - 앞면이 전부 보이는 이미지" />
			<SchoolCertificationForm />
		</SchoolCertificationContainer>
	);
};

export default SchoolCertification;

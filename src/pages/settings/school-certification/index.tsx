import React from "react";
import SchoolCertificationForm from "@components/features/school-certification/school-certification-form";
import styled from "styled-components";
import { Redirect, Route, Switch } from "react-router";
import ExampleschoolIdCard from "@assets/images/school-certification/school_id_example.png";
import CertificationResult from "@pages/settings/school-certification/result";
import { useSelector } from "react-redux";
import { selectUser } from "@stores/store";
import UserService from "@apis/user/user-service";

const SchoolCertificationContainer = styled.main`
	width: 100%;
	padding: 5%;
	display: flex;
	flex-direction: column;
	align-items: center;
	padding-bottom: 100%;
`;

export const SchoolCertificationHeader = styled.header`
	width: 100%;
	margin-bottom: 6%;

	& > h2 {
		font-size: 1.3rem;
		margin: 0 0 5% 0;
		font-family: var(--font-nanum-bold);
	}

	& > p {
		font-size: 0.875rem;
		color: #848484;
		margin: 0;
	}
`;
export const SchoolCertificationExampleImage = styled.img`
	width: 50%;
	height: auto;
	margin-bottom: 8%;
	background-color: transparent;
`;

type Props = {
	userService: UserService;
};
const SchoolCertification = ({ userService }: Props) => {
	const userSelector = useSelector(selectUser);
	const { checkUserComplete, isLogin, universityVerify } = userSelector;

	if (checkUserComplete && !isLogin) {
		return <Redirect to="/login" />;
	}

	if (universityVerify !== "NO_VERIFICATION") {
		return <Redirect to="/settings/certification/result" />;
	}

	return (
		<SchoolCertificationContainer>
			<SchoolCertificationHeader>
				<h2>학교 인증하기</h2>
				<p>아래와 같이 가로로 찍은 학생증 사진을 업로드해주세요</p>
			</SchoolCertificationHeader>
			<SchoolCertificationExampleImage src={ExampleschoolIdCard} alt="example_school_id_card" />
			<SchoolCertificationForm userService={userService} />
		</SchoolCertificationContainer>
	);
};

export default SchoolCertification;

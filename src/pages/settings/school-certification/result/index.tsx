import React from "react";
import SubmitOnGoing from "assets/images/school-certification/ongoing.png";
import SubmitComplete from "assets/images/school-certification/complete.png";
import { useSelector } from "react-redux";
import { selectUser } from "stores/store";
import { CertificationResultBox, CertificationResultContainer } from "./styled";
import { USER_UNIVERSITY_VERIFICATION } from "constants/user";

const CertificationResult = () => {
	const userSelector = useSelector(selectUser);
	const { universityVerify, universityName, universityMajor } = userSelector;

	return (
		<CertificationResultContainer>
			<h2>학교 인증하기</h2>
			<CertificationResultBox aria-labelledby="settings_school_certification_label">
				{universityVerify === USER_UNIVERSITY_VERIFICATION ? (
					<>
						<img src={SubmitComplete} alt="" />
						<h3 id="settings_school_certification_label">학교 인증 완료</h3>
						<p>
							{universityName} {universityMajor}
						</p>
					</>
				) : (
					<>
						<img src={SubmitOnGoing} alt="" />
						<h3 id="settings_school_certification_label">학교 인증 검토 중</h3>
						<p>
							등록해주신 학생증을 참고하여 인증 검토 중이에요
							<br />
							빠른 시일내로 알려 드릴게요
						</p>
					</>
				)}
			</CertificationResultBox>
		</CertificationResultContainer>
	);
};

export default CertificationResult;

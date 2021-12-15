import React from "react";
import InstaLogo from "@assets/images/layout/instagram_logo.svg";
import {
	LayoutFooter,
	FooterInstaButton,
	FooterInstaLogo,
	FooterOptionList,
	FooterOptionButton,
	FooterCompanyInfo,
	FooterCopyright,
} from "./styled";

const Footer = () => {
	const handleClickTerms = () => {
		window.open("https://o4sis.notion.site/63695a4efa6747d196f0719a70f01da4", "_blank");
	};

	const handleClickPrivacy = () => {
		window.open("https://o4sis.notion.site/29f600ddaab743588efaab094e53d7ff", "_blank");
	};

	const handleClickInstagram = () => {
		window.open("https://www.instagram.com/o4sis_official", "_blank");
	};

	const handleOpenMail = () => {
		window.open("mailto:oasis.yeha@gmail.com", "_blank");
	};

	return (
		<LayoutFooter>
			<FooterInstaButton role="link" onClick={handleClickInstagram}>
				<FooterInstaLogo src={InstaLogo} alt="" />
			</FooterInstaButton>

			<FooterOptionList>
				<li>
					<FooterOptionButton role="link" onClick={handleClickPrivacy}>
						개인정보처리방침
					</FooterOptionButton>
				</li>
				<li>
					<FooterOptionButton role="link" onClick={handleClickTerms}>
						이용약관
					</FooterOptionButton>
				</li>
				<li>
					<FooterOptionButton role="link" onClick={handleOpenMail}>
						문의하기
					</FooterOptionButton>
				</li>
			</FooterOptionList>
			<FooterCompanyInfo>
				(주) YEHA <br />
				대표 조혜림 <br />
				사업자등록번호 01-1234-1234
				<br />
				통신판매업 신고번호 12341234
				<br />
				서울특별시 강남구 압구정로 빌딩 123-4
			</FooterCompanyInfo>
			<FooterCopyright>All rights reserved</FooterCopyright>
		</LayoutFooter>
	);
};

export default Footer;

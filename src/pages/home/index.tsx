import React, { useEffect } from "react";
import FeedList from "@components/features/home/feed-list";
import { Banner } from "@assets/device-images";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { responseSuccessGuide } from "@stores/slices/user-slice";
import { HomeBanner, HomeContainer } from "./styled";
import Picture from "@components/shared/picture";

type Location = {
	signup_success?: boolean;
	login_success?: boolean;
};

const Home = () => {
	const location = useLocation<Location>();

	const history = useHistory();

	const dispatch = useDispatch();

	useEffect(() => {
		if (location.state?.signup_success) {
			dispatch(responseSuccessGuide("회원가입 성공! 반가워요 :)"));
			history.replace(location.pathname, null);
			return;
		}
		if (location.state?.login_success) {
			dispatch(responseSuccessGuide("로그인 성공! 오아시스에 오신 걸 환영해요"));
			history.replace(location.pathname, null);
			return;
		}
	}, [location]);

	const handleClickBanner = () => {
		window.open(
			"https://o4sis.notion.site/19df71865e5149b898db49068763b464?v=cdbeac27833c4840809963fa1c8c6224",
			"_blank",
			"noopener",
		);
	};

	return (
		<>
			<HomeBanner type="button" onClick={handleClickBanner} aria-label="오아시스 서비스 소개 배너">
				<Picture type="png" minType="webp" image={Banner} alt="" />
			</HomeBanner>
			<HomeContainer>
				<FeedList />
			</HomeContainer>
		</>
	);
};

export default Home;

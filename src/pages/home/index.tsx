import React, { useEffect } from "react";
import FeedList from "@components/features/home/feed-list";
import styled from "styled-components";
import Banner from "@assets/images/home/oasis_banner.png";
import { useHistory, useLocation } from "react-router";
import { useDispatch } from "react-redux";
import { responseSuccessGuide } from "@stores/slices/user-slice";

const HomeBanner = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5.6%;
	padding: 0 3.3%;
	width: 100%;
	border-radius: 24px;
	background-color: transparent;

	& > img {
		width: 100%;
		height: auto;
		border-radius: 24px;
	}
`;

const HomeContainer = styled.main`
	width: 100%;
	padding: 5.6% 3.3%;
`;

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
		);
	};

	return (
		<>
			<HomeBanner type="button" role="link" onClick={handleClickBanner}>
				<img src={Banner} alt="" />
			</HomeBanner>
			<HomeContainer>
				<FeedList />
			</HomeContainer>
		</>
	);
};

export default Home;

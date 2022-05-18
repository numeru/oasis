import type { InferGetServerSidePropsType } from 'next';
import { GetServerSideProps } from 'next';
import FeedList from 'components/features/home/feed-list';
import { useDispatch } from 'react-redux';
import { responseSuccessGuide } from 'stores/slices/user-slice';
import styled from 'styled-components';
import Banner from 'assets/images/home/oasis_banner@2x.png';
import { useEffect } from 'react';
import API_URL, { API_HOST } from 'apis/api';
import axios from 'axios';
import { AMOUNT_OF_DATA_AT_ONCE } from 'constants/swr';
import { HomeFeed } from 'types/work';
import Image from 'next/image';
import WithAuth from 'utils/HOC/withAuth';

export const HomeBanner = styled.button`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: 5.6%;
	padding: 0 3.3%;
	width: 100%;
	border-radius: 24px;
	background-color: transparent;
`;

export const HomeContainer = styled.main`
	width: 100%;
	padding: 5.6% 3.3%;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { query } = context;

	const {
		feed: { basic },
	} = API_URL;

	const feedFallbackData: HomeFeed[] = await axios
		.get(`${API_HOST}${basic}?category=ALL&page=0&size=${AMOUNT_OF_DATA_AT_ONCE}`)
		.then((response) => response.data.artLogSummaryList);

	if (!query) {
		return {
			props: { query: null, feedFallbackData },
		};
	}

	return {
		props: { query, feedFallbackData },
	};
};

const Home = ({ query, feedFallbackData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (query?.signup_success) {
			dispatch(responseSuccessGuide('회원가입 성공! 반가워요 :)'));
			return;
		}
		if (query?.login_success) {
			dispatch(responseSuccessGuide('로그인 성공! 오아시스에 오신 걸 환영해요'));
			return;
		}
	}, []);

	const handleClickBanner = () => {
		window.open(
			'https://o4sis.notion.site/19df71865e5149b898db49068763b464?v=cdbeac27833c4840809963fa1c8c6224',
			'_blank',
			'noopener',
		);
	};

	return (
		<>
			<HomeBanner type="button" onClick={handleClickBanner} aria-label="오아시스 서비스 소개 배너">
				<Image src={Banner} alt="" />
			</HomeBanner>
			<HomeContainer>
				<FeedList feedFallbackData={feedFallbackData} />
			</HomeContainer>
		</>
	);
};

export default WithAuth(Home);

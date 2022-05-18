import { useState } from 'react';
import styled from 'styled-components';
import WorkDetailContent from 'components/features/detail/work-detail-content';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { ParsedUrlQuery } from 'querystring';
import axios from 'axios';
import API_URL, { API_HOST } from 'apis/api';
import SubHeader from 'components/layout/right-side/sub-header';
import wrapper, { selectUser } from 'stores/store';
import { WorkDetailInfo } from 'types/work';
import { changeHeader } from 'stores/slices/ui-slice';
import useChangeHeader from 'hooks/useChangeHeader';
import { useSelector } from 'react-redux';

const DetailContainer = styled.main`
	width: 100%;
	padding: 5.7% 1.9% 30% 1.9%;
`;

interface IParams extends ParsedUrlQuery {
	workId: string;
}

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
	const { workId } = context.params as IParams;

	const {
		work: { basic },
	} = API_URL;

	try {
		const workDetailData: WorkDetailInfo = await axios
			.get(`${API_HOST}${basic}/${workId}`)
			.then((response) => response.data);

		store.dispatch(changeHeader('sub'));

		return {
			props: { workDetailData },
		};
	} catch (error) {
		store.dispatch(changeHeader('default'));

		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
});

const WorkDetail = ({ workDetailData }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
	useChangeHeader('sub');

	const { uuid } = useSelector(selectUser);

	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const handleClickDeleteWorkButton = () => {
		setShowDeleteModal(true);
	};

	const handleClickCancelButton = () => {
		setShowDeleteModal(false);
	};

	return (
		<>
			<SubHeader
				buttonName="삭제"
				buttonType="button"
				clickFn={handleClickDeleteWorkButton}
				isButtonVisible={workDetailData.user?.userUuid === uuid}
			/>
			<DetailContainer>
				<WorkDetailContent
					workDetailData={workDetailData}
					showDeleteModal={showDeleteModal}
					handleClickCancelButton={handleClickCancelButton}
				/>
			</DetailContainer>
		</>
	);
};

export default WorkDetail;

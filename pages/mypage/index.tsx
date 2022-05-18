import styled from 'styled-components';
import MyInfo from 'components/features/mypage/my-info';
import MyWorks from 'components/features/mypage/my-works';
import WithAuth from 'utils/HOC/withAuth';

export const MyPageContainer = styled.main`
	width: 100%;
	height: 100%;
	padding: 4.7% 3.8%;
	display: flex;
	flex-direction: column;
	align-items: center;
`;

const MyPage = () => {
	return (
		<MyPageContainer>
			<MyInfo />
			<MyWorks />
		</MyPageContainer>
	);
};

export default WithAuth(MyPage, true);

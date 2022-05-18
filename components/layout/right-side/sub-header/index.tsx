import styled from 'styled-components';
import ArrowBackIcon from 'assets/images/mypage/arrow_back_icon.svg';
import { useRouter } from 'next/router';

export const SubHeaderContainer = styled.header`
	position: sticky;
	top: 0;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background-color: white;
	padding: 2.8% 16px 2.8% 21px;
	border-bottom: 0.2px solid #868585;
	z-index: 5;

	& > button {
		&:first-child {
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: transparent;
			padding: 0;
		}
		&:not(:first-child) {
			color: white;
			background-color: var(--color-blue);
			font-size: 0.875rem;
			padding: 7px 13px;
			border-radius: 4px;
		}
	}
`;

type Props = {
	buttonName: string;
	buttonType: 'button' | 'submit';
	clickFn: any;
	isButtonVisible: boolean;
};

const SubHeader = ({ buttonName, buttonType, clickFn, isButtonVisible }: Props) => {
	const Router = useRouter();

	const backToPrevPage = () => {
		Router.back();
	};

	return (
		<SubHeaderContainer>
			<button type="button" onClick={backToPrevPage}>
				<ArrowBackIcon alt="돌아가기" />
			</button>
			{isButtonVisible && (
				<button type={buttonType} onClick={clickFn}>
					{buttonName}
				</button>
			)}
		</SubHeaderContainer>
	);
};

export default SubHeader;

import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { useSelector } from 'react-redux';
import { LayoutContainer } from 'components/layout/styled';
import Leftside from 'components/layout/left-side';
import { RightContainer } from 'components/layout/right-side/styled';
import Footer from 'components/layout/right-side/footer';
import Header from 'components/layout/right-side/header';
import { AlertFailModal, AlertSuccessModal } from 'components/shared/alert-messages/styled';
import wrapper, { selectUser } from 'stores/store';

function MyApp({ Component, pageProps }: AppProps) {
	const { responseError, responseErrorMessage, responseSuccess, responseSuccessMessage } = useSelector(selectUser);

	return (
		<>
			<LayoutContainer>
				<Leftside />
				<RightContainer>
					<Header />
					{responseSuccess && <AlertSuccessModal role="status">{responseSuccessMessage}</AlertSuccessModal>}
					{responseError && <AlertFailModal role="alert">{responseErrorMessage}</AlertFailModal>}
					<Component {...pageProps} />
					<Footer />
				</RightContainer>
			</LayoutContainer>
		</>
	);
}

export default wrapper.withRedux(MyApp);

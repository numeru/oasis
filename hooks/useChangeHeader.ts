import { useEffect } from 'react';
import { changeHeader, initHeader } from 'stores/slices/ui-slice';
import { useDispatch } from 'react-redux';
import { HeaderType } from 'types/header';

const useChangeHeader = (headerType: HeaderType) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(changeHeader(headerType));
		return () => {
			dispatch(initHeader());
		};
	}, []);
};

export default useChangeHeader;

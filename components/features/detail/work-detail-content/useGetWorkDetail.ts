import { useMemo } from 'react';
import { WorkDetailInfo } from 'types/work';
import { useSelector } from 'react-redux';
import { selectUser } from 'stores/store';
import { COPYRIGHT_INSTRUCTIONS } from 'constants/copyright';

type ReturnTypes = [boolean, string[]];

const useGetWorkDetail = (workDetailData: WorkDetailInfo): ReturnTypes => {
	const { uuid } = useSelector(selectUser);

	const isMine = useMemo(() => workDetailData.user?.userUuid === uuid, [workDetailData, uuid]);

	const cclInstruction = useMemo(() => {
		if (!workDetailData) return [];

		const { cclType } = workDetailData;

		if (cclType === null) return ['자유롭게 이용 가능'];

		const { cclCommercialType, contentModifyType } = cclType;

		return [
			'저작자 표시',
			cclCommercialType ? COPYRIGHT_INSTRUCTIONS[cclCommercialType] : '',
			contentModifyType ? COPYRIGHT_INSTRUCTIONS[contentModifyType] : '',
		].filter((ccl) => ccl !== '');
	}, [workDetailData]);

	return [isMine, cclInstruction];
};

export default useGetWorkDetail;

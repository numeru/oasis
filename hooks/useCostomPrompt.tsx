import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type PromptLocation = {
	hash: string;
	key?: string;
	pathname: string;
	search: string;
	state: unknown;
};

type ReturnType = [
	(promptLocation: PromptLocation) => boolean,
	Dispatch<SetStateAction<boolean>>,
	boolean,
	Dispatch<SetStateAction<boolean>>,
];

const useCustomPrompt = (setShowAlertModal: Dispatch<SetStateAction<boolean>>): ReturnType => {
	const [leavePage, setLeavePage] = useState(false);
	const [isEdited, setIsEdited] = useState(false);
	const [nextLocation, setNextLocation] = useState('');

	const Router = useRouter();

	useEffect(() => {
		if (leavePage) {
			Router.push(`${nextLocation}`);
		}
	}, [leavePage]);

	const handlePrompt = (promptLocation: PromptLocation) => {
		if (!leavePage && isEdited) {
			setNextLocation(promptLocation.pathname);
			setShowAlertModal(true);
			return false;
		}
		return true;
	};

	return [handlePrompt, setLeavePage, isEdited, setIsEdited];
};

export default useCustomPrompt;

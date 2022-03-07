import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

type PromptLocation = {
	hash: string;
	key?: string;
	pathname: string;
	search: string;
	state: unknown;
};

type ReturnType = [
	(promptLocation: PromptLocation) => boolean,
	React.Dispatch<React.SetStateAction<boolean>>,
	boolean,
	React.Dispatch<React.SetStateAction<boolean>>,
];

const useCustomPrompt = (setShowAlertModal: React.Dispatch<React.SetStateAction<boolean>>): ReturnType => {
	const history = useHistory();

	const [leavePage, setLeavePage] = useState(false);
	const [isEdited, setIsEdited] = useState(false);
	const [nextLocation, setNextLocation] = useState("");

	useEffect(() => {
		if (leavePage) {
			history.push(`${nextLocation}`);
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

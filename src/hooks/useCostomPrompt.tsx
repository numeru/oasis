import React, { useState, useEffect } from "react";
import { Prompt, useHistory } from "react-router-dom";

type PromptLocation = {
	hash: string;
	key?: string;
	pathname: string;
	search: string;
	state: unknown;
};

type ReturnType = [
	() => JSX.Element,
	React.Dispatch<React.SetStateAction<boolean>>,
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

	const handlePrompt = (location: PromptLocation) => {
		if (!leavePage && isEdited) {
			setNextLocation(location.pathname);
			setShowAlertModal(true);
			return false;
		}
		return true;
	};

	const showPrompt = () => {
		return <Prompt when={true} message={handlePrompt} />;
	};

	return [showPrompt, setLeavePage, setIsEdited];
};

export default useCustomPrompt;

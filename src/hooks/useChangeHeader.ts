import React, { useEffect } from "react";
import { changeHeader, initHeader } from "@stores/slices/ui-slice";
import { useDispatch } from "react-redux";

type HeaderInfo = {
	headerType: "default" | "sub";
	buttonName: string;
	buttonType: "button" | "submit";
	clickFn: any;
};

const useChangeHeader = ({ headerType, buttonName, buttonType, clickFn }: HeaderInfo, asyncFlag?: boolean) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(
			changeHeader({
				buttonName,
				buttonType,
				headerType,
				clickFn,
			}),
		);
		return () => {
			dispatch(initHeader());
		};
	}, [asyncFlag]);
};

export default useChangeHeader;

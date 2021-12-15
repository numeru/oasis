import React, { useState, useEffect } from "react";

type ReturnTypes = [boolean, React.Dispatch<React.SetStateAction<boolean>>];

const useTimeOutState = (): ReturnTypes => {
	const [state, setState] = useState(false);

	useEffect(() => {
		if (state) {
			const timeout = setTimeout(() => setState(false), 3000);

			return () => clearTimeout(timeout);
		}
	}, [state]);

	return [state, setState];
};

export default useTimeOutState;

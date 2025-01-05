// RefProvider.js
import React, { useRef } from "react";
import { RefContext } from "./RefContext";

export function RefProvider({ children }) {
	const refs = {
		logoHero: useRef(null),
		logoAbout: useRef(null),
	};

	return <RefContext.Provider value={refs}>{children}</RefContext.Provider>;
}

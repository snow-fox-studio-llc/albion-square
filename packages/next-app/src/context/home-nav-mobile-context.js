"use client";

import { createContext, useState } from "react";

export const HomeNavMobileContext = createContext();

export function HomeNavMobileContextProvider({ children }) {
	const [isMobileNavHidden, setIsMobileNavHidden] = useState(true);

	return (
		<HomeNavMobileContext.Provider
			value={[isMobileNavHidden, setIsMobileNavHidden]}
		>
			{children}
		</HomeNavMobileContext.Provider>
	);
}

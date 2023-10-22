"use client";

import { useContext } from "react";
import { HomeNavMobileContext } from "@/context/home-nav-mobile-context";

export default function HomeNavResponsiveList({ children }) {
	const [isMobileNavHidden] = useContext(HomeNavMobileContext);

	return (
		<div
			className={`items-center justify-between w-full md:flex md:w-auto md:order-1${
				isMobileNavHidden ? " hidden" : ""
			}`}
			id="navbar-cta"
		>
			{children}
		</div>
	);
}

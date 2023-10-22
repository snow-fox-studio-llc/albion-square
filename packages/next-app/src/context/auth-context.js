"use client";

import { SessionProvider } from "next-auth/react";

export function NextAuthSessionProvider({children, session}) {
	return <SessionProvider session={session}>{children}</SessionProvider>;
}

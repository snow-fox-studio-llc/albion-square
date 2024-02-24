import { SvelteKitAuth } from "@auth/sveltekit";
import Discord from "@auth/sveltekit/providers/discord";
import { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET, AUTH_SECRET } from "$env/static/private";

export const handle = SvelteKitAuth({
	providers: [Discord({ clientId: DISCORD_CLIENT_ID, clientSecret: DISCORD_CLIENT_SECRET })],
	secret: AUTH_SECRET
});

<script>
	import { Button } from "flowbite-svelte";
	import { signIn, signOut } from "@auth/sveltekit/client";
</script>

<Button on:click={() => signIn("discord", { callbackUrl: "/app" })}>Sign-In with Discord</Button>

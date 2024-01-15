<script>
	import { Button } from 'flowbite-svelte';
	import { signIn, signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
</script>

<Button on:click={() => signIn("discord", {callbackUrl: "/app"})}>Sign-In with Discord</Button>

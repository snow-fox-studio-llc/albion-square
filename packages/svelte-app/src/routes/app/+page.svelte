<script>
	import { Alert, Button } from "flowbite-svelte";
	import { InfoCircleSolid } from "flowbite-svelte-icons";
	import { signOut } from "@auth/sveltekit/client";
	import { page } from "$app/stores";
</script>

<Alert color="green">
	<div class="flex items-center gap-3">
		<InfoCircleSolid slot="icon" class="w-4 h-4" />
		<span class="text-lg font-medium">Signed in as {$page.data.session?.user?.name}</span>
	</div>
	<p class="mt-2 mb-4 text-sm ml-8">This is an authentication demo.</p>
	<div class="flex gap-2 ml-8">
		<Button size="xs" color="green" on:click={() => signOut({ callbackUrl: "/" })}>Sign-Out</Button>
	</div>
</Alert>

<script lang="ts">
	import AppNavbar from '$lib/app-navbar.svelte';
	import AppSidebar from '$lib/app-sidebar.svelte';
</script>

<AppNavbar />
<AppSidebar />

<main class="p-8 pt-0 lg:ml-[15rem] 2xl:ml-[19rem]">
	<slot />
</main>

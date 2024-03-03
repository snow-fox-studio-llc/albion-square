<script>
	import { signOut } from "@auth/sveltekit/client";
</script>

<button
	data-drawer-target="logo-sidebar"
	data-drawer-toggle="logo-sidebar"
	aria-controls="logo-sidebar"
	type="button"
	class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
>
	<span class="sr-only">Open sidebar</span>
	<svg
		class="w-6 h-6"
		aria-hidden="true"
		fill="currentColor"
		viewBox="0 0 20 20"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			clip-rule="evenodd"
			fill-rule="evenodd"
			d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
		></path>
	</svg>
</button>

<aside
	id="logo-sidebar"
	class="fixed top-0 left-0 z-40 w-72 h-screen transition-transform -translate-x-full sm:translate-x-0"
	aria-label="Sidebar"
>
	<div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
		<a href="/" class="flex items-center ps-2.5 mb-5">
			<picture class="flex h-6 w-auto me-3 sm:h-14">
				<source srcset="/albionsquare-dm.svg" media="(prefers-color-scheme: dark)" />
				<img src="/albionsquare.svg" alt="Albion Square" />
			</picture>
		</a>
		<ul class="space-y-2 font-medium">
			<li>
				<a
					href="/app"
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
				>
					<i
						class="fa-solid fa-house la-lg text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
					></i>
					<span class="flex-1 ms-3 whitespace-nowrap">Home</span>
				</a>
			</li>
			<li>
				<button
					type="button"
					on:click={() => signOut({ callbackUrl: "/" })}
					class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group w-full text-start"
				>
					<i
						class="fa-solid fa-right-from-bracket leading-5 fa-lg text-gray-500 group-hover:text-gray-900 dark:group-hover:text-white"
					></i>
					<span class="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
				</button>
			</li>
		</ul>
	</div>
</aside>

<script>
	import { signIn } from "@auth/sveltekit/client";
</script>

<div class="flex flex-col items-center mt-16">
	<picture class="h-auto w-full max-w-xs mb-4 -ml-4">
		<source srcset="/albionsquare-dm.svg" media="(prefers-color-scheme: dark)" />
		<img src="/albionsquare.svg" alt="Albion Square" />
	</picture>

	<div
		class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 dark:bg-gray-800 dark:border-gray-700"
	>
		<h5 class="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
			Sign In / Sign Up
		</h5>
		<p class="text-sm font-normal text-gray-500 dark:text-gray-400">
			Albion Square uses Discord as the exclusive authentication method as the features available
			are tightly integrated with the platform
		</p>
		<ul class="my-4 space-y-3">
			<li>
				<button
					class="flex items-center p-3 text-base font-bold text-white rounded-lg bg-[#5865F2] group hover:shadow w-full text-start"
					on:click={() => signIn("discord", { callbackUrl: "/app" })}
				>
					<img class="h-4" src="/discord-icon.svg" alt="Discord logo" />
					<span class="flex-1 ms-3 whitespace-nowrap">Sign In with Discord</span>
			</button>
			</li>
		</ul>
	</div>
</div>

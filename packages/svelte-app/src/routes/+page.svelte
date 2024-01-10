<script>
	import LandingNav from "$lib/landing-nav.svelte";
	import LandingFooter from "$lib/landing-footer.svelte";
</script>

<LandingNav />

<section
	class="bg-center bg-cover bg-no-repeat bg-[url('/albion-online-art-1.png')] bg-gray-700 bg-blend-multiply"
>
	<div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
		<h1
			class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl"
		>
			Find the perfect Albion Online guild
		</h1>
		<p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
			Albion Square is your go-to spot for connecting with cool Albion Online guilds that match your
			play style and vibe.
		</p>
		<div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
			<a
				href="#"
				class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
			>
				Get started
			</a>
		</div>
	</div>
</section>

<LandingFooter />

<script>
	import logo from '$lib/assets/branding_albionsquare-logo-text-dark.svg';
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink
	} from 'flowbite-svelte';
</script>

<Navbar>
	<NavBrand href="/">
	</NavBrand>
	<NavHamburger />
	<NavUl>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/docs/components/navbar">Navbar</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>

<section
	class="bg-center bg-cover bg-no-repeat bg-[url('/albion-online-art.png')] bg-gray-700 bg-blend-multiply"
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
				href="/"
				class="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
			>
				Get started
				<svg
					class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 14 10"
				>
					<path
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M1 5h12m0 0L9 1m4 4L9 9"
					/>
				</svg>
			</a>
		</div>
	</div>
</section>

<div class="max-w-screen-xl mx-auto mt-4 ">
	<Footer footerType="logo">
		<div class="sm:flex sm:items-center sm:justify-between">
			<FooterBrand href="https://flowbite.com" src={logo} alt="Flowbite Logo" />
			<FooterLinkGroup
				ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
			>
				<FooterLink href="/">About</FooterLink>
				<FooterLink href="/">Privacy Policy</FooterLink>
				<FooterLink href="/">Licensing</FooterLink>
				<FooterLink href="/">Contact</FooterLink>
			</FooterLinkGroup>
		</div>
		<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
		<FooterCopyright href="/" by="Flowbite™" />
	</Footer>
	
</div>
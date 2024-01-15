<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from "flowbite-svelte";
</script>

<Navbar>
	<NavBrand href="/">
		<picture class="me-3 h-6 sm:h-9 flex">
			<source srcset="/albionsquare-dm.svg" media="(prefers-color-scheme: dark)" />
			<img src="/albionsquare.svg" alt="Albion Square" />
		</picture>
		<!-- <img src="/albionsquare.svg" class="me-3 h-6 sm:h-9" alt="Flowbite Logo" /> -->
	</NavBrand>
	<div class="flex md:order-2">
		<Button size="sm" href="/auth">Get started</Button>
		<NavHamburger />
	</div>
	<NavUl>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>

<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button } from "flowbite-svelte";
</script>

<Navbar>
	<NavBrand href="/">
		<img
			src="/albionsquare-dm.svg"
			class="me-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
	</NavBrand>
	<div class="flex md:order-2">
		<Button size="sm" href="/app">Get started</Button>
		<NavHamburger />
	  </div>
	<NavUl>
		<NavLi href="/">Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>

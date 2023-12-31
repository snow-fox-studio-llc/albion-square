<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from "flowbite-svelte";
</script>

<Navbar>
	<NavBrand href="/">
		<img
			src="/albionsquare-dm.svg"
			class="me-3 h-6 sm:h-9"
			alt="Flowbite Logo"
		/>
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

<script>
	import {
		Navbar,
		NavBrand,
		NavLi,
		NavUl,
		NavHamburger,
		Avatar,
		Dropdown,
		DropdownItem,
		DropdownHeader,
		DropdownDivider
	} from 'flowbite-svelte';
    import { page } from '$app/stores';

    $: activeUrl = $page.url.pathname;
</script>

<Navbar>
	<NavBrand href="/">
		<img src="/images/albionsquare-icon.svg" class="me-3 h-6 sm:h-9" alt="Albion Square logo" />
		<span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Albion Square</span
		>
	</NavBrand>
	<div class="flex items-center md:order-2">
		<Avatar id="avatar-menu" src="/images/avatar-1.svg" />
		<NavHamburger class1="w-full md:flex md:w-auto md:order-1" />
	</div>
	<Dropdown placement="bottom" triggeredBy="#avatar-menu">
		<DropdownHeader>
			<span class="block text-sm">Bonnie Green</span>
			<span class="block truncate text-sm font-medium">name@flowbite.com</span>
		</DropdownHeader>
		<DropdownItem>Dashboard</DropdownItem>
		<DropdownItem>Settings</DropdownItem>
		<DropdownItem>Earnings</DropdownItem>
		<DropdownDivider />
		<DropdownItem>Sign out</DropdownItem>
	</Dropdown>
	<NavUl {activeUrl}>
		<NavLi href="/app">Markets</NavLi>
        <NavLi href="/app/crafting">Crafting</NavLi>
		<NavLi href="/app/guild">Guild</NavLi>
	</NavUl>
</Navbar>

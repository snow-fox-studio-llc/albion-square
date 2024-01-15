<script>
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink,
	} from "flowbite-svelte";
</script>

<Footer footerType="logo" class="m-4">
	<div class="container mx-auto">
		<div class="sm:flex sm:items-center sm:justify-between">
			<picture class="flex h-10 mb-4 sm:mb-0">
				<source srcset="/albionsquare-dm.svg" media="(prefers-color-scheme: dark)" />
				<img src="/albionsquare.svg" alt="Albion Square" />
			</picture>
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
	</div>
</Footer>

import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import NavLink from "@/components/nav-link";

export default function Home() {
	return (
		<Fragment>
			<nav className="bg-white border-gray-200 dark:bg-gray-900">
				<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
					<Link href="/" className="flex items-center">
						<Image
							src="https://s3-albion-square.snowfox.studio/branding/albionsquare-logo-text-dark.svg"
							width={100}
							height={200}
							alt="Albion Square"
							className="h-8 mr-3"
							priority
						/>
					</Link>
					<div className="flex md:order-2">
						<Link
							href="/auth"
							className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							Get started
						</Link>
						<button
							data-collapse-toggle="navbar-cta"
							type="button"
							className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="navbar-cta"
							aria-expanded="false"
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-5 h-5"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 17 14"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 1h15M1 7h15M1 13h15"
								/>
							</svg>
						</button>
					</div>
					<div
						className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
						id="navbar-cta"
					>
						<ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<NavLink href="/">Home</NavLink>
							</li>
							<li>
								<NavLink href="/about">About</NavLink>
							</li>
							<li>
								<NavLink href="/feedback">Feedback</NavLink>
							</li>
						</ul>
					</div>
				</div>
			</nav>

			<section className="bg-center bg-cover bg-no-repeat bg-[url('https://s3-albion-square.snowfox.studio/albion-online-art-1.png')] bg-gray-700 bg-blend-multiply">
				<div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-56">
					<h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">
						Find the perfect Albion Online guild
					</h1>
					<p className="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">
						Albion Square is your go-to spot for connecting with cool Albion
						Online guilds that match your play style and vibe.
					</p>
					<div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
						<Link
							href="/auth"
							className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
						>
							Get started
							<svg
								className="w-3.5 h-3.5 ml-2"
								aria-hidden="true"
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 14 10"
							>
								<path
									stroke="currentColor"
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M1 5h12m0 0L9 1m4 4L9 9"
								/>
							</svg>
						</Link>
					</div>
				</div>
			</section>

			<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
				<div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
					<div className="sm:flex sm:items-center sm:justify-between">
						<a
							href="https://flowbite.com/"
							className="flex items-center mb-4 sm:mb-0"
						>
							<img
								src="https://flowbite.com/docs/images/logo.svg"
								className="h-8 mr-3"
								alt="Flowbite Logo"
							/>
							<span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
								Flowbite
							</span>
						</a>
						<ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
							<li>
								<a href="#" className="mr-4 hover:underline md:mr-6 ">
									About
								</a>
							</li>
							<li>
								<a href="#" className="mr-4 hover:underline md:mr-6">
									Privacy Policy
								</a>
							</li>
							<li>
								<a href="#" className="mr-4 hover:underline md:mr-6 ">
									Licensing
								</a>
							</li>
							<li>
								<a href="#" className="hover:underline">
									Contact
								</a>
							</li>
						</ul>
					</div>
					<hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
					<span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
						© 2023{" "}
						<a href="https://flowbite.com/" className="hover:underline">
							Flowbite™
						</a>
						. All Rights Reserved.
					</span>
				</div>
			</footer>
		</Fragment>
	);
}

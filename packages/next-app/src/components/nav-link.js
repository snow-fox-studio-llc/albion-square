'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = (props) => {
	const pathname = usePathname();
	const isActive = pathname === props.href;

	if (isActive) {
		return (
			<Link
				href={props.href}
				className={`block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500`}
				aria-current="page"
			>
				{props.children}
			</Link>
		);
	} else {
		return <Link
			href={props.href}
			className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
		>
			{props.children}
		</Link>;
	}
};

export default NavLink;

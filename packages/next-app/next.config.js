/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "s3-albion-square.snowfox.studio",
				port: "",
				pathname: "/**",
			},
		],
	},
};

module.exports = nextConfig;

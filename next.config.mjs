/** @type {import('next').NextConfig} */
const nextConfig = {
	sassOptions: {
		prependData: `
			@import 'src/styles/settings/constants';
			@import 'src/styles/ui/typograohy';
		`,
  },
	reactStrictMode: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'tv.herthabsc.com',
				port: '',
			},
		],
	},
}

export default nextConfig;

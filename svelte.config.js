import adapter from '@sveltejs/adapter-static';

const dev = process.env.NODE_ENV === 'development';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build'
		}),
		alias: {
			'$components/*': 'src/lib/components/*',
			'$api/*': 'src/lib/api/*'
		},
		paths: {
			// change below to your repo name
			base: dev ? '' : '/CID-checker-Frontend'
		},
		trailingSlash: 'always'
	}
};

export default config;

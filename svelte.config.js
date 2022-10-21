import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({
			pages: "build",
			assets: "build"
		}),
		alias: {
			'$components/*': 'src/lib/components/*',
			'$api/*': 'src/lib/api/*'
		}
	}
};

export default config;

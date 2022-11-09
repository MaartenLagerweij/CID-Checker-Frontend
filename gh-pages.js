import { publish } from 'gh-pages';

publish(
	'docs', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'https://github.com/MaartenLagerweij/CID-checker-Frontend.git', // Update to point to your repository
		user: {
			name: 'Maarten Lagerweij', // update to use your name
			email: 'test@email.com' // Update to use your email
		},
		dotfiles: true
	},
	() => {
		console.log('Deploy Complete!');
	}
);

const devBaseURL = 'http://localhost:5001/cid-checker-362410/europe-west1/cidChecker/info/';
const prodBaseURL = 'https://europe-west1-cid-checker-362410.cloudfunctions.net/cidChecker/info/';
// const devBaseURL2 = 'http://localhost:5001/cid-checker-backend2/europe-west1/cidChecker/info';

/**
 *
 * @param {string[]} urlsToPost
 * @returns
 */
export async function postFunction(urlsToPost) {
	console.log('post request to ',prodBaseURL);
	return await fetch(prodBaseURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			urls: urlsToPost
		})
	});
}

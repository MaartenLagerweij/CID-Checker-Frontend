const functionsURL = import.meta.env.VITE_FUNCTIONS_PATH;

/**
 *
 * @param {string[]} urlsToPost
 * @returns
 */
export async function postFunction(urlsToPost) {
	return await fetch(functionsURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			urls: urlsToPost
		})
	});
}

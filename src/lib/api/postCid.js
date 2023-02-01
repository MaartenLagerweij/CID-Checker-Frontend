// @ts-nocheck
import { getAuth } from "firebase/auth";
const functionsURL = import.meta.env.VITE_FUNCTIONS_PATH;

import app from '../../firestore';

/**
 *
 * @param {string[]} urlsToPost
 * @returns
 */
export async function postFunction(urlsToPost,routeEndpoint) {

	const auth = getAuth(app);

	return await fetch(functionsURL+routeEndpoint, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Authorization': 'Bearer '+auth.currentUser.accessToken
		},
		body: JSON.stringify({
			urls: urlsToPost
		})
	});
}

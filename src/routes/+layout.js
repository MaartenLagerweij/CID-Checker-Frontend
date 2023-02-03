// @ts-nocheck
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { browser } from '$app/environment';
import { goto } from '$app/navigation';
import { loginState } from '../store';

import app from '../firestore';

export const prerender = true;

export async function load() {
    if (browser) {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user) => {
            if (user) {
                // User is signed in, see docs for a list of available properties
                // https://firebase.google.com/docs/reference/js/firebase.User
                const uid = user.uid;
                loginState.set(true);
                goto('/CID-checker-Frontend');
            } else {
                loginState.set(false);
                goto('/CID-checker-Frontend/login/');
            }
        });
    }
}

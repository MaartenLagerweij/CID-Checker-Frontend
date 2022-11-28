<script>
// @ts-nocheck

    import { onMount } from "svelte";
    import { goto } from '$app/navigation';
	import { getAuth, onAuthStateChanged } from "firebase/auth";

    import './style.css';
    import Header from './Header.svelte';
    import { loginState } from '../store';
    import app from '../firestore';
	import { page } from "$app/stores";


    let logInLogOut;

    loginState.subscribe(val => logInLogOut = val);

    onMount(() => {
        const auth = getAuth(app);
        onAuthStateChanged(auth, (user)=> {
            console.log('from inside layout: ',user);
            if(!user) goto('/CID-checker-Frontend/login/');
        })
    })

    
</script>
{#if $page.url.pathname !== '/CID-checker-Frontend/login/'}
    <Header />
{/if}

<main>
    <div class="container">
        {logInLogOut}
        <slot />
    </div>
</main>

<style>
    main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}
    @media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
    .container {
        max-width: 950px;
        text-align: center;
    }
</style>
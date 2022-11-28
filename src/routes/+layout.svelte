<script>
    import './style.css';
    import Header from './Header.svelte';
    import { goto } from '$app/navigation';
</script>

<Header />

<main>
    <div class="container">
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
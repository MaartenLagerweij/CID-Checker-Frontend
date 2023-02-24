<script>
	// @ts-nocheck
	import { slide } from 'svelte/transition';
	import { postFunction } from '$api/postCid.js';
	import ImageCardList from './ImageCardList.svelte';

	import { testData } from './data';

	let input = '';
	let submitError;
	let submitSuccess;
	let submitFeedback;

	$: pageResults = [testData];
	// let pages: Images[] // array of mock images array below

	async function submitFunction() {
		submitSuccess = false;
		if (input === '') {
			submitError = true;
			return (submitFeedback = "Please give url's");
		} else {
			submitError = false;
		}

		const routeEndpoint = '/get-images/';

		let urlsArray = input.split(/\n/);
		if (urlsArray[urlsArray.length - 1] === '') urlsArray.pop();

		if (urlsArray.length > 20) {
			submitError = true;
			submitFeedback = "Max 20 url's";
			return;
		} else {
			submitSuccess = true;
			submitFeedback = `Getting image data for ${urlsArray.length} pages... Loading...`;
		}

		const data = await postFunction(urlsArray, routeEndpoint);

		const images = await data.json();
		submitSuccess = false;

		pageResults = [testData, ...images];
	}
</script>

<h1>Image tool</h1>

<textarea class="form-control" bind:value={input} rows="13" type="text" placeholder="Paste input" />
<br />

<button class="btn btn-outline-primary" on:click={submitFunction}>Get images</button>
<br />
{#if submitError}
	<p class="alert alert-danger" transition:slide>
		{submitFeedback}
	</p>
{/if}
{#if submitSuccess}
	<p class="alert alert-info" transition:slide>
		{submitFeedback}
	</p>
{/if}
<!--{#each pages as images }  -->
{#each pageResults as { url, imgSrcs }}
	<ImageCardList {url} images={imgSrcs} />
{/each}

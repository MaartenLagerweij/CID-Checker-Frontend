<script>
	import { postFunction } from '$api/postCid.js';

	$: input = '';
	$: submitError = false;
	$: submitFeedback = '';
	/** @type {Array<{ url: string, salesForceSyntaxURL: string}>}*/
	$: rows = [];

	const handleSubmit = async () => {
		let urlsArray = input.split(/\n/);

		submitError = false;

		if (urlsArray[urlsArray.length - 1] === '') urlsArray.pop();

		if (urlsArray.length > 0) {
			submitError = true;
			submitFeedback = "Max 100 url's";
			return;
		} else {
			submitFeedback = `Creating CID url's for ${urlsArray.length} pages... Loading...`;
		}

		console.log(urlsArray);

		const data = await postFunction(urlsArray);

		rows = await data.json();
	};
</script>

<main>
	<h1>CID Checker</h1>
	<form on:submit|preventDefault={handleSubmit}>
		<textarea bind:value={input} rows="15" cols="80" type="text" id="input" />
		<button type="submit"> Get CID's </button>
	</form>

	<p class:alert-message={submitError === true}>
		{submitFeedback}
	</p>
	<div id="output">
		{#if rows.length > 0}
			<table>
				{#each rows as { url, salesForceSyntaxURL }}
					<tr>
						<td>
							{url}
						</td>
						<td>
							{salesForceSyntaxURL}
						</td>
					</tr>
				{/each}
			</table>
		{/if}
	</div>
</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

	button {
		background-color: #202142;
		color: #fff;
		border: 0;
		border-radius: 8px;
		color: #fff;
		width: 100px;
		height: 40px;
		cursor: pointer;
	}

	button:hover {
		transform: scale(0.98);
		opacity: 0.9;
	}

	table {
		font-family: arial, sans-serif;
		border-collapse: collapse;
		width: 100%;
	}

	td {
		border: 1px solid #dddddd;
		text-align: left;
		padding: 8px;
	}

	.alert-message {
		width: 250px;
		margin: auto;
		text-decoration: underline;
		border: 1px solid red;
		color: red;
	}

	#output {
		max-width: 1100px;
		margin: auto;
	}
</style>

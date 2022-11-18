<script>
// @ts-nocheck

	import { postFunction } from '$api/postCid.js';
	import './style.css'

	let input = '';
	let submitError = false;
	let submitFeedback = '';
	let buttonDisabled = true;
	let radioValue = '';
	let cidDisplayRadioValue = 'Salesforce Syntax';
	//this one is created because if somewould has received url's already and then used the radiobutton, the output would change again if radioValue was used inside the result.
	let submittedPageValue = '';
	const pageTypes = ["Brand pages", "Category pages", "Combination pages"];
	const pageTypesWithUrls = {
		"Brand pages": "/check-brands/",
		"Category pages": "/check-categories/",
		"Combination pages": "/check-combinations/"
	}
	const cidDisplayOptions = ["Salesforce Syntax", "CID only", "cat-info-bottom"];
	/** @type {Array<{ url: string, salesForceSyntaxURL: string}>}*/
	let rows = [];

	const handleSubmit = async () => {
		const routeEndpoint = pageTypesWithUrls[radioValue];
		submittedPageValue = radioValue;
		console.log('sending request to: ', routeEndpoint);
		let urlsArray = input.split(/\n/);

		submitError = false;
		rows = [];

		if (urlsArray[urlsArray.length - 1] === '') urlsArray.pop();

		if (urlsArray.length > 100) {
			submitError = true;
			submitFeedback = "Max 100 url's";
			return;
		} else {
			submitFeedback = `Creating CID url's for ${urlsArray.length} pages... Loading...`;
		}

		console.log(urlsArray);

		const data = await postFunction(urlsArray, routeEndpoint);

		rows = await data.json();
		submitFeedback = "";
	};
</script>

<main>
	<h1>CID Checker</h1>

	<form on:submit|preventDefault={handleSubmit}>

		{#each pageTypes as pageType}
			<label class="container-radio" >
				<input type="radio" value={pageType} on:click={()=> buttonDisabled = false} bind:group={radioValue} />
					{pageType}
				<span class="checkmark"></span>
			</label>
		{/each}


		{#if radioValue}
			<p class="radio-value">selected value: <strong><span style="text-decoration:underline">{radioValue}</span></strong></p>
		{/if}<br /><br />

		<textarea bind:value={input} rows="15" cols="80" type="text" id="input" />
		<br />
		<button disabled='{buttonDisabled}' type="submit"> Get CID's {#if radioValue}for {radioValue}{/if}</button>
	</form>

	<p class:alert-message={submitError === true}>
		{submitFeedback}
	</p>


	{#if rows.length > 0}

	{#each cidDisplayOptions as cidDisplayOption}
		<label class="container-radio" >
			<input type="radio" value={cidDisplayOption} bind:group={cidDisplayRadioValue} />
				{cidDisplayOption}
			<span class="checkmark"></span>
		</label>
	{/each}<br /><br />


	<div id="output">

			<table>
				{#each rows as { url, cid, brandName, brandCID, error  }}
					<tr>
						<td>
							{url}
						</td>
						<td>
							{#if error} <span id="error-message">{error}</span>
								{:else if submittedPageValue==="Brand pages" || submittedPageValue==="Category pages"}
									{#if cidDisplayRadioValue==="Salesforce Syntax"} {`$httpsUrl('Search-Show','cgid','${cid}')$`}
									{:else if cidDisplayRadioValue==="CID only"} {cid}
									{:else if cidDisplayRadioValue==="cat-info-bottom"} {`cat-info-bottom-${cid}`}
									{/if}
								{:else if submittedPageValue==="Combination pages"} 
									{#if cidDisplayRadioValue==="Salesforce Syntax"} {`$httpsUrl('Search-Show','cgid','${cid}','prefn1','brand','prefv1','${brandName}')$`}
									{:else if cidDisplayRadioValue==="CID only"} <span id="error-message">can't give cid for combination</span>
									{:else if cidDisplayRadioValue==="cat-info-bottom"} {`cat-info-bottom-${cid}-${brandCID}`}
									{/if}
							{/if}
						</td>
					</tr>
				{/each}
			</table>
		</div>
		{/if}
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

	button {
		background-color: #202142;
		color: #fff;
		border: 0;
		border-radius: 8px;
		color: #fff;
		width: 250px;
		font-size: 15px;
		height: 40px;
		cursor: pointer;
	}

	button:hover {
		transform: scale(0.98);
		opacity: 0.9;
	}

	button:disabled,
	button[disabled]{
		border: 1px solid #999999;
		background-color: #cccccc;
		color: #666666;
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

	#error-message {
		color: red;
		text-decoration: underline;
	}

	#output {
		max-width: 1100px;
		margin: auto;
	}

	.radio-value {
    font-size: 18px;
    margin-bottom: 0px;
	}

	.container-radio {
		position: relative;
		padding-left: 35px;
		margin-bottom: 12px;
		cursor: pointer;
		font-size: 18px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		margin: auto;
		padding: 4px;
		max-width: 300px;
	}

	/* Hide the browser's default radio button */
	.container-radio input {
		opacity: 0;
		cursor: pointer;
	}

	/* Create a custom radio button */
	.checkmark {
		position: absolute;
		top: 0;
		left: 0;
		height: 25px;
		width: 25px;
		background-color: rgb(199, 199, 199);
		border-radius: 50%;
		border: black;
	}

	/* On mouse-over, add a grey background color */
	.container-radio:hover input ~ .checkmark {
		background-color: #ccc;
	}

	/* When the radio button is checked, add a blue background */
	.container-radio input:checked ~ .checkmark {
		background-color: #2196F3;
	}

	/* Create the indicator (the dot/circle - hidden when not checked) */
	.checkmark:after {
		content: "";
		position: absolute;
		display: none;
	}

	/* Show the indicator (dot/circle) when checked */
	.container-radio input:checked ~ .checkmark:after {
		display: block;
	}

	/* Style the indicator (dot/circle) */
	.container-radio .checkmark:after {
		top: 9px;
		left: 9px;
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: white;
	}

</style>

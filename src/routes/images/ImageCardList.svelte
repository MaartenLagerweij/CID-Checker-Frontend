<script>
	// @ts-nocheck

	/**
	 * @type {{ imageURL: string, alt: string}[]}
	 */
	import { slide } from 'svelte/transition';

	import ControlPanel from './ControlPanel.svelte';
	import { writable } from 'svelte/store';

	export let images; // List of images
	export let url; // url of the submitted page

	const imageData = writable({
		alt: '',
		title: '',
		url: '',
		size: '',
		class: ''
	});

	/**@type {number | null}*/
	let imageSelected;
	let urlNaming;
	let missingHTMLButtonElements = false;

	let current = null;
	const newImages = [...images];
	let paginationPages = [];
	while (newImages.length > 0) {
		paginationPages.push(newImages.splice(0, 5));
	}
	console.log('paginationPages: ', paginationPages);
	$: currentPagination = 0;
	//The following signs were used for < and > to convert to these HTML elements (not used anymore here): &lt;  = <       &gt;    = >
	$: imageHTML = `<img src="/${$imageData.url}/" alt="${$imageData.alt}" title="${$imageData.title}" class="${$imageData.class}" />`;

	function downloadImage(size) {
		if (current == null && $imageData.url == '') {
			urlNaming = false;
			imageSelected = false;
			return;
		}
		if (current == null) {
			urlNaming = true;
			return (imageSelected = false);
		}
		if ($imageData.url == '') {
			imageSelected = true;
			return (urlNaming = false);
		} else {
			imageSelected = true;
			urlNaming = true;
		}

		const currentImgPath = images[current]['imageURL'];
		const fileName = images[current]['alt'];

		const imgPath = `${currentImgPath}?forceSize=true&forceAspectRatio=true&useTrim=true&size=${size}x${size}`;

		saveAs(imgPath, fileName);
	}

	function copyToClipboard() {
		if ($imageData.alt !== '' && $imageData.title !== '' && $imageData.url !== '') {
			missingHTMLButtonElements = false;
			console.log('correct');
		} else {
			missingHTMLButtonElements = true;
		}

		return navigator.clipboard.writeText(imageHTML);
	}
</script>

<div class="card image-card">
	<h5 class="card-header">{url}</h5>
	<div class="card-body">
		<div class="card card-inner inner1">
			<div>
				<div>
					<nav aria-label="Images navigation">
						<ul class="pagination justify-content-center">
							<li class="page-item">
								<a
									class="page-link"
									href="#0"
									on:click={() => (currentPagination > 0 ? (currentPagination -= 1) : null)}
									aria-label="Previous"
								>
									<span aria-hidden="true">&laquo;</span>
								</a>
							</li>
							{#each paginationPages as paginationPage, i}
								<li class="page-item">
									<a
										class={currentPagination === i ? 'page-link active-pagination' : 'page-link'}
										href="#{i + 1}"
										on:click={() => {
											current = null;
											//I have to put it in Template Literals because otherwise it assigns it to an object: {i: 0|1}
											currentPagination = `${i}`;
											currentPagination = Number(currentPagination);
										}}>{i + 1}</a
									>
								</li>
							{/each}
							<li class="page-item">
								<a
									class="page-link"
									href="#0"
									on:click={() =>
										currentPagination < paginationPages.length - 1
											? (currentPagination += 1)
											: null}
									aria-label="Next"
								>
									<span aria-hidden="true">&raquo;</span>
								</a>
							</li>
						</ul>
					</nav>
				</div>

				<div class="pagination-content">
					{#each paginationPages as page, ix}
						<div
							id={ix}
							class={currentPagination === ix ? 'pagination-tab active' : 'pagination-tab'}
						>
							<div class="images-display">
								{#each page as imageURL, i}
									<img
										class={current === i ? 'selected' : ''}
										on:click={() => (current = i)}
										alt={i}
										width="110"
										src={imageURL}
									/>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>

			<div class="image-html">
				<pre><code>{imageHTML}</code></pre>
			</div>
			<div class="buttons">
				<button on:click={downloadImage($imageData.size)} class="btn btn-outline-success"
					>Download image</button
				>

				<button on:click={copyToClipboard} class="btn btn-outline-info">Copy image HTML</button>
			</div>
			{#if imageSelected === false && urlNaming == ''}
				<p class="alert alert-danger" transition:slide>
					Please select an image and create url naming
				</p>
			{:else if imageSelected === false}
				<p class="alert alert-danger" transition:slide>Please select an image</p>
			{:else if urlNaming == ''}
				<p class="alert alert-danger" transition:slide>Please create url naming</p>
			{/if}

			{#if missingHTMLButtonElements}
				<p class="alert alert-danger" transition:slide>
					Please make sure to fill in the <strong>alt tag</strong>, <strong>title tag</strong> and
					<strong>url name</strong>
				</p>
			{/if}
		</div>
		<div class="card card-inner control-panel">
			<ControlPanel {imageData} />
		</div>
	</div>
</div>

<style>
	.image-card {
		margin: 10px 0px;
	}
	.buttons {
		display: flex;
		margin: auto;
	}
	.buttons button {
		max-width: 250px;
	}
	.image-html {
		background-color: #e3e3e3;
		width: 95%;
		margin: auto;
		margin-top: 12px;
		padding: 10px 6px 0px 6px;
		border: 1px solid #cccccc;
		margin-bottom: 8px;
		border-radius: 1%;
		font-size: 12px;
	}
	.card {
		margin: 5px 0px;
	}
	.card-body {
		display: flex;
		justify-content: space-evenly;
	}
	.card-inner {
		width: 200px;
		margin: 5px 10px;
	}
	.inner1 {
		flex: 2;
	}
	.images-display {
		display: flex;
		overflow-x: scroll;
		justify-content: space-around;
	}
	.images-display img {
		padding: 5px 4px;
		margin: 2px;
	}
	.images-display img:hover {
		border: 2px solid rgb(229, 229, 229);
	}
	.images-display img:focus {
		background-color: yellow;
	}
	.selected {
		background-color: #ff3e00;
		color: white;
	}
	.control-panel {
		flex: 1;
	}
	code {
		white-space: pre-line;
	}
	.pagination-tab {
		display: none;
	}
	.pagination-content div.active {
		display: block;
	}
	.active-pagination {
		z-index: 1;
		color: #fff;
		background-color: #007bff;
		border-color: #007bff;
	}
</style>

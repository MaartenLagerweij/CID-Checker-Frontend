<script>
	// @ts-nocheck
	import { onMount } from 'svelte';

	export let imageData;

	onMount(() => {
		updateImage();
	});

	let alt = '';
	let title = '';
	let url = '';
	let size = '';
	let radioValueAlign = 'left';
	let alignLeftRightValues = ['left', 'none', 'right'];
	let alignLeftRightValuesWithClass = {
		left: 'image--alignleft',
		none: '',
		right: 'image--alignright'
	};

	const updateImage = () =>
		imageData.set({
			alt: alt,
			title: title,
			url: url,
			size: size,
			class: alignLeftRightValuesWithClass[radioValueAlign]
		});
</script>

<h4>Control panel</h4>

<form>
	<input
		bind:value={alt}
		on:input={updateImage}
		type="text"
		class="form-control"
		id="alt"
		placeholder="Alt tag"
	/>

	<input bind:value={title} on:input={updateImage} class="form-control" placeholder="Title tag" />

	<input bind:value={url} on:input={updateImage} class="form-control" placeholder="URL naming" />

	<input
		bind:value={size}
		on:input={updateImage}
		type="number"
		class="form-control"
		id="size"
		placeholder="Width in px"
	/>
	<div class="align-image">
		{#each alignLeftRightValues as alignValue}
			<label class="container-radio">
				<!-- <input type="radio" name="align-images" value={alignValue} bind:group={radioValueAlign} on:change={updateImage} /> -->
				<input
					type="radio"
					name="align-images"
					value={alignValue}
					bind:group={radioValueAlign}
					on:change={updateImage}
				/>
				<p>{alignValue}</p>
				<span class="checkmark" />
			</label>
		{/each}
	</div>
</form>

<style>
	.form-control {
		max-width: 92%;
		margin: 5px 10px;
	}
	.align-image label {
		padding: 10px 15px;
	}
</style>

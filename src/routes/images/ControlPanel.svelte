<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import { imageData } from '../../store';

	export let _imageData;

	onMount(() => {
		updateImage();
	});

	let alt = '';
	let title = '';
	let url = '';
	let width;
	let radioValueAlign = 'left';
	let alignLeftRightValues = ['left', 'none', 'right'];
	let alignLeftRightValuesWithClass = {
		left: 'image--alignleft',
		none: '',
		right: 'image--alignright'
	};

	const _updateImage = () =>
		_imageData.set({
			alt: alt,
			title: title,
			url: url,
			width: width,
			class: alignLeftRightValuesWithClass[radioValueAlign]
		});

	function updateImage() {
		imageData.update((val) => {
			return [
				{
					alt: alt,
					title: title,
					url: url,
					width: width,
					class: alignLeftRightValuesWithClass[radioValueAlign]
				}
			];
		});
	}
</script>

<h4>Control panel</h4>

<form>
	<input
		bind:value={alt}
		on:input={_updateImage}
		type="text"
		class="form-control"
		id="alt"
		placeholder="Alt tag"
	/>

	<input bind:value={title} on:input={_updateImage} class="form-control" placeholder="Title tag" />

	<input bind:value={url} on:input={_updateImage} class="form-control" placeholder="URL naming" />

	<label id="label-height-width" for="heigh-width">Size in px:</label><br />
	<div class="height-width">
		<input
			bind:value={width}
			on:input={_updateImage}
			type="number"
			class="form-control"
			id="heigh-width"
			placeholder="width"
		/>
		<input type="number" class="form-control" id="heigh-width" placeholder="height" />
	</div>
	<div class="align-image">
		{#each alignLeftRightValues as alignValue}
			<label class="container-radio">
				<!-- <input type="radio" name="align-images" value={alignValue} bind:group={radioValueAlign} on:change={updateImage} /> -->
				<input
					type="radio"
					name="align-images"
					value={alignValue}
					bind:group={radioValueAlign}
					on:change={_updateImage}
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
	.height-width {
		display: flex;
	}
	#label-height-width {
		margin-bottom: 0px;
	}
	.align-image label {
		padding: 10px 15px;
	}
</style>

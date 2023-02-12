<script>
    /**
     * @type {{ imageURL: string, alt: string}[]}
     */
    export let images; // List of images

    /**@type {number | null}*/
    let current = null;
</script>

<div class="card image-card">
    <h5 class="card-header">ImageURL</h5>
    <div class="card-body">
      <div class="card card-inner inner1">
        <div class="images-display">
            {#each images as image, ix}
                <img class={current === ix ? 'selected' : ''}
                on:click={() => current = ix}
                alt={image.alt} 
                width="110" 
                src={image.imageURL}>
            {/each}
        </div>
      </div>
      <div class="card card-inner control-panel">
        test
      </div>
    </div>
  </div>

  <style>
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
  </style>
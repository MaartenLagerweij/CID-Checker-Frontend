<script>
// @ts-nocheck

    /**
     * @type {{ imageURL: string, alt: string}[]}
     */
    import {onDestroy, onMount} from 'svelte';
    import ControlPanel from "./ControlPanel.svelte";
    import { imageData } from "../../store";

    export let images; // List of images

    /**@type {number | null}*/
    let imageOutput;

    const unsub = imageData.subscribe(val => imageOutput = val);

    let current = null;
    //The following signs were used for < and > to convert to these HTML elements (not used anymore here): &lt;  = <       &gt;    = >
    $: imageHTML = `<img src="/${imageOutput[0].url}/" alt="${imageOutput[0].alt}" title="${imageOutput[0].title}" class="align-left" />`;

    
    //Is this one below necessary to unsubscribe when component destroyed to prevent memory leaks? 
    onDestroy(()=> {
        unsub();
    })

    function downloadImage(){
        console.log(images[current]);

        let imgPath = images[current]["imageURL"];
        let fileName = images[current]["alt"];
        
        saveAs(imgPath, fileName);

    }

    function copyToClipboard(){
        return navigator.clipboard.writeText(imageHTML);
    }
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

            <div class ="image-html">
                <pre><code>{imageHTML}</code></pre>
            </div>
        <div class="buttons">
            <button on:click={downloadImage} class="btn btn-outline-success">Download image</button>

            <button on:click={copyToClipboard} class="btn btn-outline-info">Copy image HTML</button>
        </div>
        
      </div>
      <div class="card card-inner control-panel">
        <ControlPanel />
      </div>
    </div>
  </div>

  <style>
    .buttons {
        display: flex;
        margin: auto;
    }
    .buttons button {
        max-width: 250px;
    }
    .image-html {
        background-color: #e3e3e3;
        max-width: 95%;
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
  </style>
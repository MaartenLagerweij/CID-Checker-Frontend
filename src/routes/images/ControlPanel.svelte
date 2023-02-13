<script>
// @ts-nocheck
    import {onMount} from 'svelte';
    import { imageData } from "../../store";

    onMount(() => {
        updateImage();
    })

    let alt = '';
    let title = '';
    let url = '';
    let width;

    function updateImage() {
        imageData.update(val => {
            console.log(val)
            return [{
                alt: alt,
                title: title,
                url: url,
                width: width
            }]
        })
    }
</script>

<h4>Control panel</h4>

<form>
    <input bind:value={alt} on:input={updateImage} type="text" class="form-control" id="alt"  placeholder="Alt tag">

    <input bind:value={title} on:input={updateImage} class="form-control" placeholder="Title tag" /> 

    <input bind:value={url} on:input={updateImage} class="form-control" placeholder="URL naming" /> 

    
    <label id="label-height-width" for="heigh-width">Size in px:</label><br>
    <div class="height-width">
        <input bind:value={width} on:input={updateImage} type="number" class="form-control" id="heigh-width" placeholder="width" /> 
        <input type="number" class="form-control" id="heigh-width" placeholder="height" /> 
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
</style>
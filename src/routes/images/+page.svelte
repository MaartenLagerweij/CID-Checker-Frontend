<script>
    // @ts-nocheck
        import { slide } from 'svelte/transition';
        import ImageCardList from "./ImageCardList.svelte";
        
        let input = '';
        let submitError;
        let submitSuccess;
        let submitFeedback;
        // let pages: Images[] // array of mock images array below
        
        function submitFunction(){
            submitSuccess = false;
            if(input === '') {
                submitError = true;
                return submitFeedback = "Please give url's";
            } else {
                submitError = false;
            }
            console.log(input);
            
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

            console.log(urlsArray);
        }

        const images = [
            {
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613"
            }
        ]
    </script>
    
    <h1>Image tool</h1>
    
            <textarea class="form-control" bind:value={input} rows="13" type="text" placeholder="Paste input"></textarea>
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
            <ImageCardList {images} />
    
    <style>

    </style>
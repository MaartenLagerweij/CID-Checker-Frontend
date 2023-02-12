<script>
    // @ts-nocheck
        import ImageCardList from "./ImageCardList.svelte";
        
        let input;
        // let pages: Images[] // array of mock images array below
        
        function submitFunction(){
            console.log(input);
            // pages = requestToDb()
        }

        const images = [
            {
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613",
                alt: "test1"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613",
                alt: "test2"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613",
                alt: "test3"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613",
                alt: "test4"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613",
                alt: "test5"
            },{
                imageURL: "https://images.internetstores.de/products/1835758/02/d93ccd/merrell-agility-peak-4-shoes-men-jade-1.jpg?forceSize=true&forceAspectRatio=true&useTrim=true&size=613x613",
                alt: "test6"
            }
        ]
    </script>
    
    <h1>Image tool</h1>
    
            <textarea class="form-control" bind:value={input} rows="13" type="text" placeholder="Paste input"></textarea>
            <br />

            <button class="btn btn-outline-primary" on:click={submitFunction}>Get images</button>
            <br />
            <!--{#each pages as images }  -->
            <ImageCardList {images} />
    
    <style>
        
    </style>
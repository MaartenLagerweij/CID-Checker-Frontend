<script>
    import Button from "./Button.svelte";
    
    let input = '';

    $: output = '';
    $: classStyle = '';

    //let serverURL = 'https://europe-central2-cid-checker-362410.cloudfunctions.net/cidCheckerFunction'
    
    const handleSubmit = async () => {
        let urlsArray = input.split(/\n/);
        
        if(urlsArray[urlsArray.length-1] === '') urlsArray.pop();

        if(urlsArray.length > 100) {
            classStyle = 'alert-message';
            return output = "Max 100 url's";
        } else {
            classStyle = '';
            output = `Creating CID url's for ${urlsArray.length} pages... Loading...`;
        }
        
        console.log(urlsArray);


        //Uncomment below when the server side is working

        // const response = await fetch(serverURL, {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         urls: urlsArray
        //     })
        // })
        
        // polling(urlsArray);

    }

    //Uncomment the polling function below when the server side is working and there is a server url to fetch from

    // function polling(urls){
    //     const lengthInputUrls = urls.length;

    //     const intervalId = setInterval(async () => {
    //         console.log('polling', lengthInputUrls)

    //         const response = await fetch(serverURL).then(data => data.json());

    //         if(lengthInputUrls === response.length) {
    //             let rows = '';
    //             response.forEach(urlItem => {
    //                 const row = `<tr><td>${urlItem.url}</td><td>${urlItem.salesForceSyntaxURL}</td></tr>`;
    //                 rows+= row;
    //             })
    //             output.innerHTML = '';
    //             output.insertAdjacentHTML('beforeend', `<table>${rows}</table>`);
    //             clearInterval(intervalId)
    //         };
    //     }, 1000)
    // }

</script>

<main>
    <form on:submit|preventDefault={handleSubmit}>
        <textarea bind:value={input} rows="15" cols="80" type="text" id="input"></textarea>
        <br />
        
        <Button type="submit" id="post">Get CID's</Button>
        <br />
        <p class={classStyle}>{output}</p>

    </form>
</main>

<style>
    .alert-message {
        width: 250px;
        margin: auto;
        text-decoration: underline;
        border: 1px solid red;
        color: red;
    }
</style>
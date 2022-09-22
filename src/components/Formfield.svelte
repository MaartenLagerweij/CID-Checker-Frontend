<script>
    import Button from "./Button.svelte";
    
    let input = '';
    $: output = document.getElementById('output');
    $: result = '';
    $: classStyle = '';

    const devBaseURL = 'http://localhost:5001/cid-checker-362410/europe-west1/cidChecker/info/';
    const prodBaseURL = 'https://europe-west1-cid-checker-362410.cloudfunctions.net/cidChecker/info/';
    
    const handleSubmit = async () => {
        let urlsArray = input.split(/\n/);
        
        if(urlsArray[urlsArray.length-1] === '') urlsArray.pop();

        if(urlsArray.length > 100) {
            classStyle = 'alert-message';
            return result = "Max 100 url's";
        } else {
            classStyle = '';
            result = `Creating CID url's for ${urlsArray.length} pages... Loading...`;
        }
        
        console.log(urlsArray);

        const response = await fetch(devBaseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                urls: urlsArray
            })
        })
        polling(urlsArray);
    }

    function polling(urls){
        const lengthInputUrls = urls.length;

        const intervalId = setInterval(async () => {
            console.log('polling', lengthInputUrls)

            const response = await fetch(devBaseURL).then(data => data.json());

            

            if(lengthInputUrls === response.length) {
                let rows = '';
                response.forEach(urlItem => {
                    const row = `<tr><td>${urlItem.url}</td><td>${urlItem.salesForceSyntaxURL}</td></tr>`;
                    rows+= row;
                })
                console.log(rows);
                result = "";
                output.insertAdjacentHTML('beforeend', `<table>${rows}</table>`);
                clearInterval(intervalId)
            };
        }, 1000)
    }

</script>

<main>
    <form on:submit|preventDefault={handleSubmit}>
        <textarea bind:value={input} rows="15" cols="80" type="text" id="input"></textarea>
        <br />
        
        <Button type="submit" id="post">Get CID's</Button>
        <br />
        <p class={classStyle}>{result}</p>
        <div id="output"></div>

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
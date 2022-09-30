<script>
	import FormField from "./components/FormField.svelte";
	import Button from "./components/Button.svelte";
	import OutputField from "./components/OutputField.svelte";

	    
    let input = '';
    let output = '';
    $: result = '';
    $: classStyle = '';
    let showTable;

    let rows = [];

    const devBaseURL = 'http://localhost:5001/cid-checker-362410/europe-west1/cidChecker/info/';
    const prodBaseURL = 'https://europe-west1-cid-checker-362410.cloudfunctions.net/cidChecker/info/';

    const devBaseURL2 = 'http://localhost:5001/cid-checker-backend2/europe-west1/cidChecker/info';
    
    const handleSubmit = async () => {

        let urlsArray = input.split(/\n/);
		
        showTable = false;
        
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
            
			console.log(response);
            if(lengthInputUrls === response.length) {
                result = "";
                rows = response;
                showTable = true;
                clearInterval(intervalId)
            };
        }, 1000)
    }

</script>

<main>
	<h1>CID Checker</h1>
	<FormField bind:input={input} />

	<Button on:onSend={handleSubmit}>Get CID's</Button>

	<OutputField {output} {classStyle} {result} {showTable} {rows} />

</main>

<style>
	main {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>
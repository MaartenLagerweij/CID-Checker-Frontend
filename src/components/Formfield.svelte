<script>
    import Button from "./Button.svelte";
    
    let input = '';
    
    const handleSubmit = () => {
        console.log('submitting');
        let urlsArray = input.split(/\n/);
        if(urlsArray[urlsArray.length-1] === '') urlsArray.pop();
        console.log(urlsArray);
    }

</script>

<form on:submit|preventDefault={handleSubmit}>
    <textarea bind:value={input} rows="15" cols="80" type="text" id="input"></textarea>
    <br />
    <Button type="submit" id="post">Get CID's</Button>
</form>
<script>
// @ts-nocheck
    import { slide  } from 'svelte/transition';

    let files;
    let data;
    let str;
    let output;
    let noLinksMessage = false;
    let csvMessage = false;
    let displayCopyToClipboard = false;
    const dataObject = {};

    function addFile(){
        files[0].text().then(d => data = d);
    }

    function submitFunction(){
        displayCopyToClipboard = false;

        if(!/(?<=href=").+?(?=")/.test(str)) {
            return noLinksMessage = true;
        } else {
            noLinksMessage = false;
        }

        if(!files) {
            return csvMessage = true;
        } else {
            csvMessage = false;
        }

        let urlsMatched = str.match(/(?<=href=["']).+?(?=["'])/g);
        let urls = [];
        urlsMatched.forEach(url => urls.includes(url) ? null : urls.push(url));

        

        const dataArray = data.split(/\r?\n/);
        dataArray.forEach(element => {
            let originalURL = element.match(/.+?(?=,)/)[0]
            let replaceURL = element.replace(originalURL+',',"");
            replaceURL = /^"/.test(replaceURL) ? replaceURL.replace(/^"/,"").replace(/"$/,'') : replaceURL
            //This will save everything from column A in the .csv as a property and column B as the value:
            dataObject[originalURL] = replaceURL
        })
        replaceURLS(urls, str)
    }

    function replaceURLS(urls,str){
        
            urls.forEach(url=> {
                //This will replace every url that was matched in str, replace it with the corresponding url from the dataObject
                if(dataObject[url]){
                    str = str.replaceAll(`"${url}"`,`"${dataObject[url]}"`)
                    str = str.replaceAll(`'${url}'`,`"${dataObject[url]}"`)
                }
            })
            displayCopyToClipboard = true;
            output = str;
        }

    function copyToClipboard(){
        return navigator.clipboard.writeText(output);
    }

</script>

<h1>Link Replacer</h1>

        <textarea class="form-control" bind:value={str} rows="15" type="text" placeholder="Paste input"></textarea>
        
        {#if noLinksMessage}
            <p transition:slide class="alert alert-danger">There were no links found in this text</p>
        {/if}
        <br/>
        <div class="col-md-6">
            <label for="excel-input" class="form-label">Upload .csv file here:</label>
            <input accept=".csv" class="form-control" type="file" bind:files on:change={addFile}>
        </div>
        {#if csvMessage}<p transition:slide class="alert alert-danger">Please select a .csv file before submitting</p>{/if}
          
        <br />
        <button class="btn btn-outline-primary" on:click={submitFunction}>Convert</button>
        <br />
        {#if displayCopyToClipboard}
            <button transition:slide class="btn btn-outline-success" on:click={copyToClipboard}>Copy output HTML to Clipboard</button>
        {/if}
        <br />
        {#if output}
            <div in:slide class="output">
                        {@html output}
                </div>
        {/if}


<style>
    .col-md-6 {
        margin:auto;
    }
    .output {
        text-align: left;
        margin-bottom: 100px;
    }
</style>
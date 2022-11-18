<script>
// @ts-nocheck
    let files;
    let data;
    const dataObject = {};

    // document.getElementById('excel-input').addEventListener('change', (event)=> {
    //     selectedFile = event.target.files[0];
    // })

    // function submitFunction(){
        
    //     if(!selectedFile) return document.getElementById('csv-message').classList.remove('display-none-button')
    //     if(selectedFile) {
    //         document.getElementById('csv-message').classList.add('display-none-button')
    //         document.getElementById('copyToClipboard').classList.remove('display-none-button')
    //     }

    //     let str = document.getElementById('text-input').value
    //     if(!/(?<=href=").+?(?=")/.test(str)) return document.getElementById('no-links-message').classList.remove('display-none-button')
    //     let urlsMatched = str.match(/(?<=href=["']).+?(?=["'])/g);
    //     let urls = [];
    //     urlsMatched.forEach(url => urls.includes(url) ? null : urls.push(url));
    //     document.getElementById('no-links-message').classList.add('display-none-button')

    //     if(selectedFile){
    //         let fileReader = new FileReader();
    //         fileReader.readAsBinaryString(selectedFile);
    //         fileReader.onload = (event)=> {
    //             data = event.target.result
    //             dataArray = data.split(/\r?\n/);
    //             dataArray.forEach(element => {
    //                 let originalURL = element.match(/.+?(?=,)/)[0]
    //                 let replaceURL = element.replace(originalURL+',',"");
    //                 replaceURL = /^"/.test(replaceURL) ? replaceURL.replace(/^"/,"").replace(/"$/,'') : replaceURL
    //                 //This will save everything from column A in the .csv as a property and column B as the value:
    //                 dataObject[originalURL] = replaceURL
    //             })
    //             //Call the function replaceURLS when the previous function is done
    //             replaceURLS(urls,str)
    //         }
    //     }
    // }

    // function replaceURLS(urls,str){
        
    //     urls.forEach(url=> {
    //         //This will replace every url that was matched in str, replace it with the corresponding url from the dataObject
    //         if(dataObject[url]){
    //             str = str.replaceAll(`"${url}"`,`"${dataObject[url]}"`)
    //             str = str.replaceAll(`'${url}'`,`"${dataObject[url]}"`)
    //         }
    //     })
    //     document.getElementById('output').innerHTML = str
    // }

    // function copyToClipboard(){
    //     var outputVal = document.getElementById('output');
    //     navigator.clipboard.writeText(outputVal.innerHTML);
    // }

    function addFile(){
        files[0].text().then(d => data = d);
    }

    function submitFunction(){
        const dataArray = data.split(/\r?\n/);
        dataArray.forEach(element => {
            let originalURL = element.match(/.+?(?=,)/)[0]
            let replaceURL = element.replace(originalURL+',',"");
            replaceURL = /^"/.test(replaceURL) ? replaceURL.replace(/^"/,"").replace(/"$/,'') : replaceURL
            //This will save everything from column A in the .csv as a property and column B as the value:
            dataObject[originalURL] = replaceURL
        })
        console.log(dataObject['https://www.bikester.nl/onderdelen/balhoofden-stuurpennen/stuurpennen/freeride-downhill-stuurpennen/']);
    }
</script>

<h1>Link Replacer</h1>

<div class="container">
    <div class="row">
      <div class="col">
        <textarea class="form-control" rows="15" type="text" id="text-input" name="data-input" placeholder="Paste input"></textarea>
        <br/>
        <p class="no-links-message display-none-button alert alert-danger" id="no-links-message">There were no links found in this text</p>
        <br/>

        <input type="file" bind:files on:change={addFile}>

        <!-- <div class="mb-3">
            <label on:change={addFile} for="excel-input" class="form-label">Upload .csv file here:</label>
            <input class="form-control" type="file" id="excel-input" accept=".csv">
            <p class="csv-message display-none-button alert alert-danger" id="csv-message">Please select a .csv file before submitting</p>
          </div> -->
          
        <br /><br />
        <button on:click={submitFunction}>Convert</button>
        
        <!-- <button class="btn-outline-success display-none-button" id="copyToClipboard" onclick="copyToClipboard()">Copy output HTML to Clipboard</button> -->
      </div>
      <div class="col">
        <div id="output"></div>
      </div>
    </div>
</div>
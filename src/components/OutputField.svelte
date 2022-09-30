<script>
    export let output;
    export let result;
    export let classStyle
    export let showTable;
    export let rows;
</script>

<p class={classStyle}>{result}</p>
        <div bind:this={output} id="output">
            {#if showTable}
                <table>
                    {#each rows as { url, salesForceSyntaxURL }}
                    <tr><td>{url}</td><td>{salesForceSyntaxURL}</td></tr>
                    {/each}
                </table>
            {/if}
        </div>
<style>
    table {
        font-family: arial, sans-serif;
        border-collapse: collapse;
        width: 100%;
    }

    td, th {
        border: 1px solid #dddddd;
        text-align: left;
        padding: 8px;
    }

    .alert-message {
        width: 250px;
        margin: auto;
        text-decoration: underline;
        border: 1px solid red;
        color: red;
    }
    #output {
        max-width: 1100px;
        margin: auto;
    }
</style>
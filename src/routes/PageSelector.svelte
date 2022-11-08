<script>
    import { createEventDispatcher } from 'svelte';
    let dispatch = createEventDispatcher();

    const pageTypes = ["Brand pages", "Category pages", "Combination pages"];
    let radioValue = 'a';

    const choosePageType = () => {

        console.log('from PageSelector', radioValue)
        dispatch('choosePageType', radioValue);
    }
</script>

{#each pageTypes as pageType}
    <label class="container" >
        <input type="radio" value={pageType} on:click={choosePageType} bind:group={radioValue} />
            {pageType}
        <span class="checkmark"></span>
    </label>
{/each}


{#if radioValue}
    <p class="radio-value">selected value: <strong><span style="text-decoration:underline">{radioValue}</span></strong></p>
{/if}


<style>
/* The container */
.radio-value {
    font-size: 18px;
    margin-bottom: 0px;
}
.container {
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 18px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  margin: auto;
  padding: 4px;
  max-width: 300px;
}

/* Hide the browser's default radio button */
.container input {
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: #2196F3;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container .checkmark:after {
 	top: 9px;
	left: 9px;
	width: 8px;
	height: 8px;
	border-radius: 50%;
	background: white;
}
</style>
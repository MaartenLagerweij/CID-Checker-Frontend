<script>
    import { createEventDispatcher } from "svelte";
    
    const dispatch = createEventDispatcher();

    function sendForm(){
      dispatch('onSend')
    }

    export let style = 'primary';
    export let type = 'button';
</script>
  

  <button on:click={sendForm} {type} class={style}>
    <slot></slot>
  </button>


<style>
    button {
      color: #fff;
      border: 0;
      border-radius: 8px;
      color: #fff;
      width: 100px;
      height: 40px;
      cursor: pointer;
    }
  
    .primary {
      background-color: #202142;
    }
  
    button:hover {
      transform: scale(0.98);
      opacity: 0.9;
    }
  
</style>
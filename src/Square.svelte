<script>
    export let value = 0;
    export let size = 50;
    export let state = "bisque";
    function funcClick(){
        state = "X";
    }
</script>

<!-- {#if {state}=="black"}
    <button style="width:{size}px; height:{size}px; background-color:black" on:click={funcClick}> </button>   
{:else if {state}=="white"}
<button style="width:{size}px; height:{size}px; background-color:black" on:click={funcClick}> </button>   
{/if} -->
<button style="width:{size}px; height:{size}px; background-color:{state}" on:click={funcClick}></button>

<style>
    button{
        margin-bottom: 0px;
    }
</style>

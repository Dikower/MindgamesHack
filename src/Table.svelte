<script>
    import PersonLine from './PersonLine.svelte';
    let kollPerson = 4;
</script>

<div class="Table">
    <input type="number" bind:value={kollPerson}>

    {#each Array(kollPerson) as line, i}
        <PersonLine number={i+1}/>
    {/each}
</div>
 


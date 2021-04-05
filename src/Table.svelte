<script>
  import dataRating from '../data/dataRating.json';
  import PersonLine from './PersonLine.svelte';

  let amount = 4;
</script>

<main>
  <input type="number" bind:value={amount}>
  {#each Array(amount) as line, i}
    <PersonLine {...dataRating[i + 1]} number={i+1}/>
  {/each}
</main>

<style>
  main {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>

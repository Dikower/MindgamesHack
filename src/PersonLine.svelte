<script>
  import PersonGames from './PersonGames.svelte';
  import {retryWrapper, url} from './api';
  import {slide} from 'svelte/transition';

  import axios from 'axios';

  export let name;
  export let rating;
  export let number = 0;

  let dataStore = retryWrapper(axios.post, url + '/get_last_games',
    {username: 'goMstT', password: '4vy2rp', player: name}
  )
  let check = false;

  function funcClickCheck() {
    check = !check;
  }

  let massGames = [];
</script>


<div class="information" on:click={funcClickCheck}>
  <p>№{number} </p>
  <p>{name}</p>
  <p>{rating}</p>
</div>

{#if check}
  {#await $dataStore}
    <p>loading...</p>
  {:then data}
    {#each data.data as game, i (game.timestamp)}
      <div transition:slide>
        <PersonGames {...game} number={i}/>
      </div>
    {/each}
  {/await}
{/if}


<style>
  .information {
    margin-bottom: 20px;
    width: 400px;
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: 'Noto Sans JP', sans-serif;
    color: #292F36;
    padding: 0 20px;
    cursor: pointer;
    border-radius: 10px;

    background: #fbf8f7;
    box-shadow: 15px 15px 50px #dad8d7, -10px -10px 20px #ffffff;
  }
</style>
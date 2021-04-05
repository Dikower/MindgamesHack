<script>
  import dataPersonGames from '../data/dataPersonGames.json';
  import PersonGames from './PersonGames.svelte';
  import {retryWrapper, url} from './api';1
  import axios from 'axios';

  export let name;
  export let rating;
  export let number = 0;

  console.log(name, rating, number)
  let dataStore = retryWrapper(axios.post, url + '/get_all',
    {username: 'goMstT', password: '4vy2rp', player: name}
  )

  let check = false;

  function funcClickCheck() {
    check = !check;
  }

  let massGames = [];
</script>


<div class="information" on:click={funcClickCheck}>
  <p> Number = {number} </p>
  <p> Name = {name} </p>
  <p> Score = {rating} </p>
</div>

{#if check}
  {#await $dataStore}
    <p>loading...</p>
  {:then data}
    {#each data.data as game, i}
      <PersonGames {...game.description} number={i}/>
    {/each}
  {/await}
{/if}


<style>
  .information {
    margin-bottom: 10px;
    width: 400px;
    display: flex;
    justify-content: space-evenly;
    background: #dddddd;
    border: 1px solid #666666;
    cursor: pointer;
  }
</style>
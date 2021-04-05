<script>
  import dataPersonGames from '../data/dataPersonGames.json';
  import PersonGames from './PersonGames.svelte';
  import {retryWrapper, url} from './api';1
  import {onMount} from 'svelte';
  import axios from 'axios';

  export let name;
  export let rating;
  export let number = 0;

  let dataStore = retryWrapper(axios.post, url + '/get_all',
    {username: 'goMstT', password: '4vy2rp', player: name}
  )

  let check = false;

  function funcClickCheck() {
    check = !check;
  }

  let massGames = [];
  massGames.push({
    number: 0, score: dataPersonGames["score"],
    firstPerson: dataPersonGames["players"]["white"]["name"],
    secondPerson: dataPersonGames["players"]["black"]["name"],
    gameType: dataPersonGames["gameType"],
    size: dataPersonGames["size"]
  })
  massGames.push({
    number: 1, score: dataPersonGames["score"],
    firstPerson: dataPersonGames["players"]["white"]["name"],
    secondPerson: dataPersonGames["players"]["black"]["name"],
    gameType: dataPersonGames["gameType"],
    size: dataPersonGames["size"]
  })

  // console.log(massGames);

</script>


<div class="information" on:click={funcClickCheck}>
  <p> Number = {number} </p>
  <p> Name = {name} </p>
  <p> Score = {rating} </p>
</div>

{#if check}
  {#await $dataStore}
    <p>loading...</p>
  {:then massGames}
    <p>{JSON.stringify(massGames)}</p>
    <!--{#each massGames as mass (mass.number)}-->
<!--      <PersonGames {...massGames[mass.number]}/>-->
<!--    {/each}-->
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
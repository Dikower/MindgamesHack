<script>
  import dataRating from '../data/dataRating.json';
  import dataPersonGames from '../data/dataPersonGames.json';
  import PersonGames from './PersonGames.svelte';
  import {each} from 'svelte/internal';
  import App from './App.svelte';
  import Board from './Board.svelte';

  export let number = 0;
  let name = dataRating[number]["name"];
  let score = dataRating[number]["rating"];

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
  <p> Score = {score} </p>
</div>

{#if check}
  {#each massGames as mass (mass.number)}
    <PersonGames {...massGames[mass.number]}/>
  {/each}
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
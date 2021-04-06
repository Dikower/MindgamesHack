<script>
  import Square from './Square.svelte';
  // import dataGame from '../data/dataGame.json';
  import {retryWrapper, url} from './api';
  import axios from 'axios';

  export let params;
  let timestamp = params.timestamp;
  let dataStore = retryWrapper(axios.post, url + '/get_game_details', {timestamp})

  let Rules, FirstName, FirstColor, SecondName, SecondColor, kollSqInLine, dataGame, sizeBoard;

  let sizeSq = 50
  let massEl = [];

  dataStore.subscribe(async v => {
    dataGame = (await $dataStore).data;
    console.log(dataGame)
    Rules = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][0]["rules"];
    FirstName = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][1]["text"];
    FirstColor = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][1]["color"];
    SecondName = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][2]["text"];
    SecondColor = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][2]["color"];
    kollSqInLine = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][0]["size"];
    if (massEl.length === 0) {
      console.log('sq', kollSqInLine)
      sizeBoard = kollSqInLine * sizeSq;
      for (let i = 0; i < kollSqInLine * kollSqInLine; i++) {
        massEl.push({value: i, size: sizeSq, state: 'bisque'});
      }
    }
    console.log('dat', dataGame)
  })

  let numberActive = 2;
  let colorEl, locationEl;

  $: colorEl = dataGame && dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["color"];
  $: locationEl = dataGame && dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["loc"]["y"] * kollSqInLine + dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["loc"]["x"];


  function PaintBoxPlus() {
    massEl[locationEl].state = colorEl;
    if (numberActive < (dataGame['messages'][3]["sgfEvents"].length - 2)) numberActive += 2;
    console.log(colorEl);
    console.log(numberActive);
    console.log(locationEl);
    console.log(massEl);
  }

  function PaintBoxMinus() {
    if (numberActive > 2) numberActive -= 2;
    massEl[locationEl].state = "bisque";
    console.log(colorEl);
    console.log(numberActive);
    console.log(locationEl);
  }

  function funcKeyDown(event) {
    if (event.key === "ArrowLeft") PaintBoxMinus();
    if (event.key === "ArrowRight") PaintBoxPlus();
  }
</script>

<svelte:window on:keydown={funcKeyDown}/>
{#await $dataStore}
  <p>Loading...</p>
{:then data}
  <div class="Board">
    <!-- <input type=number bind:value={numberActive}>  -->
    <button on:click={() => localStorage.clear()}>Clear cache</button>
    <button on:click={PaintBoxPlus}>Plus</button>
    <button on:click={PaintBoxMinus}>Minus</button>


    <div class="information">
      <p>Rules of the game: {Rules}</p>
      <p>Name: {FirstName}, Color: {FirstColor}</p>
      <p>Name: {SecondName}, Color: {SecondColor}</p>
    </div>

    <div style="width:{sizeBoard}px">
      {#each massEl as mass (mass.value)}
        <Square {...mass}/>
      {/each}
    </div>
  </div>
{/await}

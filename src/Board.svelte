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
      // console.log('sq', kollSqInLine)
      sizeBoard = kollSqInLine * sizeSq;
      for (let i = 0; i < kollSqInLine * kollSqInLine; i++) {
        massEl.push({size: sizeSq, state: 'bisque'});
      }
    }
    // console.log('dat', dataGame)
  })

  let numberActive = 2;
  let colorEl, locationEl;

  $: colorEl = dataGame && dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["color"];
  $: locationEl = dataGame && dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["loc"]["y"] * kollSqInLine + dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["loc"]["x"];


  function PaintBoxPlus() {
    massEl[locationEl].state = colorEl;
    if (numberActive < (dataGame['messages'][3]["sgfEvents"].length - 2)) numberActive += 2;
    // console.log(colorEl);
    // console.log(numberActive);
    // console.log(locationEl);
    // console.log(massEl);
  }

  function PaintBoxMinus() {
    if (numberActive > 2) numberActive -= 2;
    massEl[locationEl].state = "bisque";
    // console.log(colorEl);
    // console.log(numberActive);
    // console.log(locationEl);
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

    <div class="information">
      <h2>Правила: {Rules}</h2>
      <h2>{FirstName} - {FirstColor} vs {SecondName} - {SecondColor}</h2>
      <p>Можно использовать стрелки ← →</p>
    </div>
 
    <div class="buttons">
      <button on:click={PaintBoxMinus}>Предыдущий ход</button>
      <button on:click={PaintBoxPlus}>Следующий ход</button>
    </div>

    
    <div class="go" style="width:{sizeBoard}px; height: {sizeBoard}px">
      {#each massEl as mass}
        <Square {...mass}/>
      {/each}
    </div>


    <progress max={dataGame['messages'][3]["sgfEvents"].length - 2} value={numberActive} class="progressBar"></progress>

  </div>
{/await}








<style>
  .Board {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  button {
    background: #fbf8f7;
    border: 1px solid #353D46;
    border-radius: 30px;
    color: #353D46;
    margin: 0 10px;
    padding: 15px;
  }
  .buttons {
    margin-bottom: 30px;
  }
  h2 {
    margin: 7px 0;
  }
  .information {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
  }
  .progressBar{
    width: 400px;
  }
</style>
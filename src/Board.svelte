<script>
  import Square from './Square.svelte';
  // import dataGame from '../data/dataGame.json';
  import {retryWrapper, url} from './api';
  import {onMount} from 'svelte';
  import axios from 'axios';

  export let params;
  let timestamp = params.timestamp;
  let dataStore = retryWrapper(axios.post, url + '/get_game_details', {timestamp})

  // let Rules = dataGame['messages'][3]["sgfEvents"][0]["props"][0]["rules"];
  // let FirstName = dataGame['messages'][3]["sgfEvents"][0]["props"][1]["text"];
  // let FirstColor = dataGame['messages'][3]["sgfEvents"][0]["props"][1]["color"];
  // let SecondName = dataGame['messages'][3]["sgfEvents"][0]["props"][2]["text"];
  // let SecondColor = dataGame['messages'][3]["sgfEvents"][0]["props"][2]["color"];
  // let kollSqInLine = dataGame['messages'][3]["sgfEvents"][0]["props"][0]["size"];
  let Rules, FirstName, FirstColor, SecondName, SecondColor, kollSqInLine, dataGame, sizeBoard, massEl;
  onMount(async () => {
    dataGame = (await $dataStore).data;
  })
  let sizeSq = 50
  $: {
    Rules = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][0]["rules"];
    FirstName = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][1]["text"];
    FirstColor = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][1]["color"];
    SecondName = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][2]["text"];
    SecondColor = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][2]["color"];
    kollSqInLine = dataGame && dataGame['messages'][3]["sgfEvents"][0]["props"][0]["size"];
    console.log(dataGame)
  }

  $: {
    sizeBoard = kollSqInLine * sizeSq;
    massEl = []
    for (let i = 0; i < kollSqInLine * kollSqInLine; i++) {
      massEl.push({value: i, size: sizeSq, state: 'bisque'});
    }
  }

  let numberActive = 2;
  let colorEl, locationEl;
  $: {
    colorEl = dataGame && dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["color"];
    locationEl = dataGame && dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["loc"]["y"] * kollSqInLine + dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["loc"]["x"];
  }

  function PaintBoxPlus() {
    massEl[locationEl].state = colorEl;
    if (numberActive < (dataGame['messages'][3]["sgfEvents"].length - 2)) numberActive += 2;
  }

  function PaintBoxMinus() {
    if (numberActive > 2) numberActive -= 2;
    massEl[locationEl].state = "bisque";
  }

  function funcKeyDown(event) {
    if (event.key == "ArrowLeft") PaintBoxMinus();
    if (event.key == "ArrowRight") PaintBoxPlus();
  }
</script>

<svelte:window on:keydown={funcKeyDown}/>
{#await $dataStore}
  <p>Loading...</p>
{:then data}
  <div class="Board">
    <!-- <input type=number bind:value={numberActive}>  -->
    <button on:click={PaintBoxPlus}>Plus</button>
    <button on:click={PaintBoxMinus}>Minus</button>


    <div class="information">
      <p>Rules of the game: {Rules}</p>
      <p>Name: {FirstName}, Color: {FirstColor}</p>
      <p>Name: {SecondName}, Color: {SecondColor}</p>
    </div>

    <div style="width:{sizeBoard}px">
      {#each massEl as mass (mass.value)}
        <!--              <Square value={mass.value} size={mass.size} state={mass.state}/>-->
        <Square {...mass}/>
      {/each}
    </div>
  </div>
{/await}

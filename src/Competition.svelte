  <script>
    import Table from './Table.svelte'
    import Game from './Game.svelte'
    import Board from './Board.svelte'
    import { stepNumber } from "./storage";
    import { blackScore } from "./storage";
    import { whiteScore } from "./storage";
    import { blackStonesCount } from "./storage";
    import { whiteStonesCount } from "./storage";

    $: gameState = $stepNumber%2;
    $: colorAttack = gameState ? "white" : "black";
    function funcSkip(){
      stepNumber.decrement();
    }

  </script>
<svelte:head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js" integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf" crossorigin="anonymous"></script>
</svelte:head>


<div class="continaer">
  <div class="row ">
    <div class="col-md-3 text-align-middle">
      <div class="podskazki ">
        <h1 class="text-align-center">Подсказки</h1>
        <div class="btn-group-vertical ">
          <!-- <button class="btn"> Подсказка -  1</button>
          <button class="btn"> Подсказка -  2</button>
          <button class="btn"> Подсказка -  3</button>
          <button class="btn"> Подсказка -  4</button> -->
        </div>
      </div>

    </div>
    <div class="col-md-6">
      <div class="game">
        <h3>{colorAttack}</h3>
	      <Game/>	
      </div>
    </div>
    <div class="col-md-3">
      <div class="row">
        <div class="players">
          <div class="player row">
            <h2>Игрок 1 (black)</h2>
          </div>
          <p>Очков : {$blackScore}</p>
          <p>Камней : {$blackStonesCount}</p>

          <div class="player row">
            <h2> Игрок 2 (white)</h2>
            <p>Очков : {$whiteScore}</p>
            <p>Камней : {$whiteStonesCount}</p>

          </div>
        </div>
      </div>
      <div class="row">
        <div class="stat">
          <div class="row ">
            <h2>История ходов</h2>
            <p1>loremipsum </p1>
            <p1>loremipsum </p1>
            <p1>loremipsum </p1>
            <p1>loremipsum </p1>
          </div>
        </div>
      </div>
      <div class="row d-flex flex-colum align-text-bottom panel">
        <div class="col-6">
          <span><h3>00:00</h3></span>
        </div>
        <div class="col-6">
          <button on:click={funcSkip}><h3>пропуск хода</h3></button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  body {
    margin: 1em 1em;
  }
  .container {
    margin-top: 25px;
  }
  *, .btn {
    color : #728ab7;
  }
  h1 {
    font-size: 2em;
  }
  h2, p{
    margin-bottom: 5px;
  }
  button {
    margin-bottom: 10px;
    font-size: 1.3em;
  }
  .game {
    min-height: 90vh;
  }
  .stat,.players,.panel {
    margin: 0 0 1em 0;
  }
  .stat, .players,.podskazki,.game{
    background: #F0F0F3;
    box-shadow: -10px -10px 30px #FFFFFF, 10px 10px 30px rgba(174, 174, 192, 0.4);
    border-radius: 16px;
    padding: 10px;
  }

</style>
<script>
    import Square from './Square.svelte';
    import { count } from './storage'
    let sizeSq = 50;
    let kollSqInLine = 9;
    let sizeBoard = kollSqInLine * sizeSq;
    let massEl=[];
    let gameState = "black";
    function funcPaint(value){
        if ($count % 2 === 0) {
          massEl[value].state = "black";
          gameState = "white";
        } else {
          massEl[value].state = "white";
          gameState = "black";
        }
        count.increment();
    }
    
    for (let i = 0; i < kollSqInLine * kollSqInLine; i++) {
        massEl.push({value: i, size: sizeSq, state: 'bisque'});
    }
</script>

<h1>Сейчас ходит игрок - {gameState} </h1>
<div class="go" style="width:{sizeBoard}px; height: {sizeBoard}px">
    {#each massEl as mass (mass.value)}
      <Square {...mass} funcPaint = {() => funcPaint(mass.value)}/>
    {/each}
</div>

<style>
  .go{
    margin-left: 100px;
    margin-top: 100px;
  }
</style>
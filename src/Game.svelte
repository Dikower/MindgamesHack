<script>
  import Square from "./Square.svelte";
  import { count } from "./storage";
  let sizeSq = 50;
  let kollSqInLine = 9;
  let sizeBoard = kollSqInLine * sizeSq;
  let massEl = [];
  let gameState = "black";
  function funcPaint(x, y) {
    console.log(y, x);
    console.log(massEl);
    if ($count % 2 === 0) {
      massEl[y][x].state = "black";
      gameState = "white";
    } else {
      massEl[y][x].state = "white";
      gameState = "black";
    }
    count.increment();
  }
  for (let i = 0; i < kollSqInLine; i++) {
    massEl.push([]);
    for (let q = 0; q < kollSqInLine; q++) {
      massEl[i].push({ x: q, y: i, size: sizeSq, state: "bisque" });
    }
  }
</script>

<h1>Сейчас ходит игрок - {gameState}</h1>
<div class="go" style="width:{sizeBoard}px; height: {sizeBoard}px">
  {#each massEl as mass}
    {#each mass as el }
    <Square {...el} funcPaint={() => funcPaint(el.x, el.y)} />
    {/each}
  {/each}
</div>

<style>
  .go {
    margin-left: 100px;
    margin-top: 100px;
  }
</style>

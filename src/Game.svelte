<script>
  import Square from "./Square.svelte";
  import FieldEditor from "./FieldEditor.svelte";
  import { count } from "./storage";
  let sizeSq = 50;
  let kollSqInLine = 9;
  let sizeBoard = kollSqInLine * sizeSq;
  let massEl = [];
  let gameState = "black";

  let blackScore = 0;
  let whiteScore = 0;

  //функция для компонента square
  function funcPaint(x, y) {
    //функция очистки
    let matrixForProv = [];
    let stateProv = true;
    funcPeresobratMtrix();

    function funcProv(x, y, color) {
      console.log(x, y);
      matrixForProv[y][x] = 1;
      if (x + 1 < kollSqInLine) {
        if (massEl[y][x + 1].state === "bisque") {
          stateProv = false;
        }
        if (massEl[y][x + 1].state === color && matrixForProv[y][x + 1] === 0) {
          funcProv(x + 1, y, color);
        }
      }
      if (y + 1 < kollSqInLine) {
        if (massEl[y + 1][x].state === "bisque") {
          stateProv = false;
        }
        if (massEl[y + 1][x].state === color && matrixForProv[y + 1][x] === 0) {
          funcProv(x, y + 1, color);
        }
      }
      if (x - 1 >= 0) {
        if (massEl[y][x - 1].state === "bisque") {
          stateProv = false;
        }
        if (massEl[y][x - 1].state === color && matrixForProv[y][x - 1] === 0) {
          funcProv(x - 1, y, color);
        }
      }
      if (y - 1 >= 0) {
        if (massEl[y - 1][x].state === "bisque") {
          stateProv = false;
        }
        if (massEl[y - 1][x].state === color && matrixForProv[y - 1][x] === 0) {
          funcProv(x, y - 1, color);
        }
      }
    }
    function funcPocras(x, y, color) {
      if (color === "white") {
        blackScore++;
      } else {
        whiteScore++;
      }
      massEl[y][x].state = "bisque";
      if (x + 1 < kollSqInLine) {
        if (massEl[y][x + 1].state === color) {
          funcPocras(x + 1, y, color);
        }
      }
      if (y + 1 < kollSqInLine) {
        if (massEl[y + 1][x].state === color) {
          funcPocras(x, y + 1, color);
        }
      }
      if (x - 1 >= 0) {
        if (massEl[y][x - 1].state === color) {
          funcPocras(x - 1, y, color);
        }
      }
      if (y - 1 >= 0) {
        if (massEl[y - 1][x].state === color) {
          funcPocras(x, y - 1, color);
        }
      }
    }
    // console.log("Нажали на ", y, x);

    stateProv = true;

    function funcPeresobratMtrix() {
      matrixForProv = [];
      for (let i = 0; i < kollSqInLine; i++) {
        matrixForProv.push([]);
        for (let q = 0; q < kollSqInLine; q++) {
          matrixForProv[i].push(0);
        }
      }
    }
    funcPeresobratMtrix();
    if ($count % 2 === 0) {
      massEl[y][x].state = "black";
      if (x + 1 < kollSqInLine) {
        if (massEl[y][x + 1].state === "white") {
          funcProv(x + 1, y, "white");
          console.log(stateProv);
          if (stateProv) {
            funcPocras(x + 1, y, "white");
          }
          stateProv = true;
          funcPeresobratMtrix();
        }
      }
      if (x - 1 >= 0) {
        if (massEl[y][x - 1].state === "white") {
          funcProv(x - 1, y, "white");
          console.log(stateProv);
          if (stateProv) {
            funcPocras(x - 1, y, "white");
          }
          stateProv = true;
          funcPeresobratMtrix();
        }
      }
      if (y + 1 < kollSqInLine) {
        if (massEl[y + 1][x].state === "white") {
          funcProv(x, y + 1, "white");
          console.log(stateProv);
          if (stateProv) {
            funcPocras(x, y + 1, "white");
          }
          stateProv = true;
          funcPeresobratMtrix();
        }
      }
      if (y - 1 >= 0) {
        if (massEl[y - 1][x].state === "white") {
          funcProv(x, y - 1, "white");
          console.log(stateProv);
          if (stateProv) {
            funcPocras(x, y - 1, "white");
          }
          stateProv = true;
          funcPeresobratMtrix();
        }
      }
      gameState = "white";
    } else {
      massEl[y][x].state = "white";
      if (x + 1 < kollSqInLine) {
        if (massEl[y][x + 1].state === "black") {
          funcProv(x + 1, y, "black");
          console.log(stateProv);
          if (stateProv) {
            funcPocras(x + 1, y, "black");
          }
          stateProv = true;
          funcPeresobratMtrix();
        }
      }
      if (x - 1 >= 0) {
        if (massEl[y][x - 1].state === "black") {
          funcProv(x - 1, y, "black");
          console.log(stateProv);
          if (stateProv) {
            funcPocras(x - 1, y, "black");
          }
          stateProv = true;
          funcPeresobratMtrix();
        }
      }
      if (y + 1 < kollSqInLine) {
        if (massEl[y + 1][x].state === "black") {
          funcProv(x, y + 1, "black");
          console.log(stateProv);
          if (stateProv) {
            funcPocras(x, y + 1, "black");
          }
          stateProv = true;
          funcPeresobratMtrix();
        }
      }
      if (y - 1 >= 0) {
        if (massEl[y - 1][x].state === "black") {
          funcProv(x, y - 1, "black");
          console.log(stateProv);
          if (stateProv) {
            funcPocras(x, y - 1, "black");
          }
          stateProv = true;
          funcPeresobratMtrix();
        }
      }
      gameState = "black";
    }
    //-----------------------------
    if ($count % 2 === 0) {
      funcProv(x, y, "black");
      console.log(stateProv);
      if (stateProv) {
        massEl[y][x].state = "bisque";
        count.decrement();
        gameState = "black";
      }
      stateProv = true;
      funcPeresobratMtrix();
    } else {
      funcProv(x, y, "white");
      console.log(stateProv);
      if (stateProv) {
        massEl[y][x].state = "bisque";
        count.decrement();
        gameState = "white";
      }
      stateProv = true;
      funcPeresobratMtrix();
    }
    //-----------------------------
    count.increment();
  }

  //функции для компонента fieldEditor
  function funcUpdate(x, y, color) {
    console.log(x, y, color);
    massEl[y - 1][x - 1].state = color;
  }

  //для этого компонента
  for (let i = 0; i < kollSqInLine; i++) {
    massEl.push([]);
    for (let q = 0; q < kollSqInLine; q++) {
      massEl[i].push({ x: q, y: i, size: sizeSq, state: "bisque" });
    }
  }
</script>

<h1>Сейчас ходит игрок - {gameState}</h1>
<h2>Очки игрока black: {blackScore}</h2>
<h2>Очки игрока white: {whiteScore}</h2>

<!-- <FieldEditor {funcUpdate} {kollSqInLine} /> -->

<div class="go" style="width:{sizeBoard}px; height: {sizeBoard}px">
  {#each massEl as mass}
    {#each mass as el}
      <Square {...el} funcPaint={() => funcPaint(el.x, el.y)} {kollSqInLine}/>
    {/each}
  {/each}
</div>

<style>
  .go {
    margin-left: 100px;
    margin-top: 100px;
  }
</style>

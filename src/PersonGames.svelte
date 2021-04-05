<script>
  export let gameType = "ranked";
  export let score = "lose";
  export let komi = 6.5
  export let size = 19;
  export let players = {};
  export let number = 0;
  export let timestamp;
  export let handicap;

  let white = players["white"]["name"];
  let black = players["black"]["name"];
</script>

<!--TODO send game to board-->
<a href="/#/board">
  <div class="box">
    <div class="info">
      <p class="left">№ {number}</p>
      <p class="right">{white} (white) VS {black} (black)</p>
    </div>
    <div class="info">
      <p class="left">{score}</p>
      <p class="right">gameType: {gameType}, size: {size}</p>
    </div>
  </div>
</a>
<style>
  .box {
    width: 400px;
    border: 1px double gainsboro;
    margin-bottom: 10px;
  }

  .info {
    display: flex;
    justify-content: space-between;
  }

  a, u {
    text-decoration: none;
    color: #333333;
  }

  .right {
    margin-right: 10px;
  }

  .left {
    margin-left: 10px;
  }
</style>
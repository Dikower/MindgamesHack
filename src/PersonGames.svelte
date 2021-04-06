<script>
  import {link} from 'svelte-spa-router';

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

<a href="/board/{timestamp}" use:link>
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
    border-radius: 20px;
    margin-bottom: 20px;
    padding: 20px;
    transition: all 0.7s ease;
  }

  .box:hover {
    border-color: #999999;
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
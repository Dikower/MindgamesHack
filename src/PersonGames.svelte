<script>
  export let number = 0;
  export let score = "lose";
  export let firstPerson = "person1";
  export let secondPerson = "person2";
  export let gameType = "ranked";
  export let size = 19;
</script>

<!--TODO send game to board-->
<a href="/#/board">
  <div class="box">
    <div class="info">
      <p class="left">№ {number}</p>
      <p class="right">{firstPerson} (white) VS {secondPerson} (black)</p>
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
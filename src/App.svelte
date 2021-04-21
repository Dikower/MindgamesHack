<script>
  import Table from './Table.svelte'
  import Game from './Game.svelte'
  import Board from './Board.svelte'
  import Router from 'svelte-spa-router'

  const routes = {
    '/': Table,
    // '/': Game,
    '/board/:timestamp': Board
  }
</script>

<Router {routes}/>

<style>
  :global(html){
    background: #fbf8f7;
  }
</style>

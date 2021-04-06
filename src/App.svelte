<script>
  import Table from './Table.svelte';
  import Board from './Board.svelte'
  import Router from 'svelte-spa-router'

  const routes = {
    '/': Table,
    '/board/:timestamp': Board
  }
</script>

<Router {routes}/>

<style>
  :global(html){
    background: #fbf8f7;
  }
</style>

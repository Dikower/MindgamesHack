<script>
  import Table from './Table.svelte';
  import Board from './Board.svelte'
  import Router from 'svelte-spa-router'

  const routes = {
    '/': Table,
    '/board': Board
  }
</script>

<Router {routes}/>


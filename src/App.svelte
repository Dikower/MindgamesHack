<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300&display=swap" rel="stylesheet">

<script>
  import Table from './Table.svelte'
  import Game from './Game.svelte'
  import Board from './Board.svelte'
  import Signup from './Signup.svelte'
  import Signin from './Signin.svelte'
  import Profile from './Profile.svelte'
  import Competition from './Competition.svelte'
  import Router from 'svelte-spa-router'

  const routes = {
    // '/': Table,
    '/': Signup,
    '/signin': Signin,
    '/competition': Competition,
    '/board/:timestamp': Board,
    '/profile' : Profile,
  }
</script>

<Router {routes}/>

<style>
  :global(html){
    background: #fbf8f7;
  }
</style>

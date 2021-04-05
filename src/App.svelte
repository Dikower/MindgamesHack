<script>
  import Table from './Table.svelte';
  import Board from './Board.svelte'
  import Router from 'svelte-spa-router'
  import {onMount} from 'svelte';
  import {storeFetch, post, get, XMLPost} from './api';
  import axios from 'axios';

  let loginData = {"type": "LOGIN", "name": "goMstT", "password": "4vy2rp", "locale": "en_US"};

  function auth() {
    return axios.post('/json/access', loginData);
    // return post('/json/access', loginData);
  }
  let promise = auth();

  onMount(async () => {
    // console.log(await $promise)
    console.log(await promise, '?')
    // console.log(await $promise, '?')
  });
  const routes = {
    '/': Table,
    '/board': Board
  }
</script>

<Router {routes}/>
<!--<Table/>-->
<!-- <Board/>-->


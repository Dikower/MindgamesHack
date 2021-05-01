<script>
  import {push} from 'svelte-spa-router'
  import { backendUrl } from './api'
  let email = '';
  let nickname = '';
  async function Submit() {
    const response = await fetch(backendUrl+'user/register?email='+email+'&nickname='+nickname, {method: 'POST'});
    const json = await response.json();
    localStorage.setItem('token', json.token);
    push('/competition');
  }
</script>

<div class="window">
  <div class="auth-block">
    <input type="email" placeholder="Email" bind:value={email}>
    <input type="text" placeholder="Никнейм" bind:value={nickname}>
    <button on:click={Submit}>Зарегистрироваться</button>
    <a>qwe</a>
  </div>
</div>
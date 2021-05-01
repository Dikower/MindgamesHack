<script>
  import { backendUrl } from './api'

  let email = '';
  let password = '';
  async function Submit() {
    const response = await fetch(backendUrl+'user/login?email='+email+'&password='+password, {method: 'POST'});
    const json = await response.json();
    localStorage.setItem('token', json.token);
  }
</script>

<div class="window">
  <div class="auth-block">
    <input type="email" placeholder="Email" bind:value={email}>
    <input type="password" placeholder="Пароль" bind:value={password}>
    <button on:click={Submit}>Войти</button>
  </div>
</div>
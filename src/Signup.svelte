<script>
  import {push} from 'svelte-spa-router'
  import { backendUrl, } from './api'
  let email = '';
  let nickname = '';

  async function Submit() {
    document.getElementsByClassName('email-input')[0].style.border = "1px solid #ccc";
    document.getElementById('nickname-input').style.border = "1px solid #ccc";
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      document.getElementsByClassName('email-input')[0].style.border = "1px solid red";
      return;
    }
    if (nickname === '') {
      document.getElementById('nickname-input').style.border = "1px solid red";
      return;
    }
    const response = await fetch(backendUrl + 'user/register?email=' + email + '&nickname=' + nickname, {method: 'POST'});
    if (response.ok) {
      const json = await response.json();
      localStorage.setItem('token', json.token);
      push('/profile');
    }
  }
</script>

<div class="window">
  <div class="auth-block">
    <input class="email-input" type="email" placeholder="Email" bind:value={email}>
    <input id="nickname-input" type="text" placeholder="Никнейм" bind:value={nickname}>
    <button on:click={Submit}>Зарегистрироваться</button>
    <a href="/#/signin">Войти</a>
  </div>
</div>
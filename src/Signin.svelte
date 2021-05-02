<script>
  import { backendUrl } from './api'
  import {push} from "svelte-spa-router";

  let email = '';
  let password = '';
  async function Submit() {
    document.getElementsByClassName('email-input')[0].style.border = "1px solid #ccc";
    document.getElementById('password-input').style.border = "1px solid #ccc";
    const re = /\S+@\S+\.\S+/;
    if (!re.test(email)) {
      document.getElementsByClassName('email-input')[0].style.border = "1px solid red";
      return;
    }
    if (password === '') {
      document.getElementById('password-input').style.border = "1px solid red";
      return;
    }
    const response = await fetch(backendUrl+'user/login?email='+email+'&password='+password, {method: 'POST'});
    if (response.ok) {
      const json = await response.json();
      if (json.error === '') {
      localStorage.setItem('token', json.token);
      push('/profile');
      } else {
        password = '';
        document.getElementsByClassName('email-input')[0].style.border = "1px solid red";
        document.getElementById('password-input').style.border = "1px solid red";
      }
    }
  }
</script>

<div class="window">
  <div class="auth-block">
    <input class="email-input" type="email" placeholder="Email" bind:value={email}>
    <input id="password-input" type="password" placeholder="Пароль" bind:value={password}>
    <button on:click={Submit}>Войти</button>
    <a href="/">Регистрация</a>
  </div>
</div>
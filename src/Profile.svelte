<script>
  import {push} from 'svelte-spa-router'
  import { backendUrl } from './api'
  let token = 'd7f14fa928f414a39da6696a8d9f3fda5a0f5e54';
  async function GetInfo() {
    const response = await fetch(backendUrl+'user/profile?token='+token, {method: 'GET'});
    const json = await response.json();
    localStorage.setItem('token', json.token);
    console.log(json);
    return json ; 
  }
  
let promise = GetInfo();
</script>
<div class="window">
   <div class="menu">
    {#await GetInfo()}
    <h2>Моментик..</h2>
    {:then items}
    <h3>Пользователь: {items.user.nickname} </h3>
    <span>Почта: {items.user.email} </span>
    <span>Winrate: {items.user.winrate} </span>
    
    <button class="letsogo"><a  href="/#/competition-player">Найти игру с соперником.</a></button>
    <button class="letsogo"><a  href="/#/competition-ai">Начать игру с ИИ.</a></button>
    <button class="letsogo"><a  href="/#/profile-fullstat">Посмотреть полную статистику.</a></button>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
   </div>
</div>
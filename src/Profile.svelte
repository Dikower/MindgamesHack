<script>
  import {push} from 'svelte-spa-router'
  import { backendUrl } from './api'
  import {onMount} from "svelte";
  let token = localStorage.getItem('token');

  onMount(() => {
    if (token === null) {
      push('/');
    }
  });

  async function GetInfo() {
    const response = await fetch(backendUrl+'user/profile?token='+token, {method: 'GET'});
    const json = await response.json();
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
    <img
            src="{items.user.avatar}"
            height="50"
            width="50"
            alt=""
            loading="lazy"
    />
     <span>ID пользователя: {items.user.id} </span>
     <span>Почта: {items.user.email} </span>
     <span>Winrate: {items.user.winrate} </span>
     <span>PTS: {items.user.pts} </span>

    <div class="menu_usr">
     <button type="button" class="block" ><a href="/#/competition-player">Найти игру с соперником.</a></button>
     <button type="button" class="block" ><a href="/#/competition">Начать игру с ИИ.</a></button>
    </div>
    {:catch error}
      <p style="color: red">{error.message}</p>
    {/await}
   </div>
</div>


<style>
 img {
  margin-bottom: 20px;
 }
 .menu_usr {
  margin-top: 25px;
 }
 a {
  color: #292F36;
  text-underline: none;
 }
 .block {
  display: block;
  width: 100%;
  border: none;
  background: linear-gradient(100.06deg, #FFFFFF 0%, #808B9F 305.65%);
  cursor: pointer;
  text-align: center;
 }
</style>
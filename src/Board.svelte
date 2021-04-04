<script>
    import Square from './Square.svelte';
    import dataGame from '../data/dataGame.json';

    let Rules = dataGame['messages'][3]["sgfEvents"][0]["props"][0]["rules"];

    let FirstName = dataGame['messages'][3]["sgfEvents"][0]["props"][1]["text"];
    let FirstColor = dataGame['messages'][3]["sgfEvents"][0]["props"][1]["color"];
    let SecondName = dataGame['messages'][3]["sgfEvents"][0]["props"][2]["text"];
    let SecondColor = dataGame['messages'][3]["sgfEvents"][0]["props"][2]["color"];
    
    let kollSqInLine = dataGame['messages'][3]["sgfEvents"][0]["props"][0]["size"];
    $: sizeSq = 50;
    $: sizeBoard = kollSqInLine * sizeSq;


    //Кто ходит и асположение для номера numberActive (четное число на один больше те для 1 хода число равно 2)
    let numberActive = 2;
    $: colorEl = dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["color"];
    $: locationEl = dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["loc"]["y"] * kollSqInLine + dataGame['messages'][3]["sgfEvents"][numberActive]["props"][0]["loc"]["x"];

    function PaintBoxPlus(){
        massEl[locationEl].state = colorEl;
        if(numberActive< (dataGame['messages'][3]["sgfEvents"].length - 2))numberActive += 2;
        // console.log(numberActive);
    }
    function PaintBoxMinus(){
        if(numberActive>2)numberActive -= 2;
        // console.log(numberActive);
        massEl[locationEl].state = "bisque";
    }

    let massEl = [];
    for(let i=0;i<kollSqInLine*kollSqInLine;i++){
        massEl.push({value: i, size: sizeSq, state: 'bisque'});
    }

    function funcKeyDown(event){
        console.log(event.key);
        if(event.key=="ArrowLeft")PaintBoxMinus();
        if(event.key=="ArrowRight")PaintBoxPlus();
    }
</script>

<svelte:window on:keydown={funcKeyDown}/>

<div class="Board">
    <!-- <input type=number bind:value={numberActive}>  -->
    <button on:click={PaintBoxPlus}>Plus</button>
    <button on:click={PaintBoxMinus}>Minus</button>


    <div class="information">
        <p>Rules of the game: {Rules}</p>
        <p>Name: {FirstName}, Color: {FirstColor}</p>
        <p>Name: {SecondName}, Color: {SecondColor}</p>
    </div>

    <div style="width:{sizeBoard}px">
        {#each massEl as mass (mass.value)}
            <Square value={mass.value} size = {mass.size} state = {mass.state}/>
        {/each}
    </div>
</div>


<script>
    export let funcUpdate;
    export let kollSqInLine;
    let color = "black";
    let x = 1;
    let y = 1;
    function update() {
        funcUpdate(x, y, color);
    }
</script>

<div class="box">
    <input bind:value={x} type="number" min="1" max={kollSqInLine} />
    <input bind:value={y} type="number" min="1" max={kollSqInLine} />
    <label> <input type="radio" bind:group={color} value="black"> Black</label>
    <label> <input type="radio" bind:group={color} value="white"> White</label>
    <button on:click={() => update()}> PAINT </button>
</div>

<style>
    .box{
        border: 2px double black;
        width: 300px;
        background-color: whitesmoke;
        padding: 15px;
    }
</style>
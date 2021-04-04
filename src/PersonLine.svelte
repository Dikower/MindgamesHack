<script>
    import dataRating from '../data/dataRating.json';

    export let number = 0;
    let name = dataRating[number]["name"];
    let score = dataRating[number]["rating"];
</script>

<div class="box">
    <p> Number = {number} </p>
    <p> Name = {name} </p>
    <p> Score = {score} </p>
</div>

<style>
    .box{
        border: 2px solid black;
        margin-bottom: 10px;
        width: 400px;
        display: flex;
        justify-content: space-evenly;
    }
</style>
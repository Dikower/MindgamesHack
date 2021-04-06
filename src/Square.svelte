<script>
  export let value = 0;
  export let size = 50;
  export let state = "bisque";
  let sizeD = size/2;
  function funcClick() {
    state = "X";
  }
</script>

<!-- {#if {state}=="black"}
    <button style="width:{size}px; height:{size}px; background-color:black" on:click={funcClick}> </button>   
{:else if {state}=="white"}
<button style="width:{size}px; height:{size}px; background-color:black" on:click={funcClick}> </button>   
{/if} -->
<button style="width:{size}px; height:{size}px; background-color:{state}" on:click={funcClick}>
  {#if state == "black"}
  <svg width={size} height={size}>
    <g>
     <rect x="0" y="0" width={size} height={size}  fill="#fbefdf"/>
     <g display="none">
      <rect id="svg_4" width="100%" height="100%" x="0" y="0" stroke-width="0" />
     </g>
    </g>
    <g>
     <line stroke="#999999" x1="0" y1={sizeD} x2={size} y2={sizeD} opacity="0.5"/>
     <line stroke="#999999" x1={sizeD} y1="0" x2={sizeD} y2={size} opacity="0.5"/>
     <ellipse stroke="#0f0f0f" cx={sizeD} cy={sizeD}  rx="1.375" ry="1.375" stroke-width="3"/>
    </g>
   </svg>
  {:else if state === "white"}
  <svg width={size} height={size}>
    <g>
     <rect x="0" y="0" width={size} height={size}  fill="#fbefdf"/>
     <g display="none">
      <rect id="svg_4" width="100%" height="100%" x="0" y="0" stroke-width="0" />
     </g>
    </g>
    <g>
     <line stroke="#999999" x1="0" y1={sizeD} x2={size} y2={sizeD} opacity="0.5"/>
     <line stroke="#999999" x1={sizeD} y1="0" x2={sizeD} y2={size} opacity="0.5"/>
     <ellipse stroke="#ffffff" cx={sizeD} cy={sizeD}  rx="1.375" ry="1.375" stroke-width="3"/>
    </g>
   </svg>
  {:else}
  <svg width={size} height={size} viewBox="0 0 {size} {size}">
    <g>
     <rect x="0" y="0" width={size} height={size}  fill="#fbefdf"/>
     <g display="none">
      <rect id="svg_4" width="100%" height="100%" x="0" y="0" stroke-width="0" />
     </g>
    </g>
    <g>
     <line stroke="#999999" x1="0" y1={sizeD} x2={size} y2={sizeD} opacity="0.5"/>
     <line stroke="#999999" x1={sizeD} y1="0" x2={sizeD} y2={size} opacity="0.5"/>
     <ellipse stroke="#999999" cx={sizeD} cy={sizeD}  rx="1.375" ry="1.375" stroke-width="3"/>
    </g>
   </svg>
  {/if}
</button>

<style>
  button {
    position: sticky;
    margin-bottom: 0px;
  }
  svg {
    position: relative;
    top: -8px;
    left: -8px;
    /* margin-bottom: -6px; */
    margin-top: -12px;
  }
</style>

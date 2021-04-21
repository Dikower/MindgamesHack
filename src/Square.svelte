<script>
  export let x = 0;
  export let y = 0;
  export let size = 50;
  export let state = "bisque";
  export let funcPaint = {};
  let sizeD = size/2;
  function funcClick() {
    funcPaint();
  }
</script>

{#if state==="bisque"}
<svg on:click={funcClick} width={size} height={size} viewBox="0 0 {size} {size}" >
  <g>
   <rect x="0" y="0" width={size} height={size}  fill="#fbefdf"/>
   <g display="none">
    <rect id="svg_4" width="100%" height="100%" x="0" y="0" stroke-width="0" />
   </g>
  </g>
  <g>
   <line stroke="#999999" x1="0" y1={sizeD} x2={size} y2={sizeD} opacity="0.5"/>
   <line stroke="#999999" x1={sizeD} y1="0" x2={sizeD} y2={size} opacity="0.5"/>
   {#if state != "bisque"}
   <circle cx={sizeD} cy={sizeD} r="15" stroke="black" stroke-width="1" fill={state} />
   {/if}
  </g>
 </svg>
{:else}
<svg width={size} height={size} viewBox="0 0 {size} {size}" >
  <g>
   <rect x="0" y="0" width={size} height={size}  fill="#fbefdf"/>
   <g display="none">
    <rect id="svg_4" width="100%" height="100%" x="0" y="0" stroke-width="0" />
   </g>
  </g>
  <g>
   <line stroke="#999999" x1="0" y1={sizeD} x2={size} y2={sizeD} opacity="0.5"/>
   <line stroke="#999999" x1={sizeD} y1="0" x2={sizeD} y2={size} opacity="0.5"/>
   {#if state != "bisque"}
   <circle cx={sizeD} cy={sizeD} r="15" stroke="black" stroke-width="1" fill={state} />
   {/if}
  </g>
 </svg>
{/if}


<style>
  svg {
    background-color: brown;
    position: relative;
    top: -8px;
    left: -8px;
    margin-top: -5px;
  }
</style>

<script>
    export let x = 0;
    export let y = 0;
    export let size = 50;
    export let state = "bisque";
    export let kollSqInLine = 0;
    export let funcPaint = {};
    let sizeD = size/2;
    function funcClick() {
      if(state==="bisque" || state==='#83DBD6'){
        funcPaint();
      }
    }
  </script>
  
  <svg on:click={funcClick} width={size} height={size} viewBox="0 0 {size} {size}">
    <g>
     <rect x="0" y="0" width={size} height={size}  fill="#fbefdf"/>
     <g display="none">
      <rect id="svg_4" width="100%" height="100%" x="0" y="0" stroke-width="0" />
     </g>
    </g>
    <g>
      {#if (y===0)||(y===kollSqInLine-1)}
        {#if (y===0)}
          <line stroke="#353a43" x1={sizeD} y1={sizeD} x2={sizeD} y2={size} opacity="0.5"/>
        {:else}
          <line stroke="#353a43" x1={sizeD} y1={0} x2={sizeD} y2={sizeD} opacity="0.5"/>
        {/if}
        {#if (x===0)}
          <line stroke="#353a43" x1={sizeD} y1={sizeD} x2={size} y2={sizeD} opacity="0.5"/>
        {:else if (x===kollSqInLine-1)}
          <line stroke="#353a43" x1="0" y1={sizeD} x2={sizeD} y2={sizeD} opacity="0.5"/>
        {:else}
        <line stroke="#353a43" x1="0" y1={sizeD} x2={size} y2={sizeD} opacity="0.5"/>
        {/if}
      {:else if (x===0)||(x===kollSqInLine-1)}
        <line stroke="#353a43" x1={sizeD} y1="0" x2={sizeD} y2={size} opacity="0.5"/>
        {#if (x===0)}
          <line stroke="#353a43" x1={sizeD} y1={sizeD} x2={size} y2={sizeD} opacity="0.5"/>
        {:else}
          <line stroke="#353a43" x1="0" y1={sizeD} x2={sizeD} y2={sizeD} opacity="0.5"/>
        {/if}
      {:else}
        <line stroke="#353a43" x1="0" y1={sizeD} x2={size} y2={sizeD} opacity="0.5"/>
        <line stroke="#353a43" x1={sizeD} y1="0" x2={sizeD} y2={size} opacity="0.5"/>
        {#if (((x===3)||(x===9)) && ((y===3)||(y===9)))||(x===6 && y===6)}
          <circle cx={sizeD} cy={sizeD} r="4" stroke-width="1" fill="#808b9f" />
        {/if}
      {/if}
     {#if state != "bisque"}
      <circle cx={sizeD} cy={sizeD} r="15" stroke="black" stroke-width="1" fill={state} />
     {/if}
    </g>
   </svg>
  
  
  <style>
    svg {
      background-color: brown;
      position: relative;
      top: -8px;
      left: -8px;
      margin-top: -5px;
    }
  </style>
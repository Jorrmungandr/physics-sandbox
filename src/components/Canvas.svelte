<!-- Renderer && UI -->
<script lang="ts">
  import { onMount } from 'svelte';

  import objects from '../stores/objects';
  import type { ObjectStore } from '../stores/objects';

	let objectsRef: ObjectStore = [];

	onMount(() => {
		objects.subscribe((value) => {
			objectsRef = value;
		});
	});

  let canvasElement: HTMLCanvasElement;

  $: {
    if (canvasElement) {
      const ctx = canvasElement.getContext('2d');
      const height = window.innerHeight;
      const width = window.innerWidth;
      ctx.beginPath();
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = 'black';

      $objects.forEach(({ type, position, ...object }) => {
        const truePosition = [position[0], height - position[1]];

        if (type === 'ball') {
          ctx.arc(truePosition[0], truePosition[1], object.radius, 0, 2 * Math.PI);
        }
      });

      ctx.stroke();
    }
  }
</script>

<canvas height={window.innerHeight} width={window.innerWidth} bind:this={canvasElement}></canvas>

<style>
  canvas {
    height: 100vh;
    width: 100vw;
    display: block;
    pointer-events: none;
  }
</style>
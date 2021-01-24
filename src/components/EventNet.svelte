<!-- Event Interpreter -->
<script lang="ts">
  import { onMount } from 'svelte';

  let sectionElement: HTMLDivElement;

  onMount(() => {
    sectionElement.addEventListener('click', (event) => {
      console.log(event);
    });
    window.addEventListener('keydown', (event) => {
      console.log(event);
    });
  })
</script>

<section bind:this={sectionElement}></section>

<style>
  section {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
  }
</style>
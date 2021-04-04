<!-- Vector Evaluator -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  import objects from '../stores/objects';
  import defaultForces from '../helpers/defaultForces';
  import { framerate } from '../global/variables';
  import type { Vector } from '../global/types';

  let evaluateInterval: number;

  onMount(() => {
    evaluateInterval = setInterval(() => {
      const newObjects = $objects.map((object) => {
        const objectVectors = [...defaultForces];
        const objectTotalMovement: Vector = [...object.totalMovement];

        // Sum all force vectors to totalMovement
        object.instantForces.forEach(({ value }) => {
          const multiplier = framerate / 1000;
          const newVector = value.map((component) => component * multiplier);

          objectTotalMovement[0] += newVector[0];
          objectTotalMovement[1] += newVector[1];
        });

        // Sum all force vectors to totalMovement
        objectVectors.forEach(({ value }) => {
          const multiplier = framerate / 1000;
          const newVector = value.map((component) => component * multiplier);

          objectTotalMovement[0] += newVector[0];
          objectTotalMovement[1] += newVector[1];
        });

        const positions: Vector = [...object.position];
        positions[0] += objectTotalMovement[0];
        positions[1] += objectTotalMovement[1];

        return {
          ...object,
          movementVectors: objectVectors,
          instantForces: [],
          lastMovement: object.totalMovement,
          totalMovement: objectTotalMovement,
          position: positions,
        };
      });

      objects.set(newObjects);
    }, framerate);
  });

  onDestroy(() => {
    clearInterval(evaluateInterval);
  });
</script>

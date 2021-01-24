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
        const objectVectors = [...object.movementVectors];

        // Apply default forces to movement vectors
        defaultForces.forEach(({ value, name }) => {
          const forceIndex = objectVectors.findIndex((force) => force.name === name);

          if (forceIndex === -1) {
            objectVectors.push({
              name,
              value: [0, 0],
            });
          } else {
            const multiplier = framerate / 1000;
            const newVector = value.map((component) => component * multiplier);
            const objectVector = objectVectors[forceIndex].value;
            objectVectors[forceIndex].value = [
              objectVector[0] + newVector[0],
              objectVector[1] + newVector[1],
            ];
          }
        });

        // Sum all movement vectors to totalMovement
        const summedVectors: Vector = [0, 0];

        objectVectors.forEach(({ value }) => {
          summedVectors[0] += value[0];
          summedVectors[1] += value[1];
        });

        const positions: Vector = [...object.position];
        positions[0] += summedVectors[0];
        positions[1] += summedVectors[1];

        return {
          ...object,
          movementVectors: objectVectors,
          totalMovement: summedVectors,
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

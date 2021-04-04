<!-- Vector Evaluator -->
<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { circleLine } from 'intersects';

  import objects from '../stores/objects';
  import { framerate, restitutionCoefficient } from '../global/variables';
  import type { Point, Vector } from '../global/types';

  let evaluateInterval: number;

  onMount(() => {
    evaluateInterval = setInterval(() => {
      // Wall collision
      const height = window.innerHeight;
      const width = window.innerWidth;
      const newObjects = $objects.map((object) => {
        const { position, totalMovement, radius } = object;

        if (position[0] - radius < 0) position[0] = radius;
        if (position[0] + radius > width) position[0] = width - radius;
        if (position[1] - radius < 0) position[1] = radius;
        if (position[1] + radius > height) position[1] = height - radius;

        const topLeft: Point = [0, height];
        const topRight: Point = [width, height];
        const bottomLeft: Point = [0, 0];
        const bottomRight: Point = [width, 0];

        const translationVelocity: Vector = [...totalMovement];

        let newMovement: Vector = [...totalMovement];

        if (circleLine(...position, radius, ...topRight, ...bottomRight)) {
          // Collision is Right
          const newXSpeed = - (translationVelocity[0] * restitutionCoefficient);
          newMovement = [newXSpeed, newMovement[1]];
        }

        if (circleLine(...position, radius, ...topLeft, ...bottomLeft)) {
          // Collision is Left
          const newXSpeed = - (translationVelocity[0] * restitutionCoefficient);
          newMovement = [newXSpeed, newMovement[1]];
        }

        if (circleLine(...position, radius, ...topLeft, ...topRight)) {
          // Collision is Top
          const newYSpeed = - (translationVelocity[1] * restitutionCoefficient);
          newMovement = [newMovement[0], newYSpeed];
        }

        if (circleLine(...position, radius, ...bottomLeft, ...bottomRight)) {
          // Collision is Bottom
          const newYSpeed = - (translationVelocity[1] * restitutionCoefficient);
          newMovement = [newMovement[0], newYSpeed];
        }

        return {
          ...object,
          totalMovement: newMovement,
        };
      });

      objects.set(newObjects);
    }, framerate);
  });

  onDestroy(() => {
    clearInterval(evaluateInterval);
  });
</script>

import type { Vector } from '../global/types';

export default (pointA: Vector, pointB: Vector) => {
  const angleVector: Vector = [
    pointB[0] - pointA[0],
    pointB[1] - pointA[1],
  ];
  const baseVector: Vector = [pointB[0], pointA[1]];

  const phiCossin = (
    angleVector[0] * baseVector[0] + angleVector[1] * baseVector[1]
  ) / (
    Math.sqrt(angleVector[0] ** 2 + angleVector[1] ** 2)
    *
    Math.sqrt(baseVector[0] ** 2 + baseVector[1] ** 2)
  );

  console.log(phiCossin);
};

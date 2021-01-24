import type { SupportedForces, Vector } from '../global/types';

type ForceArray = [
  {
    value: Vector,
    name: SupportedForces,
  }
];

const forces: ForceArray = [
  {
    value: [0, -9.807],
    name: 'gravity',
  }
];

export default forces;

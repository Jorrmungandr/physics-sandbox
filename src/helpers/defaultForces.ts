import type { SupportedForces, Vector } from '../global/types';
import { getMagnitude } from '../helpers';
import { dragCoefficient, airDensity } from '../global/variables';

type Force = {
  value: Vector,
  name: SupportedForces,
};

const forces: (Force | ((direction: Vector) => Force))[] = [
  {
    value: [0, -9.807],
    name: 'gravity',
  },
  (velocity) => {
    const dragMagnitude = dragCoefficient * (getMagnitude(velocity) ** 2);
    const componentWithResistance = (component: number) => {
      return component * airDensity * dragMagnitude * -1
    };

    const airResistance: Force = {
      value: [
        componentWithResistance(velocity[0]),
        componentWithResistance(velocity[1]),
      ],
      name: 'air resistance',
    };

    return airResistance;
  },
];

export default forces;

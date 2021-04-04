import { writable } from 'svelte/store';
import generateId from '../helpers/generateId';

import type { Vector } from '../global/types';

const { subscribe, set, update } = writable<ObjectStore>([
  {
    type: 'ball',
    id: generateId(),
    mass: 30,
    radius: 30,
    position: [70, 800],
    instantForces: [{ value: [-1000, 0], name: 'custom' }],
    lastMovement: [0, 0],
    totalMovement: [0, 0],
  },
  {
    type: 'ball',
    id: generateId(),
    mass: 5,
    radius: 20,
    position: [70, 800],
    instantForces: [{ value: [1000, 0], name: 'custom' }],
    lastMovement: [0, 0],
    totalMovement: [0, 0],
  },
  {
    type: 'ball',
    id: generateId(),
    mass: 1,
    radius: 10,
    position: [70, 800],
    instantForces: [{ value: [-2000, 0], name: 'custom' }],
    lastMovement: [0, 0],
    totalMovement: [0, 0],
  },
]);

type BaseObject = {
  id: string,
  position: Vector,
  mass: number,
  instantForces: { value: Vector, name: string }[],
  lastMovement: Vector,
  totalMovement: Vector,
}

export type Object = BaseObject & {
  type: 'ball',
  radius: number,
};

export type ObjectStore = Object[];

export default {
  subscribe,
  add: (item: Object) => update((arr) => [...arr, item]),
  remove: (item: Object) => update((arr) => arr.filter((object) => object.id !== item.id)),
  reset: () => set([]),
  set: (objects: ObjectStore) => set(objects),
};

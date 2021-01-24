import { writable } from 'svelte/store';
import generateId from '../helpers/generateId';

import type { SupportedForces, Vector } from '../global/types';

const { subscribe, set, update } = writable<ObjectStore>([
  {
    class: 'ball',
    id: generateId(),
    position: [70, 800],
    movementVectors: [],
    totalMovement: [0, 0],
  }
]);

export type Object = {
  class: ('ball'),
  id: string,
  position: Vector,
  movementVectors: { value: Vector, name: SupportedForces }[],
  totalMovement: Vector,
};

export type ObjectStore = Object[];

export default {
  subscribe,
  add: (item: Object) => update((arr) => [...arr, item]),
  remove: (item: Object) => update((arr) => arr.filter((object) => object.id !== item.id)),
  reset: () => set([]),
  set: (objects: ObjectStore) => set(objects),
};

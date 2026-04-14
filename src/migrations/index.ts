import * as migration_20260412_231417_initial from './20260412_231417_initial';

export const migrations = [
  {
    up: migration_20260412_231417_initial.up,
    down: migration_20260412_231417_initial.down,
    name: '20260412_231417_initial'
  },
];

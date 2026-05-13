import * as migration_20260419_173108 from './20260419_173108';
import * as migration_20260513_120000 from './20260513_120000';

export const migrations = [
  {
    up: migration_20260419_173108.up,
    down: migration_20260419_173108.down,
    name: '20260419_173108'
  },
  {
    up: migration_20260513_120000.up,
    down: migration_20260513_120000.down,
    name: '20260513_120000'
  },
];

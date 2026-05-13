import * as migration_20260419_173108 from './20260419_173108';
import * as migration_20260512_000000 from './20260512_000000';
import * as migration_20260513_000000 from './20260513_000000';
import * as migration_20260513_120000 from './20260513_120000';
import * as migration_20260513_180000_locked_documents_rels from './20260513_180000_locked_documents_rels';

export const migrations = [
  {
    up: migration_20260419_173108.up,
    down: migration_20260419_173108.down,
    name: '20260419_173108'
  },
  {
    up: migration_20260512_000000.up,
    down: migration_20260512_000000.down,
    name: '20260512_000000'
  },
  {
    up: migration_20260513_000000.up,
    down: migration_20260513_000000.down,
    name: '20260513_000000'
  },
  {
    up: migration_20260513_120000.up,
    down: migration_20260513_120000.down,
    name: '20260513_120000'
  },
  {
    up: migration_20260513_180000_locked_documents_rels.up,
    down: migration_20260513_180000_locked_documents_rels.down,
    name: '20260513_180000_locked_documents_rels'
  },
];

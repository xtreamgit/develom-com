import * as migration_20260419_173108 from './20260419_173108';
import * as migration_20260509_000000 from './20260509_000000';
import * as migration_20260512_000000 from './20260512_000000';
import * as migration_20260513_000000 from './20260513_000000';
import * as migration_20260513_120000 from './20260513_120000';
import * as migration_20260513_180000_locked_documents_rels from './20260513_180000_locked_documents_rels';
import * as migration_20260515_180000_drop_blog_posts_published from './20260515_180000_drop_blog_posts_published';
import * as migration_20260517_211549 from './20260517_211549';
import * as migration_20260611_170134 from './20260611_170134';

export const migrations = [
  {
    up: migration_20260419_173108.up,
    down: migration_20260419_173108.down,
    name: '20260419_173108',
  },
  {
    up: migration_20260509_000000.up,
    down: migration_20260509_000000.down,
    name: '20260509_000000',
  },
  {
    up: migration_20260512_000000.up,
    down: migration_20260512_000000.down,
    name: '20260512_000000',
  },
  {
    up: migration_20260513_000000.up,
    down: migration_20260513_000000.down,
    name: '20260513_000000',
  },
  {
    up: migration_20260513_120000.up,
    down: migration_20260513_120000.down,
    name: '20260513_120000',
  },
  {
    up: migration_20260513_180000_locked_documents_rels.up,
    down: migration_20260513_180000_locked_documents_rels.down,
    name: '20260513_180000_locked_documents_rels',
  },
  {
    up: migration_20260515_180000_drop_blog_posts_published.up,
    down: migration_20260515_180000_drop_blog_posts_published.down,
    name: '20260515_180000_drop_blog_posts_published',
  },
  {
    up: migration_20260517_211549.up,
    down: migration_20260517_211549.down,
    name: '20260517_211549',
  },
  {
    up: migration_20260611_170134.up,
    down: migration_20260611_170134.down,
    name: '20260611_170134'
  },
];

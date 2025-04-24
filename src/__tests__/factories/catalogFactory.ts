import { vi } from 'vitest';
import type { CatalogConfig } from '../../types/types';

export const catalogFactory = (
  overrides: Partial<CatalogConfig> = {}
): CatalogConfig => ({
  title: 'Add Workflow',
  prompt: 'Pick something cool',
  columns: 2,

  categories: [
    { id: 'cat-docs', name: 'Docs' },
    { id: 'cat-empty', name: 'Empty' },
  ],

  items: [
    {
      id: 'item-1',
      name: 'Blinker Fluid',
      description: 'Add Blinker Fluid',
      icon: null,
      tags: ['tag-blinker'],
      category: 'cat-docs',
    },
  ],

  tags: [{ id: 'tag-blinker', primary: 'blinker', aliases: ['fluid'] }],

  actions: { add: 'Add', cancel: 'Cancel', callback: vi.fn() },

  ...overrides,
});

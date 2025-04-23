import { useMemo } from 'react';
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';

export const useFuzzySearch = <ItemType>(
  items: ItemType[],
  searchableKeys: (keyof ItemType)[],
  fuseOptions?: IFuseOptions<ItemType>
) => {
  const fuseInstance = useMemo(
    () =>
      new Fuse(items, {
        keys: searchableKeys as string[],
        threshold: 0.3,
        includeScore: false,
        ...fuseOptions,
      }),
    [items, searchableKeys, fuseOptions]
  );

  const startSearching = (searchTerm: string): ItemType[] =>
    searchTerm.trim()
      ? fuseInstance.search(searchTerm).map((result) => result.item)
      : items;

  return { search: startSearching };
};

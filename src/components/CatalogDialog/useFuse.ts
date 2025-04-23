import { useMemo } from 'react';
import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';

export const useFuse = <ItemType>(
  items: ItemType[],
  searchableKeys: (keyof ItemType)[],
  fuseOptions?: IFuseOptions<ItemType>
) => {
  const fuseInstance = useMemo(
    () =>
      new Fuse(items, {
        keys: searchableKeys as string[],
        threshold: 0.2,
        includeScore: false,
        ...fuseOptions,
      }),
    [items, searchableKeys, fuseOptions]
  );

  const startSearching = (searchTerm: string): ItemType[] => {
    if (!searchTerm.trim()) {
      return items;
    }

    const results = fuseInstance.search(searchTerm);
    return results.map((result) => result.item);
  };

  return { search: startSearching };
};

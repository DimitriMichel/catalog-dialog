import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CatalogConfig, CategoryItem } from '../../types/types.ts';
import CategoryTabs from './CategoryTabs';
import ItemGrid from './ItemGrid';
import SearchInput from './SearchInput';
import { useFuse } from './useFuse';

type Props = { config: CatalogConfig; onClose: () => void };

const CatalogDialog = ({ config, onClose }: Props) => {
  const {
    title,
    categories,
    items,
    tags,
    prompt,
    actions,
    columns = 2,
  } = config;

  const [activeCategoryId, setActiveCategoryId] = useState('all');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const tagLookup = useMemo(
    () => Object.fromEntries(tags.map((tag) => [tag.id, tag])),
    [tags]
  );

  const searchableItems: (CategoryItem & { searchableTags: string })[] =
    useMemo(
      () =>
        items.map((item) => ({
          ...item,
          searchableTags: item.tags
            .map((tagId) => {
              const tag = tagLookup[tagId];
              return [tagId, tag.primary, ...tag.aliases].join(' ');
            })
            .join(' '),
        })),
      [items, tagLookup]
    );

  const { search } = useFuse(searchableItems, [
    'name',
    'description',
    'searchableTags',
  ]);

  const filteredItems = useMemo(() => {
    let results = searchTerm.trim() ? search(searchTerm) : searchableItems;

    if (searchTerm.trim().startsWith('tag-')) {
      const exactTagMatches = searchableItems.filter((item) =>
        item.tags.some(
          (tag) => tag.toLowerCase() === searchTerm.trim().toLowerCase()
        )
      );

      const resultIds = new Set(results.map((item) => item.id));
      exactTagMatches.forEach((item) => {
        if (!resultIds.has(item.id)) {
          results.push(item);
        }
      });
    }

    if (activeCategoryId !== 'all') {
      results = results.filter((item) => item.category === activeCategoryId);
    }

    return results;
  }, [search, searchTerm, activeCategoryId, searchableItems]);

  const closeAndReturn = (itemId: string | null) => {
    actions.callback(itemId);
    onClose();
  };

  useEffect(() => {
    const escHandler = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', escHandler);
    cancelButtonRef.current?.focus();
    return () => window.removeEventListener('keydown', escHandler);
  }, [onClose]);

  return createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40'>
      <div
        role='dialog'
        aria-modal='true'
        className='mx-4 w-full max-w-4xl rounded-2xl bg-white p-8 shadow-xl'
      >
        <header className='mb-6'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          {prompt && <p className='mt-1 text-sm text-gray-700'>{prompt}</p>}
        </header>

        <hr className='mb-6 border-gray-200' />

        <div
          className={
            columns === 2
              ? 'grid grid-cols-[170px_1fr] gap-8'
              : 'flex flex-col gap-6'
          }
        >
          <CategoryTabs
            categories={[...categories].sort((a, b) =>
              a.name.localeCompare(b.name)
            )}
            active={activeCategoryId}
            onSelect={setActiveCategoryId}
          />

          <div className='flex flex-col gap-4'>
            <div className='flex justify-end'>
              <div className='w-72'>
                <SearchInput term={searchTerm} onChange={setSearchTerm} />
              </div>
            </div>

            <ItemGrid
              items={filteredItems}
              selected={selectedItemId}
              onSelect={setSelectedItemId}
              onDouble={(id) => closeAndReturn(id)}
              columns={columns}
            />
          </div>
        </div>

        <hr className='mt-8 mb-6 border-gray-200' />

        <footer className='flex justify-end gap-4'>
          <button
            ref={cancelButtonRef}
            type='button'
            onClick={() => closeAndReturn(null)}
            className='text-sm font-medium text-gray-700 hover:underline'
          >
            {actions.cancel}
          </button>

          <button
            type='button'
            onClick={() => closeAndReturn(selectedItemId)}
            disabled={!selectedItemId}
            className='rounded-md bg-blue-800 px-6 py-2 text-sm font-medium text-white disabled:opacity-50 hover:bg-blue-900'
          >
            {actions.add}
          </button>
        </footer>
      </div>
    </div>,
    document.getElementById('app-modal')!
  );
};

export default CatalogDialog;
